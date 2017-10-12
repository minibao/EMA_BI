/**
 * Created by Administrator on 2017/1/3.
 */
app.controller('statsGamesDuration',
    ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants','$sessionStorage',
        function($scope, $http, $location, $cookieStore, echartsService, uiGridConstants,$sessionStorage){
            $scope.filter = {channel: '', server: '', time: ''};
            $scope.hideGrid = $sessionStorage.excelShow;
            $scope.$watch('hideGrid',function(){
                $sessionStorage.excelShow = $scope.hideGrid;
            });
            $scope.gridOptions = {
                treeRowHeaderAlwaysVisible: false,
                enableRowSelection: false,
                showColumnFooter: true,
                enableGridMenu: true,
                enableSelectAll: true,
                exporterMenuPdf: false,
                exporterOlderExcelCompatibility: true,
                onRegisterApi: function(gridApi) {
                    $scope.gridApi = gridApi;
                }
            };

            $scope.export = function() {
                var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
                $scope.gridApi.exporter.csvExport( 'all', 'all', myElement );
            };
            var statsActiveUserChart = echartsService.line('statsActiveUser', '游戏时长');

            $scope.activeUser = function() {
                var message = $scope.message;
                message.containerName = $scope.filter.server==null ? null : $scope.filter.server.containerValue;
                message.channel = $scope.filter.channel==null ? null : $scope.filter.channel.chnValue;
                message.channelTag = ($scope.filter.channelTag==null || $scope.filter.channelTag.length==0) ? null : $scope.filter.channelTag.join(',');
                message.startD = $(".date-picker-star").val();
                message.endD = $(".date-picker-end").val();
                var calSuccess = function(data, status, headers, config) {

                    statsActiveUserChart.dispose();
                    statsActiveUserChart = null;

                    var dailyactive = data.dailyactive;
                    var e_data = [];
                    var e_dataTime = [];
                    var e_dataCnt = [];
                    var gridData = [];
                    var fileName = ['游戏时长'];
                    $scope.columns = [
                        {field: '日期',sort: {
                            direction: 'desc', priority: 0
                        }},
                        //{field: '活跃角色数', aggregationType: uiGridConstants.aggregationTypes.sum},
                        {field: '游戏时长', aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true},
                        {field: '游戏次数', aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true},
                        {field: '平均每次游戏时长'},
                        {field: '活跃角色游戏时长'}
                    ];

                    //渠道转为数组
                    var tagArr = []
                    if(!(message.channelTag == null)){
                        var tagArr = message.channelTag.split(','); //字符串转数组
                    };

                    if ($scope.filter.server != null && $scope.filter.server != '') {
                        fileName.push($scope.filter.server.containerName);
                        $scope.columns.splice($scope.columns.length-5, 0, {field: '服务器'});
                    }
                    if ($scope.filter.channel != null && $scope.filter.channel != '') {
                        fileName.push($scope.filter.channel.chnName);
                        $scope.columns.splice($scope.columns.length-5, 0, {field: '渠道'});
                    }
                    if ($scope.filter.channelTag != null && $scope.filter.channelTag != '') {
                        fileName.push($scope.filter.channelTag);
                        $scope.columns.splice($scope.columns.length-5, 0, {field: '子渠道'});
                    }
                    fileName.push(message.startD + '至' + message.endD);
                    $scope.gridOptions.exporterCsvFilename = fileName.join('-') + '.csv';
                    $scope.gridOptions.columnDefs = $scope.columns;

                    _.each(dailyactive, function(item) {
                        if(tagArr.length <= 1) {
                            if(item.activeRole  != undefined){
                                e_data.push([item.dateInfo, item.activeRole]);
                            }
                            else if(item.newRole != undefined){
                                e_data.push([item.dateInfo, item.newRole]);
                            }
                            e_dataTime.push([item.dateInfo, new Number(item.gameTime/(item.activeRole*60)).toFixed(2)]);
                            e_dataCnt.push([item.dateInfo, new Number(item.gameCnt/item.activeRole).toFixed(2)]);
                        }
                        gridData.push({
                            "日期": item.dateInfo,
                            "服务器": item.containerName,
                            "渠道": item.channel,
                            "子渠道": item.channelTag,
                            //"活跃角色数": item.activeRole,
                            "游戏时长": new Number(item.gameTime/60).toFixed(2),
                            "游戏次数": item.gameCnt,
                            "平均每次游戏时长": new Number(item.gameTime/(item.gameCnt*60)).toFixed(2),
                            "活跃角色游戏时长": new Number(item.gameTime/(item.activeRole*60)).toFixed(2)
                        });
                    });

                    $scope.gridOptions.data = gridData;

                    var legendDate = ['平均游戏时长','平均游戏次数'];
                    var seriesStr = [
                        {
                            name: '平均游戏时长',
                            type: 'line',
                            data: e_dataTime,
                            yAxisIndex:0
                        },
                        {
                            name: '平均游戏次数',
                            type: 'line',
                            data: e_dataCnt,
                            yAxisIndex:1
                        }
                    ];

                    if (message.channelTag != null && dailyactive.length > 0) {
                        var lenged_data = [];
                        series_data = [];
                        var strs = new Array();
                        var strs_lenged = new Array();
                        var str_series = new Array();
                        strs = message.channelTag.split(",");
                        var le = strs.length;
                        for (var q = 0; q < le; q++) {
                            var str_serie = {};
                            str_serie.data = [];
                            var str_serie_shichang = {};
                            str_serie_shichang.data = [];
                            var str_serie_cishu = {};
                            str_serie_cishu.data = [];
                            for (var i = 0; i < dailyactive.length; i++) {
                                str_serie_shichang.name = '平均游戏时长' + '-' + strs[q];
                                str_serie_shichang.type = "line";
                                str_serie_shichang.yAxisIndex = "1";

                                str_serie_cishu.name = '平均游戏次数' + '-' + strs[q];
                                str_serie_cishu.type = "line";
                                str_serie_cishu.yAxisIndex = "2";
                                if (dailyactive[i].channelTag == strs[q]) {
                                    //str_serie.name = '活跃角色数' + '-' + strs[q];
                                    //str_serie.type = "line";
                                    //str_serie.markPoint = {
                                    //    data: [{type: 'max', valueIndex: 1, name: '最大值'},
                                    //        {type: 'min', valueIndex: 1, name: '最小值'}]
                                    //};
                                    //str_serie.markLine = {
                                    //    smooth: true,
                                    //    data: [{type: 'average', valueIndex: 1, name: '平均值'}]
                                    //};
                                    //str_serie.data.push([dailyactive[i].dateInfo, dailyactive[i].activeRole]);


                                    str_serie_shichang.data.push([dailyactive[i].dateInfo, new Number(dailyactive[i].gameTime / (dailyactive[i].activeRole * 60)).toFixed(2)]);


                                    str_serie_cishu.data.push([dailyactive[i].dateInfo, new Number(dailyactive[i].gameCnt / dailyactive[i].activeRole).toFixed(2)]);
                                }
                            }

                            //str_series.push(str_serie);
                            str_series.push(str_serie_shichang);
                            str_series.push(str_serie_cishu);
                            var temp = strs[q];
                            //strs_lenged.push('活跃角色数' + '-' + temp);
                            strs_lenged.push('平均游戏时长' + '-' + temp);
                            strs_lenged.push('平均游戏次数' + '-' + temp);

                        }

                        if (str_series.length > 0) {
                            seriesStr = [];
                            legendDate = [];
                            for (var i = 0; i < str_series.length; i++) {
                                legendDate.push(strs_lenged[i]);
                                seriesStr.push(str_series[i]);
                            }
                        }

                    }

                    if (statsActiveUserChart == null)
                        statsActiveUserChart = echartsService.line('statsActiveUser', '游戏时长');
                    //if(tagArr.length <= 1) {
                        statsActiveUserChart.setOption({
                            legend: {
                                selected:{
                                    '平均游戏时长':true,
                                    '平均游戏次数':true
                                },
                                data: legendDate
                            },
                            //工具条
                            toolbox: {
                                show: true,
                                feature: { saveAsImage: {} }
                            },
                            //缩放
                            dataZoom : {
                                show : true,
                                realtime : true,
                                type:'inside'
                            },
                            xAxis: { type: 'time' },
                            yAxis: [
                                { type: 'value' },
                                {
                                    name: '平均游戏时长',
                                    nameLocation: 'end',
                                    type: 'value',
                                    show:false
                                },
                                {
                                    name: '平均游戏次数',
                                    nameLocation: 'end',
                                    type: 'value',
                                    position: 'right',
                                    offset: 75,
                                    show:false
                                }
                            ],
                            series: seriesStr
                        });
                    spinner.spin();
                };

                var calError = function(data, status, headers, config) {
                    console.log(status);
                    spinner.spin();
                };

                $http({
                    method : 'GET',
                    url : '/gmtool' + requires.STATS_DAILYACTIVE,
                    params : message
                }).success( calSuccess ).error( calError );

                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
            }
            setTimeout(function() {
                $scope.activeUser();
            }, $scope.reqDelay);
        }]);

//style controll
$(function(){

});