app.controller('mobaActive',
    ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants', '$sessionStorage',
        function ($scope, $http, $location, $cookieStore, echartsService, uiGridConstants, $sessionStorage) {
            $scope.ciyuan = {channel: {}, alliance: {}};
            var serAlicDic = $scope.ciyuanSerAlicDic;
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

            var mobaActiveUserChart = echartsService.line('mobaActiveUser', '活跃角色统计表');

            $scope.activeUser = function () {
                var message = $scope.message;
                message.server = ($scope.ciyuan.server == null || $scope.ciyuan.server.length == undefined) ? '' : $scope.ciyuan.server;
                message.channel = ($scope.ciyuan.alliance == null || $scope.ciyuan.alliance.length == undefined) ? '' : $scope.ciyuan.alliance.join(',');
                message.startD = $(".date-picker-star").val() + '+ 00:00:00';
                message.endD = $(".date-picker-end").val() + '+ 23:59:59';
                var svrName = $('.dropdown-toggle:eq(0)').attr('title');
                var alcName = $('.dropdown-toggle:eq(1)').attr('title');
                var calSuccess = function (data, status, headers, config) {
                    if (mobaActiveUserChart) {
                        mobaActiveUserChart.dispose();
                        mobaActiveUserChart = echartsService.line('mobaActiveUser', '活跃角色统计表');
                    }
                    var dailyActive = data.data;
                    var e_data = [];
                    var e_dataTime = [];
                    var e_dataCnt = [];
                    var gridData = [];
                    var fileName = ['活跃角色数'];
                    $scope.columns = [
                        {
                            field: '日期', sort: {
                            direction: 'desc', priority: 0
                        }
                        },
                        {field: '活跃角色数', aggregationType: uiGridConstants.aggregationTypes.sum},
                        {
                            field: '活跃角色游戏时间（分）',
                            aggregationType: uiGridConstants.aggregationTypes.avg,
                            aggregationHideLabel: true
                        },
                        {
                            field: '平均每次游戏时间（分）',
                            aggregationType: uiGridConstants.aggregationTypes.avg,
                            aggregationHideLabel: true
                        },
                        {
                            field: '游戏次数',
                            aggregationType: uiGridConstants.aggregationTypes.avg,
                            aggregationHideLabel: true
                        },
                        {
                            field: '游戏时长（分）',
                            aggregationType: uiGridConstants.aggregationTypes.avg,
                            aggregationHideLabel: true
                        }
                    ];

                    //渠道转为数组
                    var tagArr = []
                    if (!(message.channel == null)) {
                        var tagArr = message.channel.split(','); //字符串转数组
                    }
                    ;
                    if (message.server != null && message.server != '') {
                        fileName.push(svrName);
                        $scope.columns.splice($scope.columns.length - 5, 0, {field: '服务器'});
                    }
                    if (message.channel != null && message.channel != '') {
                        fileName.push(alcName);
                        $scope.columns.splice($scope.columns.length - 5, 0, {field: '渠道'});
                    }
                    fileName.push(message.startD + '至' + message.endD);
                    $scope.gridOptions.exporterCsvFilename = fileName.join('-') + '.csv';
                    $scope.gridOptions.columnDefs = $scope.columns;

                    var playg = 0;
                    var online = 0;
                    var loginnum = 0;
                    var _data = '';
                    _.each(dailyActive, function (item, index) {
                        if (tagArr.length <= 1) {
                            e_data.push([item.date, item.allPlayG]);
                            e_dataTime.push([item.date, (item.allTimeOnline / 60).toFixed(2)]);
                            e_dataCnt.push([item.date, item.allLoginNum]);
                        } else if (tagArr.length > 1) {   //多选时聚合数据
                            if (_data == '' || _data == item.date) {
                                playg = Number(playg) + Number(item.allPlayG);
                                online = Number(online) + Number(item.allTimeOnline);
                                loginnum = Number(loginnum) + Number(item.allLoginNum);
                                _data = item.date;
                            } else {
                                e_data.push([_data, playg]);
                                e_dataTime.push([item.date, (online / 60).toFixed(2)]);
                                e_dataCnt.push([item.date, loginnum]);
                                _data = item.date;
                                playg = Number(item.allPlayG);
                                online = Number(item.allTimeOnline);
                                loginnum = Number(item.allLoginNum);
                            }
                            if ((dailyActive.length - 1) == (index)) {
                                e_data.push([item.date, playg]);
                                e_dataTime.push([item.date, (online / 60).toFixed(2)]);
                                e_dataCnt.push([item.date, loginnum]);
                            }
                        }
                        var gData = {
                            "日期": item.date,
                            "活跃角色数": item.allPlayG,
                            "游戏时长（分）": new Number(item.allTimeOnline / 60).toFixed(2),
                            "游戏次数": item.allLoginNum,
                            "平均每次游戏时间（分）": new Number(item.allTimeOnline / (item.allLoginNum * 60)).toFixed(2),
                            "活跃角色游戏时间（分）": new Number(item.allTimeOnline / (item.allPlayG * 60)).toFixed(2)
                        };
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
                        gridData.push(gData);
                    });

                    $scope.gridOptions.data = gridData;
                    if (tagArr.length <= 1) {
                        mobaActiveUserChart.setOption({
                            //图例
                            legend: {
                                selected: {
                                    '游戏时长': false,
                                    '游戏次数': false
                                },
                                data: ['活跃角色数', '游戏时长', '游戏次数']
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
                                },
                                {
                                    name: '游戏时长',
                                    nameLocation: 'end',
                                    type: 'value',
                                    show: false
                                },
                                {
                                    name: '游戏次数',
                                    nameLocation: 'end',
                                    type: 'value',
                                    position: 'right',
                                    offset: 75,
                                    show: false
                                }
                            ],
                            series: [
                                {
                                    name: '活跃角色数',
                                    type: 'line',
                                    data: e_data,
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
                                    name: '游戏时长',
                                    type: 'line',
                                    data: e_dataTime,
                                    yAxisIndex: 1
                                },
                                {
                                    name: '游戏次数',
                                    type: 'line',
                                    data: e_dataCnt,
                                    yAxisIndex: 2
                                }
                            ]
                        });
                    } else if (tagArr.length > 1) {
                        console.log(e_data);
                        mobaActiveUserChart.setOption({
                            //图例
                            legend: {
                                selected: {
                                    '游戏时长之和': false,
                                    '游戏次数之和': false
                                },
                                data: ['活跃角色数之和', '游戏时长之和', '游戏次数之和']
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
                                },
                                {
                                    name: '游戏时长之和',
                                    nameLocation: 'end',
                                    type: 'value',
                                    show: false
                                },
                                {
                                    name: '游戏次数之和',
                                    nameLocation: 'end',
                                    type: 'value',
                                    position: 'right',
                                    offset: 75,
                                    show: false
                                }
                            ],
                            series: [
                                {
                                    name: '活跃角色数之和',
                                    type: 'line',
                                    data: e_data,
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
                                    name: '游戏时长之和',
                                    type: 'line',
                                    data: e_dataTime,
                                    yAxisIndex: 1
                                },
                                {
                                    name: '游戏次数之和',
                                    type: 'line',
                                    data: e_dataCnt,
                                    yAxisIndex: 2
                                }
                            ]
                        });
                    } else {
                        if (mobaActiveUserChart) {
                            mobaActiveUserChart.dispose();
                            mobaActiveUserChart = echartsService.line('mobaActiveUser', '活跃角色统计表');
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
                    url: '/gmtool' + requires.MOBA_GET_DAU,
                    params: message
                }).success(calSuccess).error(calError);

                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
            };
            setTimeout(function () {
                $scope.activeUser();
            }, $scope.reqDelay);
        }]);

//style controll 
$(function () {

});