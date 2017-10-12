app.controller('statsPlantformNewGrow',
    ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants', '$sessionStorage',
        function ($scope, $http, $location, $cookieStore, echartsService, uiGridConstants, $sessionStorage) {
            $scope.filter = {channel: '', server: '', time: ''};
            $scope.hideGrid = $sessionStorage.excelShow;
            $scope.$watch('hideGrid', function () {
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
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                }
            };
            $scope.export = function () {
                var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
                $scope.gridApi.exporter.csvExport('all', 'all', myElement);
            };
            var statsPlantFormNewGrowChart = echartsService.line('statsPlantFormNewGrow', '平台新增用户统计表', '新增游戏设备数', '新增游戏账号数',
                '新增平台设备数', '新增平台账号数');
            var statsPlantFormNewGrowCompareChart = echartsService.line('statsPlantFormNewGrowCompare', '平台新增对比表');
            //echarts 数据
            var legendData = [];
            var seriesData = [];
            //默认选择游戏设备
            $scope.methodCompare = 'gameDeviceCount';
            //实时对比算法   
            $scope.PlantformNewGrowCompare = function (str) {
                var spinner = new Spinner();
                var target = $("#spin_b").get(0);
                spinner.spin(target);
                if (str == 'ajax') $scope.regData = null;
                var message = $scope.message;
                var methodCompare = $scope.methodCompare;
                message.appId = $scope.filter.server == null ? '' : $scope.filter.server.appId;
                message.allianceId = $scope.filter.channel == null ? '' : $scope.filter.channel.allianceId;
                message.channelTag = ($scope.filter.channelTag == null || $scope.filter.channelTag.length == 0) ? '' : $scope.filter.channelTag.join(',');
                message.compareD = $(".date-picker-single").val();
                var appName = ($scope.filter.server == null || $scope.filter.server.appName == undefined) ? '全服务器' : $scope.filter.server.appName;
                var allianceName = ( $scope.filter.channel == null || $scope.filter.channel.allianceName == undefined) ? '全渠道' : $scope.filter.channel.allianceName;
                var appSvrAlicAtr = message.compareD + '-' + appName + '-' + allianceName + '-' + message.channelTag + '-';
                var calSuccess = function (data, status, headers, config) {
                    if ($scope.regData) {
                        var plantformGrowCompare = $scope.regData;
                    } else {
                        $scope.regData = data.reg;
                        var plantformGrowCompare = data.reg;
                    }
                    var e_data = [];
                    var gridData = [];
                    _.each(plantformGrowCompare, function (item) {
                        if (methodCompare == 'pfDeviceCount') {
                            e_data.push([item.time, item.data.result.pfDeviceCount]);
                        } else if (methodCompare == 'pfUidCount') {
                            e_data.push([item.time, item.data.result.pfUidCount]);
                        } else if (methodCompare == 'gameDeviceCount') {
                            e_data.push([item.time, item.data.result.gameDeviceCount]);
                        } else if (methodCompare == 'gameUidCount') {
                            e_data.push([item.time, item.data.result.gameUidCount]);
                        }
                    });
                    if (methodCompare == 'pfDeviceCount') {
                        statsPlantFormNewGrowCompareChart.dispose();
                        statsPlantFormNewGrowCompareChart = echartsService.line('statsPlantFormNewGrowCompare', '平台新增对比表');
                        legendData.push(appSvrAlicAtr + '平台设备数');
                        seriesData.push(
                            {
                                name: appSvrAlicAtr + '平台设备数',
                                type: 'line',
                                symbol: 'none',
                                data: e_data
                            }
                        );
                    } else if (methodCompare == 'pfUidCount') {
                        statsPlantFormNewGrowCompareChart.dispose();
                        statsPlantFormNewGrowCompareChart = echartsService.line('statsPlantFormNewGrowCompare', '平台新增对比表');
                        legendData.push(appSvrAlicAtr + '平台账号数');
                        seriesData.push(
                            {
                                name: appSvrAlicAtr + '平台账号数',
                                type: 'line',
                                symbol: 'none',
                                data: e_data
                            }
                        );
                    } else if (methodCompare == 'gameDeviceCount') {
                        statsPlantFormNewGrowCompareChart.dispose();
                        statsPlantFormNewGrowCompareChart = echartsService.line('statsPlantFormNewGrowCompare', '平台新增对比表');
                        legendData.push(appSvrAlicAtr + '游戏设备数');
                        seriesData.push(
                            {
                                name: appSvrAlicAtr + '游戏设备数',
                                type: 'line',
                                symbol: 'none',
                                data: e_data
                            }
                        );

                    } else if (methodCompare == 'gameUidCount') {
                        statsPlantFormNewGrowCompareChart.dispose();
                        statsPlantFormNewGrowCompareChart = echartsService.line('statsPlantFormNewGrowCompare', '平台新增对比表');
                        legendData.push(appSvrAlicAtr + '游戏账号数');
                        seriesData.push(
                            {
                                name: appSvrAlicAtr + '游戏账号数',
                                type: 'line',
                                symbol: 'none',
                                data: e_data
                            }
                        );
                    }
                    //删除已经重复进入的数据
                    for (var i = 0; i < legendData.length - 1; i++) {
                        if (legendData[legendData.length - 1] == legendData[i]) {
                            legendData.splice(legendData.length - 1, 1);
                            seriesData.splice(seriesData.length - 1, 1);
                        }
                    }
                    ;
                    statsPlantFormNewGrowCompareChart.setOption({
                        //图例
                        legend: {
                            data: legendData
                        },
                        //工具条
                        toolbox: {
                            show: true,
                            feature: {saveAsImage: {}}
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
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: seriesData
                    });

                    spinner.spin();
                };
                var calError = function (data, status, headers, config) {
                    console.log(status);
                    spinner.spin();
                };
                if ($scope.regData) {
                    calSuccess();
                } else {
                    $http({
                        method: 'GET',
                        url: '/gmtool' + requires.STATS_PLANTFORM_NEW_GROW_REALTIME,
                        params: message
                    }).success(calSuccess).error(calError);
                }
            }
            //对比选择
            $scope.compareSlc = function (str) {
                $scope.methodCompare = str;
                $scope.PlantformNewGrowCompare();
            }

            $scope.PlantformNewGrow = function () {
                if (statsPlantFormNewGrowChart) {
                    statsPlantFormNewGrowChart.dispose();
                    statsPlantFormNewGrowChart = echartsService.line('statsPlantFormNewGrow', '平台新增用户统计表', '新增游戏设备数', '新增游戏账号数',
                        '新增平台设备数', '新增平台账号数');
                }
                $scope.filter.server.appId = window.inputappId;
                $scope.filter.channel.allianceId = window.inputchannel;
                //$scope.filter.channelTag = window.inputchanneltag;
                var message = $scope.message;
                message.appId = window.inputappId == null ? null : window.inputappId;
                message.allianceId = (window.inputchannel == null || window.inputchannel.length == 0) ? null : window.inputchannel.join(',');
                message.channelTag = (window.inputchanneltag == null || window.inputchanneltag.length == 0) ? null : window.inputchanneltag.join(',');
                message.startD = $(".date-picker-star").val();
                message.endD = $(".date-picker-end").val();
                var calSuccess = function (data, status, headers, config) {
                    if (statsPlantFormNewGrowChart) {
                        statsPlantFormNewGrowChart.dispose();
                        statsPlantFormNewGrowChart = echartsService.line('statsPlantFormNewGrow', '平台新增用户统计表', '新增游戏设备数', '新增游戏账号数',
                            '新增平台设备数', '新增平台账号数');
                    }
                    var plantformNewgrow = data.data;
                    var e_data_gameDC = [];
                    var e_data_gameUC = [];
                    var e_data_pfDC = [];
                    var e_data_pfUC = [];
                    var gridData = [];
                    var fileName = ['平台新增用户统计表-'];
                    //渠道转为数组
                    var tagArr = [];
                    if (!(message.channelTag == null)) {
                        var tagArr = message.channelTag.split(','); //字符串转数组
                    }
                    var alliArr = [];
                    if (!(message.allianceId == null)) {
                        var alliArr = message.allianceId.split(','); //字符串转数组
                    }

                    fileName.push(message.startD + '至' + message.endD);
                    $scope.gridOptions.exporterCsvFilename = fileName.join('-') + '.csv';
                    $scope.gridOptions.columnDefs = [
                        {
                            field: '日期', sort: {
                            direction: 'desc', priority: 0
                        }
                        },
                        {field: '新增游戏设备数'},
                        {field: '新增游戏账号数'},
                        {field: '新增平台设备数'},
                        {field: '新增平台账号数'}
                    ];
                    if (message.appId) {
                        $scope.gridOptions.columnDefs.splice(1, 0, {field: '游戏ID'});
                    }

                    if (message.allianceId) {
                        $scope.gridOptions.columnDefs.length > 6 ? $scope.gridOptions.columnDefs.splice(2, 0, {field: '渠道'}) :
                            $scope.gridOptions.columnDefs.splice(1, 0, {field: '渠道'});
                    }

                    if (message.channelTag) {
                        $scope.gridOptions.columnDefs.splice(3, 0, {field: '子渠道'});
                    }

                    var gamedevice = 0;
                    var gameuid = 0;
                    var pfdevice = 0;
                    var pfuid = 0;
                    var _data = '';
                    _.each(plantformNewgrow, function (item,index) {

                        var _time = item.regDate.substring(0, 10);
                        if (tagArr.length <= 1 && alliArr.length <= 1) {
                            e_data_gameDC.push([item.regDate, item.gameDeviceCount]);
                            e_data_gameUC.push([item.regDate, item.gameUidCount]);
                            e_data_pfDC.push([item.regDate, item.pfDeviceCount]);
                            e_data_pfUC.push([item.regDate, item.pfUidCount]);
                        } else if (tagArr.length > 1 || alliArr.length > 1) {
                            if (_data == '' || _data == item.regDate) {
                                gamedevice = Number(gamedevice) + Number(item.gameDeviceCount);
                                gameuid = Number(gameuid) + Number(item.gameUidCount);
                                pfdevice = Number(pfdevice) + Number(item.pfDeviceCount);
                                pfuid = Number(pfuid) + Number(item.pfUidCount);
                                _data = item.regDate;
                            } else {
                                e_data_gameDC.push([_data, gamedevice]);
                                e_data_gameUC.push([_data, gameuid]);
                                e_data_pfDC.push([_data, pfdevice]);
                                e_data_pfUC.push([_data, pfuid]);
                                _data = item.regDate;
                                gamedevice = Number(item.gameDeviceCount);
                                gameuid = Number(item.gameUidCount);
                                pfdevice = Number(item.pfDeviceCount);
                                pfuid = Number(item.pfUidCount);
                            }
                            if ((plantformNewgrow.length - 1) == (index)) {
                                e_data_gameDC.push([_data, gamedevice]);
                                e_data_gameUC.push([_data, gameuid]);
                                e_data_pfDC.push([_data, pfdevice]);
                                e_data_pfUC.push([_data, pfuid]);
                            }
                        }

                        var gData = {};
                        gData['日期'] = _time;
                        if (item.appId != '') {
                            gData["游戏ID"] = item.appId
                        }
                        if (item.allianceId != '') {
                            gData['渠道'] = item.allianceId;
                        }
                        if (item.channelTag != '') {
                            gData['子渠道'] = item.channelTag;
                        }
                        gData['新增游戏设备数'] = item.gameDeviceCount;
                        gData['新增游戏账号数'] = item.gameUidCount;
                        gData['新增平台设备数'] = item.pfDeviceCount;
                        gData['新增平台账号数'] = item.pfUidCount;
                        gridData.push(gData);
                    });
                    $scope.gridOptions.data = gridData;

                    if (tagArr.length <= 1 && alliArr.length <= 1) {
                        statsPlantFormNewGrowChart.setOption({
                            //图例
                            legend: {
                                data: ['新增游戏设备数', '新增游戏账号数', '新增平台设备数', '新增平台账号数']
                            },
                            //工具条
                            toolbox: {
                                show: true,
                                feature: {saveAsImage: {}}
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
                            yAxis: [
                                {
                                    type: 'value'
                                }
                            ],
                            series: [
                                {
                                    name: '新增游戏设备数',
                                    type: 'line',
                                    data: e_data_gameDC
                                },
                                {
                                    name: '新增游戏账号数',
                                    type: 'line',
                                    data: e_data_gameUC
                                },
                                {
                                    name: '新增平台设备数',
                                    type: 'line',
                                    data: e_data_pfDC
                                },
                                {
                                    name: '新增平台账号数',
                                    type: 'line',
                                    data: e_data_pfUC
                                }
                            ]
                        });
                    } else if (tagArr.length > 1 || alliArr.length > 1) {
                        statsPlantFormNewGrowChart.setOption({
                            //图例
                            legend: {
                                data: ['新增游戏设备数', '新增游戏账号数', '新增平台设备数', '新增平台账号数']
                            },
                            //工具条
                            toolbox: {
                                show: true,
                                feature: {saveAsImage: {}}
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
                            yAxis: [
                                {
                                    type: 'value'
                                }
                            ],
                            series: [
                                {
                                    name: '新增游戏设备数',
                                    type: 'line',
                                    data: e_data_gameDC
                                },
                                {
                                    name: '新增游戏账号数',
                                    type: 'line',
                                    data: e_data_gameUC
                                },
                                {
                                    name: '新增平台设备数',
                                    type: 'line',
                                    data: e_data_pfDC
                                },
                                {
                                    name: '新增平台账号数',
                                    type: 'line',
                                    data: e_data_pfUC
                                }
                            ]
                        });
                    } else {
                        if (statsPlantFormNewGrowChart) {
                            statsPlantFormNewGrowChart.dispose();
                            statsPlantFormNewGrowChart = echartsService.line('statsPlantFormNewGrow', '平台新增用户统计表', '新增游戏设备数', '新增游戏账号数',
                                '新增平台设备数', '新增平台账号数');
                        }
                    }
                    spinner.spin();
                };

                var calError = function (data, status, headers, config) {
                    console.log(status);
                    spinner.spin();
                };
                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.STATS_PLANTFORM_NEW_GROW,
                    params: message
                }).success(calSuccess).error(calError);
                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
            };
            setTimeout(function () {
                $scope.PlantformNewGrowCompare();
                $scope.PlantformNewGrow();
            }, $scope.reqDelay);
        }]);

//style controll 
$(function () {

});