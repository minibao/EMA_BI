app.controller('statsConsume',
    ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants', '$sessionStorage',
        function ($scope, $http, $location, $cookieStore, echartsService, uiGridConstants, $sessionStorage) {
            $scope.filter = {channel: '', server: '', time: ''};
            var statsDiamondConsumeChart = echartsService.line('statsDiamondConsume', '钻石产出和消耗', ['获得', '消耗', '留存'], '获得');
            $scope.hideGrid = $sessionStorage.excelShow;
            $scope.$watch('hideGrid', function () {
                $sessionStorage.excelShow = $scope.hideGrid;
            });
            //初始化表格
            $scope.gridOptionsDiamond = {
                treeRowHeaderAlwaysVisible: false,
                enableRowSelection: false,
                enableGridMenu: true,
                enableSelectAll: true,
                exporterMenuPdf: false,
                exporterOlderExcelCompatibility: true,
                onRegisterApi: function (gridApi) {
                    $scope.gridApiDiamond = gridApi;
                }
            };
            $scope.gridOptionsGold = {
                treeRowHeaderAlwaysVisible: false,
                enableRowSelection: false,
                enableGridMenu: true,
                enableSelectAll: true,
                exporterMenuPdf: false,
                exporterOlderExcelCompatibility: true,
                onRegisterApi: function (gridApi) {
                    $scope.gridApiGold = gridApi;
                }
            };

            $scope.export = function () {
                var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
                $scope.gridApiDiamond.exporter.csvExport('all', 'all', myElement);
                $scope.gridApiGold.exporter.csvExport('all', 'all', myElement);
            }

            $scope.consumeDiamond = function () {
                var message = $scope.message;
                message.containerName = $scope.filter.server == null ? null : $scope.filter.server.containerValue;
                message.channel = $scope.filter.channel == null ? null : $scope.filter.channel.chnValue;
                message.channelTag = ($scope.filter.channelTag == '' || $scope.filter.channelTag == null) ? null : $scope.filter.channelTag.join(',');
                message.startD = $(".date-picker-star").val();
                message.endD = $(".date-picker-end").val();

                $scope.gridOptionsDiamond.columnDefs = [
                    {
                        field: '时间', sort: {
                        direction: 'desc', priority: 0
                    }
                    }
                ];
                if (message.containerName) {
                    $scope.gridOptionsDiamond.columnDefs.push({field: '服务器'})
                }
                ;
                if (message.channel) {
                    $scope.gridOptionsDiamond.columnDefs.push({field: '渠道'})
                }
                ;
                if (message.channelTag) {
                    $scope.gridOptionsDiamond.columnDefs.push({field: '子渠道'})
                }
                ;
                $scope.gridOptionsDiamond.columnDefs.push({field: '获得'}, {field: '消耗'}, {field: '留存'});
                var calSuccess = function (data, status, headers, config) {
                    statsDiamondConsumeChart.dispose();
                    statsDiamondConsumeChart = null;
                    var consume = data.consume;
                    var e_data_in = [];
                    var e_data_out = [];
                    var e_data_hold = [];
                    var excel_data = [];
                    var e_title = ['时间'];
                    //表格数据
                    var gridData = [];
                    //渠道转为数组
                    var tagArr = []
                    if (!(message.channelTag == null)) {
                        var tagArr = message.channelTag.split(','); //字符串转数组
                    }
                    ;
                    //下载表名
                    $scope.gridOptionsDiamond.exporterCsvFilename = message.startD + '至' + message.endD + '钻石统计表.csv';

                    _.each(consume, function (item) {
                        if (tagArr.length <= 1) {
                            e_data_in.push([item.dateInfo, item.resourceIn]);
                            e_data_out.push([item.dateInfo, item.resourceOut]);
                            e_data_hold.push([item.dateInfo, item.resourceHold]);
                        }
                        var gData = {};
                        gData['时间'] = item.dateInfo;
                        if (item.containerName != null) {
                            gData['服务器'] = item.containerName;
                        }
                        ;
                        if (item.channel != null) {
                            gData['渠道'] = item.channel;
                        }
                        ;
                        if (item.channelTag != null) {
                            gData['子渠道'] = item.channelTag;
                        }
                        ;
                        gData['获得'] = item.resourceIn;
                        gData['消耗'] = item.resourceOut;
                        gData['留存'] = item.resourceHold;
                        gridData.push(gData);
                    });
                    $scope.gridOptionsDiamond.data = gridData;

                    var seriesStr = [
                        {
                            name: '获得',
                            type: 'line',
                            symbol: 'none',
                            data: e_data_in
                        },
                        {
                            name: '消耗',
                            type: 'line',
                            symbol: 'none',
                            data: e_data_out
                        },
                        {
                            name: '留存',
                            type: 'line',
                            symbol: 'none',
                            data: e_data_hold
                        }
                    ];
                    var legendDate = ['获得', '消耗', '留存'];
                    if (message.channelTag != null && consume.length > 0) {
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
                            for (var i = 0; i < consume.length; i++) {
                                str_serie.name = '获得' + '-' + strs[q];
                                str_serie.type = "line";

                                str_serie_shichang.name = '消耗' + '-' + strs[q];
                                str_serie_shichang.type = "line";

                                str_serie_cishu.name = '留存' + '-' + strs[q];
                                str_serie_cishu.type = "line";
                                if (consume[i].channelTag == strs[q]) {
                                    str_serie.data.push([consume[i].dateInfo, consume[i].resourceIn]);
                                    str_serie_shichang.data.push([consume[i].dateInfo, consume[i].resourceOut]);
                                    str_serie_cishu.data.push([consume[i].dateInfo, consume[i].resourceHold]);
                                }
                            }

                            str_series.push(str_serie);
                            str_series.push(str_serie_shichang);
                            str_series.push(str_serie_cishu);
                            var temp = strs[q];
                            strs_lenged.push('获得' + '-' + temp);
                            strs_lenged.push('消耗' + '-' + temp);
                            strs_lenged.push('留存' + '-' + temp);

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

                    if (statsDiamondConsumeChart == null)
                        statsDiamondConsumeChart = echartsService.line('statsDiamondConsume', '钻石产出和消耗');
                    //if(tagArr.length <= 1){
                    statsDiamondConsumeChart.setOption({
                        legend: {data: legendDate},
                        //显示工具条
                        toolbox: {
                            show: true,
                            feature: {
                                dataView: {
                                    readOnly: false,
                                    lang: ['钻石产出和消耗', '关闭', '刷新']
                                },
                                restore: {},
                                saveAsImage: {}
                            }
                        },
                        //缩放
                        dataZoom: {
                            show: true,
                            realtime: true,
                            type: 'inside'
                        },
                        xAxis: {
                            type: 'time'
                        },
                        series: seriesStr
                    });
                    //}
                    //else {
                    //    if(statsDiamondConsumeChart){
                    //        statsDiamondConsumeChart.dispose();
                    //        statsDiamondConsumeChart = echartsService.line('statsDiamondConsume', '钻石产出和消耗');
                    //    }
                    //}
                    spinner.spin();
                };

                var calError = function (data, status, headers, config) {
                    console.log(status);
                    spinner.spin();
                };

                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.STATS_CONSUME_DIAMOND,
                    params: message
                }).success(calSuccess).error(calError);
                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
            }

            var statsGoldConsumeChart = echartsService.line('statsGoldConsume', '金币产出和消耗', ['获得', '消耗', '留存'], '获得');

            $scope.consumeGold = function () {
                var message = $scope.message;
                message.containerName = $scope.filter.server == null ? null : $scope.filter.server.containerValue;
                message.channel = $scope.filter.channel == null ? null : $scope.filter.channel.chnValue;
                message.channelTag = ($scope.filter.channelTag == '' || $scope.filter.channelTag == null) ? null : $scope.filter.channelTag.join(',');
                message.startD = $(".date-picker-star").val();
                message.endD = $(".date-picker-end").val();
                $scope.gridOptionsGold.columnDefs = [
                    {
                        field: '时间', sort: {
                        direction: 'desc', priority: 0
                    }
                    }
                ];
                if (message.containerName) {
                    $scope.gridOptionsGold.columnDefs.push({field: '服务器'})
                }
                ;
                if (message.channel) {
                    $scope.gridOptionsGold.columnDefs.push({field: '渠道'})
                }
                ;
                if (message.channelTag) {
                    $scope.gridOptionsGold.columnDefs.push({field: '子渠道'})
                }
                ;
                $scope.gridOptionsGold.columnDefs.push({field: '获得'}, {field: '消耗'}, {field: '留存'});
                var calSuccess = function (data, status, headers, config) {
                    statsGoldConsumeChart.dispose();
                    statsGoldConsumeChart = null;
                    var consume = data.consume;
                    var e_data_in = [];
                    var e_data_out = [];
                    var e_data_hold = [];
                    var excel_data = [];
                    var e_title = ['时间'];
                    //表格数据
                    var gridData = [];
                    //渠道转为数组
                    var tagArr = []
                    if (!(message.channelTag == null)) {
                        var tagArr = message.channelTag.split(','); //字符串转数组
                    }
                    ;
                    //下载表名
                    $scope.gridOptionsGold.exporterCsvFilename = message.startD + '至' + message.endD + '金币统计表.csv';

                    _.each(consume, function (item) {
                        if (tagArr.length <= 1) {
                            e_data_in.push([item.dateInfo, item.resourceIn]);
                            e_data_out.push([item.dateInfo, item.resourceOut]);
                            e_data_hold.push([item.dateInfo, item.resourceHold]);
                        }
                        var gData = {};
                        gData['时间'] = item.dateInfo;
                        if (item.containerName != null) {
                            gData['服务器'] = item.containerName;
                        }
                        ;
                        if (item.channel != null) {
                            gData['渠道'] = item.channel;
                        }
                        ;
                        if (item.channelTag != null) {
                            gData['子渠道'] = item.channelTag;
                        }
                        ;
                        gData['获得'] = item.resourceIn;
                        gData['消耗'] = item.resourceOut;
                        gData['留存'] = item.resourceHold;
                        gridData.push(gData);
                    });
                    $scope.gridOptionsGold.data = gridData;

                    var seriesStr = [
                        {
                            name: '获得',
                            type: 'line',
                            symbol: 'none',
                            data: e_data_in
                        },
                        {
                            name: '消耗',
                            type: 'line',
                            symbol: 'none',
                            data: e_data_out
                        },
                        {
                            name: '留存',
                            type: 'line',
                            symbol: 'none',
                            data: e_data_hold
                        }
                    ];
                    var legendDate = ['获得', '消耗', '留存'];
                    if (message.channelTag != null && consume.length > 0) {
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
                            for (var i = 0; i < consume.length; i++) {
                                if (consume[i].channelTag == strs[q]) {
                                    str_serie.name = '获得' + '-' + strs[q];
                                    str_serie.type = "line";
                                    str_serie.data.push([consume[i].dateInfo, consume[i].resourceIn]);

                                    str_serie_shichang.name = '消耗' + '-' + strs[q];
                                    str_serie_shichang.type = "line";
                                    str_serie_shichang.data.push([consume[i].dateInfo, consume[i].resourceOut]);

                                    str_serie_cishu.name = '留存' + '-' + strs[q];
                                    str_serie_cishu.type = "line";
                                    str_serie_cishu.data.push([consume[i].dateInfo, consume[i].resourceHold]);
                                }
                            }

                            str_series.push(str_serie);
                            str_series.push(str_serie_shichang);
                            str_series.push(str_serie_cishu);
                            var temp = strs[q];
                            strs_lenged.push('获得' + '-' + temp);
                            strs_lenged.push('消耗' + '-' + temp);
                            strs_lenged.push('留存' + '-' + temp);

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

                    if (statsGoldConsumeChart == null)
                        statsGoldConsumeChart = echartsService.line('statsGoldConsume', '金币产出和消耗');

                    //if(tagArr.length <= 1){
                    statsGoldConsumeChart.setOption({
                        legend: {data: legendDate},
                        //显示工具条
                        toolbox: {
                            show: true,
                            feature: {
                                dataView: {
                                    readOnly: false,
                                    lang: ['金币产出和消耗', '关闭', '刷新']
                                },
                                restore: {},
                                saveAsImage: {}
                            }
                        },
                        //缩放
                        dataZoom: {
                            show: true,
                            realtime: true,
                            type: 'inside'
                        },
                        xAxis: {
                            type: 'time'
                        },
                        series: seriesStr
                    });
                    //}
                    //else {
                    //    if(statsGoldConsumeChart) {
                    //        statsGoldConsumeChart.dispose();
                    //        statsGoldConsumeChart = echartsService.line( 'statsGoldConsume', '金币产出和消耗');
                    //    }
                    //}
                    spinner.spin();
                };

                var calError = function (data, status, headers, config) {
                    console.log(status);
                    spinner.spin();
                };

                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.STATS_CONSUME_GLOD,
                    params: message
                }).success(calSuccess).error(calError);
                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
            }

            $scope.consumeResource = function () {
                $scope.consumeDiamond();
                $scope.consumeGold();
            };

            setTimeout(function () {
                $scope.consumeDiamond();
                $scope.consumeGold();
            }, $scope.reqDelay);
        }]);

//style controll 
$(function () {

});