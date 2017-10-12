app.controller('statsPlantformUserPay',
    ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants', '$sessionStorage',
        function ($scope, $http, $location, $cookieStore, echartsService, uiGridConstants, $sessionStorage) {
            $scope.filter = {channel: '', server: '', time: ''};
            $scope.hideGrid = $sessionStorage.excelShow;
            $scope.$watch('hideGrid', function () {
                $sessionStorage.excelShow = $scope.hideGrid;
            })
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
            $scope.appid = '20015';
            for (var i = 0; i < $scope.sysPlantformContainerInfo.length; i++) {
                if ($scope.sysPlantformContainerInfo[i].appId == $scope.appid) {
                    $scope.filter.server = $scope.sysPlantformContainerInfo[i];
                    break;
                }
            }
            var statsPlantFormUserPayChart = echartsService.line('statsPlantFormUserPay', '平台用户付费统计表', '充值总额', '充值用户数量', '日活跃用户数', '付费率',
                '付费用户平均付费', '日活跃用户平均付费');
            var statsPlantFormUserPayCompareChart = echartsService.line('statsPlantFormUserPayCompare', '平台付费对比表');
            //echarts 数据
            var legendData = [];
            var seriesData = [];
            $scope.methodCompare = 'payuser';
            $scope.PlantformUserPayCompare = function (str) {
                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
                if (str == 'ajax') $scope.payment = null;
                var message = $scope.message;
                var methodCompare = $scope.methodCompare;
                message.appId = $scope.appid;
                message.allianceId = $scope.filter.channel == null ? '' : $scope.filter.channel.allianceId;
                message.channelTag = ($scope.filter.channelTag == null || $scope.filter.channelTag.length == 0) ? '' : $scope.filter.channelTag.join(',');
                message.compareD = $(".date-picker-single").val();
                var appName = ($scope.filter.server == null || $scope.filter.server.appName == undefined) ? '全服务器' : $scope.filter.server.appName;
                var allianceName = ( $scope.filter.channel == null || $scope.filter.channel.allianceName == undefined) ? '全渠道' : $scope.filter.channel.allianceName;
                var appSvrAlicAtr = message.compareD + '-' + appName + '-' + allianceName + '-' + message.channelTag + '-';
                var calSuccess = function (data, status, headers, config) {
                    if ($scope.payment) {
                        var plantformUserPayCompare = $scope.payment;
                    } else {
                        var plantformUserPayCompare = data.payment;
                        $scope.payment = data.payment;
                    }
                    var e_data = [];
                    var gridData = [];
                    _.each(plantformUserPayCompare, function (item) {
                        if (methodCompare == 'payuser') {
                            e_data.push([item.time, item.data.result.payuser]);
                        } else if (methodCompare == 'totalAmount') {
                            e_data.push([item.time, item.data.result.totalAmount]);
                        }
                    });
                    if (methodCompare == 'payuser') {
                        statsPlantFormUserPayCompareChart.dispose();
                        statsPlantFormUserPayCompareChart = echartsService.line('statsPlantFormUserPayCompare', '平台付费对比表');
                        legendData.push(appSvrAlicAtr + '总付费人数');
                        seriesData.push(
                            {
                                name: appSvrAlicAtr + '总付费人数',
                                type: 'line',
                                symbol: 'none',
                                data: e_data
                            }
                        );
                    } else if (methodCompare == 'totalAmount') {
                        statsPlantFormUserPayCompareChart.dispose();
                        statsPlantFormUserPayCompareChart = echartsService.line('statsPlantFormUserPayCompare', '平台付费对比表');
                        legendData.push(appSvrAlicAtr + '总付费数');
                        seriesData.push(
                            {
                                name: appSvrAlicAtr + '总付费数',
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
                    ;
                    statsPlantFormUserPayCompareChart.setOption({
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
                if ($scope.payment) {
                    calSuccess();
                } else {
                    $http({
                        method: 'GET',
                        url: '/gmtool' + requires.STATS_PLANTFORM_USER_PAY_REALTIME,
                        params: message
                    }).success(calSuccess).error(calError);
                }
            };
            //切换函数
            $scope.compareSlc = function (str) {
                $scope.methodCompare = str;
                $scope.PlantformUserPayCompare();
            }
            $scope.PlantformUserPay = function () {
                var message = $scope.message;
                message.appId = $scope.appid;
                message.allianceId = $scope.filter.channel == null ? null : $scope.filter.channel.allianceId;
                message.channelTag = ($scope.filter.channelTag == null || $scope.filter.channelTag.length == 0) ? null : $scope.filter.channelTag.join(',');
                message.startD = $(".date-picker-star").val();
                message.endD = $(".date-picker-end").val();
                var calSuccess = function (data, status, headers, config) {
                    if (statsPlantFormUserPayChart) {
                        statsPlantFormUserPayChart.dispose();
                        statsPlantFormUserPayChart = echartsService.line('statsPlantFormUserPay', '平台用户付费统计表', '充值总额', '充值用户数量', '日活跃用户数',
                            '付费率', '付费用户平均付费', '日活跃用户平均付费');
                    }
                    var plantformNewgrow = data.data;
                    var e_data_payall = [];
                    var e_data_payuser = [];
                    var e_data_payRate = [];
                    var e_data_arppu = [];
                    var e_data_dau = [];   //日活跃
                    var e_data_arpu = [];   //日活跃用户平均付费
                    var gridData = [];
                    var fileName = ['平台付费用户统计表-'];
                    //渠道转为数组
                    var tagArr = []
                    if (!(message.channelTag == null)) {
                        var tagArr = message.channelTag.split(','); //字符串转数组
                    }
                    ;
                    fileName.push(message.startD + '至' + message.endD);
                    $scope.gridOptions.exporterCsvFilename = fileName.join('-') + '.csv';
                    $scope.gridOptions.columnDefs = [
                        {
                            field: '日期', sort: {
                            direction: 'desc', priority: 0
                        }
                        },
                        {field: '日活跃用户数'},
                        {field: '充值用户数量'},
                        {field: '充值总额'},
                        {field: '付费率（payRate）'},
                        {field: '付费用户平均付费（arppu）'},
                        {field: '日活跃用户平均付费（arpu）'}
                    ];
                    if (message.appId) {
                        $scope.gridOptions.columnDefs.splice(1, 0, {field: '游戏ID'});
                    }

                    if (message.allianceId) {
                        $scope.gridOptions.columnDefs.length > 7 ? $scope.gridOptions.columnDefs.splice(2, 0, {field: '渠道'}) :
                            $scope.gridOptions.columnDefs.splice(1, 0, {field: '渠道'});
                    }

                    if (message.channelTag) {
                        $scope.gridOptions.columnDefs.splice(3, 0, {field: '子渠道'});
                    }

                    var tAmount = 0;
                    var puser = 0;
                    var da = 0;
                    var prate = 0;
                    var arpp = 0;
                    var arpu = 0;
                    var _data = '';
                    _.each(plantformNewgrow, function (item, index) {
                        var _time = item.calcDate.substring(0, 10);
                        if (tagArr.length <= 1) {
                            e_data_payall.push([item.calcDate, item.totalAmount]);
                            e_data_payuser.push([item.calcDate, item.payuser]);
                            e_data_dau.push([item.calcDate, item.dau]);
                            e_data_payRate.push([item.calcDate, item.payRate]);
                            e_data_arppu.push([item.calcDate, item.arppu]);
                            e_data_arpu.push([item.calcDate, item.arpu]);
                        } else if (tagArr.length > 1) {
                            if (_data == '' || _data == item.calcDate) {
                                tAmount = Number(tAmount) + Number(item.totalAmount);
                                puser = Number(puser) + Number(item.payuser);
                                da = Number(da) + Number(item.dau);
                                prate = Number(prate) + Number(item.payRate);
                                arpp = Number(arpp) + Number(item.arppu);
                                arpu = Number(arpu) + Number(item.arpu);
                                _data = item.calcDate;
                            } else {
                                e_data_payall.push([_data, tAmount]);
                                e_data_payuser.push([_data, puser]);
                                e_data_dau.push([_data, da]);
                                e_data_payRate.push([_data, prate]);
                                e_data_arppu.push([_data, arpp]);
                                e_data_arpu.push([_data, arpu]);
                                _data = item.calcDate;

                                tAmount = Number(item.totalAmount);
                                puser = Number(item.payuser);
                                da = Number(item.dau);
                                prate = Number(item.payRate);
                                arpp = Number(item.arppu);
                                arpu = Number(item.arpu);
                            }
                            if ((plantformNewgrow.length - 1) == (index)) {
                                e_data_payall.push([_data, tAmount]);
                                e_data_payuser.push([_data, puser]);
                                e_data_dau.push([_data, da]);
                                e_data_payRate.push([_data, prate]);
                                e_data_arppu.push([_data, arpp]);
                                e_data_arpu.push([_data, arpu]);
                            }
                        }

                        var gData = {};
                        gData['日期'] = _time;
                        if (item.appId != '') {
                            gData['游戏ID'] = item.appId;
                        }
                        if (item.allianceId != '') {
                            gData['渠道'] = item.allianceId;
                        }

                        if (item.channelTag != '') {
                            gData['子渠道'] = item.channelTag;
                        }

                        gData['充值总额'] = item.totalAmount;
                        gData['充值用户数量'] = item.payuser;
                        gData['日活跃用户数'] = item.dau;
                        gData['付费率（payRate）'] = item.payRate;
                        gData['付费用户平均付费（arppu）'] = item.arppu;
                        gData['日活跃用户平均付费（arpu）'] = item.arpu;
                        gridData.push(gData);
                    });
                    $scope.gridOptions.data = gridData;

                    if (tagArr.length <= 1 || tagArr.length > 1) {
                        statsPlantFormUserPayChart.setOption({
                            //图例
                            legend: {
                                data: ['充值总额', '充值用户数量', '日活跃用户数', '付费率', '付费用户平均付费', '日活跃用户平均付费']
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
                                    name: '充值总额',
                                    type: 'line',
                                    data: e_data_payall
                                },
                                {
                                    name: '充值用户数量',
                                    type: 'line',
                                    data: e_data_payuser
                                },
                                {
                                    name: '日活跃用户数',
                                    type: 'line',
                                    data: e_data_dau
                                },
                                {
                                    name: '付费率',
                                    type: 'line',
                                    data: e_data_payRate
                                },
                                {
                                    name: '付费用户平均付费',
                                    type: 'line',
                                    data: e_data_arppu
                                },
                                {
                                    name: '日活跃用户平均付费',
                                    type: 'line',
                                    data: e_data_arpu
                                }
                            ]
                        });
                    } else {
                        if (statsPlantFormUserPayChart) {
                            statsPlantFormUserPayChart.dispose();
                            statsPlantFormUserPayChart = echartsService.line('statsPlantFormUserPay', '平台用户付费统计表', '充值总额', '充值用户数量', '日活跃用户数',
                                '付费率', '付费用户平均付费', '日活跃用户平均付费');
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
                    url: '/gmtool' + requires.STATS_PLANTFORM_USER_PAY,
                    params: message
                }).success(calSuccess).error(calError);
                var spinner = new Spinner();
                var target = $("#spin_b").get(0);
                spinner.spin(target);
            };
            setTimeout(function () {
                $scope.PlantformUserPayCompare();
                $scope.PlantformUserPay();
            }, $scope.reqDelay);
        }]);

//style controll 
$(function () {

});