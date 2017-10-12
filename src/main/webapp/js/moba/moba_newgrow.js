app.controller('mobaNewGrow',
    ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants', '$sessionStorage',
        function ($scope, $http, $location, $cookieStore, echartsService, uiGridConstants, $sessionStorage) {
            $scope.ciyuan = {channel: {}, alliance: {}};
            var mobaNewGrowChart = echartsService.line('statsNewGrow', '新增角色统计');
            $scope.hideGrid = $sessionStorage.excelShow;
            $scope.$watch('hideGrid', function () {
                $sessionStorage.excelShow = $scope.hideGrid;
                console.log($sessionStorage.excelShow);
            })
            var serAlicDic = $scope.ciyuanSerAlicDic;
            //表格声明
            $scope.gridOptions = {
                treeRowHeaderAlwaysVisible: false,
                enableRowSelection: false,
                showColumnFooter: true,
                enableGridMenu: true,
                enableSelectAll: true,
                exporterMenuPdf: false,
                exporterOlderExcelCompatibility: true,
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                }
            };
            $scope.export = function () {
                var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
                $scope.gridApi.exporter.csvExport('all', 'all', myElement);
            };
            $scope.newGrow = function () {
                var message = $scope.message;
                message.server = ($scope.ciyuan.server == null || $scope.ciyuan.server.length == undefined) ? '' : $scope.ciyuan.server;
                message.channel = ($scope.ciyuan.alliance == null || $scope.ciyuan.alliance.length == undefined) ? '' : $scope.ciyuan.alliance.join(',');
                message.startD = $(".date-picker-star").val() + '+00:00:00';
                message.endD = $(".date-picker-end").val() + '+23:59:59';
                var svrName = $('.dropdown-toggle:eq(0)').attr('title');
                if (svrName == '请选择服务器') svrName = '全服务器'
                var alcName = $('.dropdown-toggle:eq(1)').attr('title');
                //初始化表格
                $scope.gridOptions.columnDefs = [
                    {
                        field: '时间', sort: {
                        direction: 'desc', priority: 0
                    }
                    },
                    {field: '新增角色'}
                ];
                if (message.server) {
                    $scope.gridOptions.columnDefs.splice(1, 0, {field: '服务器'})
                }
                ;
                if (message.channel) {
                    $scope.gridOptions.columnDefs.length > 2 ? $scope.gridOptions.columnDefs.splice(2, 0, {field: '渠道'}) :
                        $scope.gridOptions.columnDefs.splice(1, 0, {field: '渠道'});
                }
                ;
                var calSuccess = function (data, status, headers, config) {
                    if (data.result != 0) {
                        console.log('接口调用失败。')
                        return false;
                    }

                    var dailynew = data.data;
                    var series_data = [];
                    var gridData = [];
                    var fileName = [];
                    var dataArr = [];
                    var lenged_data = [];
                    var tag = [];
                    var lenged_name = [];
                    lenged_name.push(svrName);
                    //下载表名
                    fileName.push(message.dateStart + '至' + message.dateEnd + '新增角色统计表');
                    $scope.gridOptions.exporterCsvFilename = fileName + '.csv';
                    _.each(dailynew, function (item) {
                        var gData = {};
                        gData['时间'] = item.time;
                        if (message.server) {
                            for (var i = 0; i < serAlicDic.service[0].length; i++) {
                                (function (i) {
                                    if (serAlicDic.service[0][i] == item.server) {
                                        gData['服务器'] = serAlicDic.service[1][i];
                                    }
                                })(i);
                            }
                        }
                        if (message.channel) {
                            for (var i = 0; i < serAlicDic.alliance[0].length; i++) {
                                (function (i) {
                                    if (serAlicDic.alliance[0][i] == item.alliance) {
                                        gData['渠道'] = serAlicDic.alliance[1][i];
                                    }
                                })(i);
                            }
                        }
                        ;
                        gData['新增角色'] = item.allNum;
                        gridData.push(gData);
                        var t = {};
                        t[item.alliance == null ? 'all' : item.alliance] = [item.time, item.allNum];
                        dataArr.push(t);
                    });
                    if (message.channel) {
                        tag = $scope.ciyuan.alliance;
                        for (var i in tag) {
                            var eData = [];
                            _.each(dataArr, function (item) {
                                eData.push(item[tag[i]]);
                            });
                            var a = '';
                            for (var j = 0; j < serAlicDic.alliance[0].length; j++) {
                                (function (j) {
                                    if (serAlicDic.alliance[0][j] == tag[i]) {
                                        a = serAlicDic.alliance[1][j];
                                    }
                                })(j);
                            }
                            var str = lenged_name.join('-') + '-' + a;
                            lenged_data.push(str);
                            series_data.push({
                                name: str,
                                type: 'line',
                                data: eData,
                                markPoint: {
                                    data: [
                                        {type: 'max', valueIndex: 1, name: '最大值'},
                                        {type: 'min', valueIndex: 1, name: '最小值'}
                                    ]
                                },
                                markLine: {
                                    smooth: true,
                                    data: [{type: 'average', valueIndex: 1, name: '平均值'}]
                                }
                            });
                        }
                    } else {
                        //tag = serAlicDic.alliance[0];
                        var eData = [];
                        //for(var i in tag){
                        //    _.each(dataArr,function(item){
                        //        eData.push(item[tag[i]]);
                        //    });
                        //}
                        _.each(dataArr, function (item) {
                            eData.push(item.all);
                        });
                        var str = lenged_name.join('-') + '-' + '全渠道';
                        lenged_data.push(str);
                        series_data.push({
                            name: str,
                            type: 'line',
                            data: eData,
                            markPoint: {
                                data: [
                                    {type: 'max', valueIndex: 1, name: '最大值'},
                                    {type: 'min', valueIndex: 1, name: '最小值'}
                                ]
                            },
                            markLine: {
                                smooth: true,
                                data: [{type: 'average', valueIndex: 1, name: '平均值'}]
                            }
                        });
                    }

                    $scope.gridOptions.data = gridData;

                    if (mobaNewGrowChart == null) {
                        mobaNewGrowChart = echartsService.line('statsNewGrow', '新增角色统计');
                    } else {
                        mobaNewGrowChart.dispose();
                        mobaNewGrowChart = echartsService.line('statsNewGrow', '新增角色统计');
                    }
                    mobaNewGrowChart.setOption({
                        legend: {
                            data: lenged_data
                        },
                        toolbox: {
                            show: true,
                            feature: {saveAsImage: {}}
                        },
                        dataZoom: {
                            show: true,
                            realtime: true,
                            type: 'inside'
                        },
                        xAxis: {
                            type: 'time'
                        },
                        series: series_data
                    });
                    spinner.spin();
                };
                var calError = function (data, status, headers, config) {
                    console.log(status);
                    spinner.spin();
                };
                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.MOBA_NEW_GROW,
                    params: message
                }).success(calSuccess).error(calError);

                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
            };
            setTimeout(function () {
                $scope.newGrow();
            }, $scope.reqDelay);

        }]);


//style controll 
$(function () {

});