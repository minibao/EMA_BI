app.controller('statsNewGrow',
    ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants', '$sessionStorage',
        function ($scope, $http, $location, $cookieStore, echartsService, uiGridConstants, $sessionStorage) {
            $scope.filter = {channel: '', server: '', time: ''};
            $scope.hideGrid = $sessionStorage.excelShow;
            $scope.$watch('hideGrid', function () {
                $sessionStorage.excelShow = $scope.hideGrid;
            });
            var statsNewGrowChart = echartsService.line('statsNewGrow', '新增角色');
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
                message.containerName = $scope.filter.server == null ? null : $scope.filter.server.containerValue;
                message.channel = $scope.filter.channel == null ? null : $scope.filter.channel.chnValue;
                message.channelTag = ($scope.filter.channelTag == null || $scope.filter.channelTag.length == 0) ? null : $scope.filter.channelTag.join(',');
                message.startD = $(".date-picker-star").val();
                message.endD = $(".date-picker-end").val();

                var lenged_name = [];
                if ($scope.filter.server)
                    lenged_name.push($scope.filter.server.containerName);
                if ($scope.filter.channel)
                    lenged_name.push($scope.filter.channel.chnName);

                //初始化表格
                $scope.gridOptions.columnDefs = [
                    {
                        field: '时间',
                        sort: {
                            direction: 'desc', priority: 0
                        }
                    }];
                if (message.containerName) {
                    $scope.gridOptions.columnDefs.push({field: '服务器'});
                }
                ;
                if (message.channel) {
                    $scope.gridOptions.columnDefs.push({field: '渠道'});
                }
                ;
                if (message.channelTag) {
                    $scope.gridOptions.columnDefs.push({field: '子渠道'});
                }
                ;
                $scope.gridOptions.columnDefs.push({field: '新增角色'}, {field: '游戏次数', visible: false}, {
                    field: '游戏时长',
                    visible: false
                });
                //下载表名
                var fileName = [];
                fileName.push(message.startD + '至' + message.endD + '新增角色统计表');
                $scope.gridOptions.exporterCsvFilename = fileName + '.csv';

                if (statsNewGrowChart != null) {
                    statsNewGrowChart.dispose();
                    statsNewGrowChart = null;
                }

                var calSuccess = function (data, status, headers, config) {
                    var dailynew = data.dailynew;
                    var tag = [];
                    var lenged_data = [];
                    var series_data = [];
                    var excel_data = [];
                    var e_title = ['日期'];
                    var gridData = [];
                    if ($scope.filter.channelTag == null
                        || $scope.filter.channelTag.length == 0) {
                        tag.push('all');
                    }
                    else {
                        tag = $scope.filter.channelTag;
                    }
                    var e_data_ro = [];
                    angular.forEach(dailynew, function (item, index) {

                        if (item.newRole != null) {
                            e_data_ro.push([item.dateInfo, item.newRole]);
                        }
                        var gData = {};
                        gData['时间'] = item.dateInfo;
                        if (item.containerName != null) {
                            gData['服务器'] = item.containerName;
                        }
                        if (item.channel != null) {
                            gData['渠道'] = item.channel;
                        }
                        if (item.channelTag != null) {
                            gData['子渠道'] = item.channelTag;
                        }
                        gData['新增角色'] = item.newRole;
                        if (item.gameCnt != null) {
                            gData['游戏次数'] = item.gameCnt;
                        }
                        if (item.gameTime != null) {
                            gData['游戏时长'] = item.gameTime;
                        }
                        gridData.push(gData);

                    });

                    if (e_data_ro.length != 0) {
                        var str = lenged_name.join('-') + " ";

                        if (str == null || str.length == 0 || str == " ") {
                            str = "all";
                        }
                        lenged_data.push(str);
                        series_data.push({
                            name: str,
                            type: 'line',
                            data: e_data_ro
                        });
                    }
                    if (message.channelTag != null && dailynew.length > 0) {
                        lenged_data = [];
                        series_data = [];
                        var strs = new Array();
                        var str_series = new Array();
                        strs = message.channelTag.split(",");

                        for (var q = 0; q < strs.length; q++) {

                            var str_serie = {};
                            str_serie.data = [];
                            for (var i = 0; i < dailynew.length; i++) {
                                str_serie.name = lenged_name.join('-') + '-' + strs[q];
                                str_serie.type = "line";
                                if (dailynew[i].channelTag == strs[q]) {


                                    str_serie.data.push([dailynew[i].dateInfo, dailynew[i].newRole]);
                                }
                            }
                            str_series[q] = str_serie;
                            strs[q] = lenged_name.join('-') + '-' + strs[q];
                        }

                        if (str_series.length > 0) {
                            for (var i = 0; i < str_series.length; i++) {
                                lenged_data.push(strs[i]);
                                series_data.push(str_series[i]);
                            }
                        }
                    }
                    $scope.gridOptions.data = gridData;

                    //for (var x in tag) {
                    //    var e_data_ro = [];
                    //    _.each(dailynew[tag[x]], function (item) {
                    //        if (item.newRole != null) {
                    //            e_data_ro.push([item.dateInfo, item.newRole]);
                    //        }
                    //        var gData = {};
                    //        gData['时间'] = item.dateInfo;
                    //        if (item.containerName != null) {
                    //            gData['服务器'] = item.containerName;
                    //        }
                    //        ;
                    //        if (item.channel != null) {
                    //            gData['渠道'] = item.channel;
                    //        }
                    //        ;
                    //        if (item.channelTag != null) {
                    //            gData['子渠道'] = item.channelTag;
                    //        }
                    //        ;
                    //        gData['新增角色'] = item.newRole;
                    //        if (item.gameCnt != null) {
                    //            gData['游戏次数'] = item.gameCnt;
                    //        }
                    //        ;
                    //        if (item.gameTime != null) {
                    //            gData['游戏时长'] = item.gameTime;
                    //        }
                    //        ;
                    //        gridData.push(gData);
                    //    });
                    //    if (e_data_ro.length != 0) {
                    //        var str = lenged_name.join('-') + '-' + tag[x];
                    //        lenged_data.push(str);
                    //        series_data.push({
                    //            name: str,
                    //            type: 'line',
                    //            data: e_data_ro
                    //        });
                    //    };
                    //}
                    //$scope.gridOptions.data = gridData;

                    if (statsNewGrowChart == null)
                        statsNewGrowChart = echartsService.line('statsNewGrow', '新增角色');

                    statsNewGrowChart.setOption({
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
                            //interval: 24*60*60*1000
                        },
                        series: series_data
                    });
                    spinner.spin();
                };

                var calError = function (data, status, headers, config) {
                    spinner.spin();
                };

                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.STATS_DAILYNEW,
                    params: message
                }).success(calSuccess).error(calError);

                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
            }

            setTimeout(function () {
                $scope.newGrow();
            }, $scope.reqDelay);

        }]);


//style controll 
$(function () {

});