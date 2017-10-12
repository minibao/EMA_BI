app.controller('statsPlantformActiveUser',
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
            var statsPlantFormActiveUserCompareChart = echartsService.line('statsPlantFormActiveUserCompare', '平台活跃用户对比表');
            var statsPlantFormActiveUserChart = echartsService.line('statsPlantFormActiveUser', '平台活跃用户统计表', '活跃用户人数', '活跃用户数');
            //echarts 数据
            var legendData = [];
            var seriesData = [];
            $scope.methodCompare = 'uidCount';
            $scope.PlantformactiveUserCompare = function (str) {
                //$scope.filter.server.appId = window.inputappId2;
                //console.log(window.inputappId2);
                //console.log($scope.filter.server.appId);
                //$scope.filter.channel.allianceId = window.inputchannel2;
                //$scope.filter.channelTag = window.inputchanneltag2;
                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);

                var message = $scope.message;
                var methodCompare = $scope.methodCompare;
                if (str == 'ajax') $scope.pfDau = null;
                message.appId = $scope.filter.server == null ? null : $scope.filter.server.appId;
                message.allianceId = $scope.filter.channel == null ? null : $scope.filter.channel.allianceId;
                //message.allianceId =(window.inputchannel == null || window.inputchannel.length == 0) ? null : window.inputchannel.join(',');
                message.channelTag = ($scope.filter.channelTag == null || $scope.filter.channelTag.length == 0) ? null : $scope.filter.channelTag.join(',');
                message.compareD = $(".date-picker-single").val();

                var appName = ($scope.filter.server == null || $scope.filter.server.appName == undefined) ? '全服务器' : $scope.filter.server.appName;
                var allianceName = ( $scope.filter.channel == null || $scope.filter.channel.allianceName == undefined) ? '全渠道' : $scope.filter.channel.allianceName;
                var appSvrAlicAtr = message.compareD + '-' + appName + '-' + allianceName + '-' + message.channelTag + '-';
                var calSuccess = function (data, status, headers, config) {
                    if ($scope.pfDau) {
                        var plantformActiveCompare = $scope.pfDau;
                    } else {
                        var plantformActiveCompare = data.dau;
                        $scope.pfDau = data.dau;
                    }
                    var e_data = [];
                    var gridData = [];
                    _.each(plantformActiveCompare, function (item) {
                        if (methodCompare == 'uidCount') {
                            e_data.push([item.time, item.data.result.uidCount]);
                        } else if (methodCompare == 'deviceCount') {
                            e_data.push([item.time, item.data.result.deviceCount]);
                        }
                    });
                    if (methodCompare == 'uidCount') {
                        statsPlantFormActiveUserCompareChart.dispose();
                        statsPlantFormActiveUserCompareChart = echartsService.line('statsPlantFormActiveUserCompare', '平台活跃用户对比表');
                        legendData.push(appSvrAlicAtr + '活跃用户人数');
                        seriesData.push(
                            {
                                name: appSvrAlicAtr + '活跃用户人数',
                                type: 'line',
                                symbol: 'none',
                                data: e_data
                            }
                        );
                    } else if (methodCompare == 'deviceCount') {
                        statsPlantFormActiveUserCompareChart.dispose();
                        statsPlantFormActiveUserCompareChart = echartsService.line('statsPlantFormActiveUserCompare', '平台活跃设备对比表');
                        legendData.push(appSvrAlicAtr + '活跃设备数');
                        seriesData.push(
                            {
                                name: appSvrAlicAtr + '活跃设备数',
                                type: 'line',
                                symbol: 'none',
                                data: e_data
                            }
                        );
                    }
                    ;
                    //删除已经重复进入的数据
                    for (var i = 0; i < legendData.length - 1; i++) {
                        if (legendData[legendData.length - 1] == legendData[i]) {
                            legendData.splice(legendData.length - 1, 1);
                            seriesData.splice(seriesData.length - 1, 1);
                        }
                    }

                    statsPlantFormActiveUserCompareChart.setOption({
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
                if ($scope.pfDau) {
                    calSuccess();
                } else {
                    $http({
                        method: 'GET',
                        url: '/gmtool' + requires.STATS_PLANTFORM_ACTIVE_USER_REALTIME,
                        params: message
                    }).success(calSuccess).error(calError);
                }
            }
            //对比切换
            $scope.compareSlc = function (str) {
                $scope.methodCompare = str;
                $scope.PlantformactiveUserCompare();
            }
            $scope.PlantformactiveUser = function () {
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
                    if (statsPlantFormActiveUserChart) {
                        statsPlantFormActiveUserChart.dispose();
                        statsPlantFormActiveUserChart = echartsService.line('statsPlantFormActiveUser', '平台活跃用户统计表', '活跃用户人数', '活跃用户数');
                    }
                    var plantformActive = data.data;
                    var e_data = [];
                    var e_userdata = [];
                    var gridData = [];
                    var fileName = ['平台活跃用户数统计表-'];
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
                        {field: '设备数'},
                        {field: '用户数量'}
                    ];
                    if (message.appId) {
                        $scope.gridOptions.columnDefs.splice(1, 0, {field: '游戏ID'});
                    }

                    if (message.allianceId) {
                        $scope.gridOptions.columnDefs.length > 3 ? $scope.gridOptions.columnDefs.splice(2, 0, {field: '渠道'}) :
                            $scope.gridOptions.columnDefs.splice(1, 0, {field: '渠道'});
                    }

                    if (message.channelTag) {
                        $scope.gridOptions.columnDefs.splice(3, 0, {field: '子渠道'});
                    }

                    var devicec = 0;
                    var uidc = 0;
                    var _data = '';
                    _.each(plantformActive, function (item, index) {
                        if (tagArr.length <= 1 && alliArr.length <= 1) {
                            e_data.push([item.activeDate, item.deviceCount]);
                            e_userdata.push([item.activeDate, item.uidCount]);
                        } else if (tagArr.length > 1 || alliArr.length > 1) {
                            if (_data == '' || _data == item.activeDate) {
                                devicec = Number(devicec) + Number(item.deviceCount);
                                uidc = Number(uidc) + Number(item.uidCount);
                                _data = item.activeDate;
                            } else {
                                e_data.push([_data, devicec]);
                                e_userdata.push([_data, uidc]);
                                _data = item.activeDate;
                                devicec = Number(item.deviceCount);
                                uidc = Number(item.uidCount);
                            }
                            if ((plantformActive.length - 1) == (index)) {
                                e_data.push([_data, devicec]);
                                e_userdata.push([_data, uidc]);
                            }
                        }

                        var _time = item.activeDate.substring(0, 10);
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

                        gData['设备数'] = item.deviceCount;
                        gData['用户数量'] = item.uidCount;
                        gridData.push(gData);
                    });
                    $scope.gridOptions.data = gridData;

                    if ((tagArr.length <= 1 && alliArr.length <= 1) || (tagArr.length > 1 || alliArr.length > 1)) {
                        statsPlantFormActiveUserChart.setOption({
                            //图例
                            legend: {
                                data: ['活跃用户数', '设备数']
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
                                    name: '活跃用户数',
                                    type: 'line',
                                    data: e_data,
                                    symbol: 'none',
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
                                },
                                {
                                    name: '设备数',
                                    type: 'line',
                                    data: e_userdata,
                                    symbol: 'none',
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
                                }
                            ]
                        });
                    } else {
                        if (statsPlantFormActiveUserChart) {
                            statsPlantFormActiveUserChart.dispose();
                            statsPlantFormActiveUserChart = echartsService.line('statsPlantFormActiveUser', '平台活跃用户统计表', '活跃用户人数', '活跃用户数');
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
                    url: '/gmtool' + requires.STATS_PLANTFORM_ACTIVE_USER,
                    params: message
                }).success(calSuccess).error(calError);
                var spinner = new Spinner();
                var target = $("#spin_b").get(0);
                spinner.spin(target);
            };
            setTimeout(function () {
                $scope.PlantformactiveUserCompare();
                $scope.PlantformactiveUser();
            }, $scope.reqDelay);
        }]);

//style controll 
$(function () {

});