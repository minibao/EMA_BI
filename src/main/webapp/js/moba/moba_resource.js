app.controller('mobaResource',
    ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants', '$sessionStorage',
        function ($scope, $http, $location, $cookieStore, echartsService, uiGridConstants, $sessionStorage) {
            $scope.ciyuan = {channel: {}, alliance: {}};
            var serAlicDic = $scope.ciyuanSerAlicDic;
            var mobaDiamondConsumeChart = echartsService.line('mobaDiamondConsume', '钻石产出和消耗');
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
            //默认显示表格
            $scope.hideGrid = $sessionStorage.excelShow;
            $scope.$watch('hideGrid', function () {
                $sessionStorage.excelShow = $scope.hideGrid;
            })
            $scope.export = function () {
                var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
                $scope.gridApiDiamond.exporter.csvExport('all', 'all', myElement);
                $scope.gridApiGold.exporter.csvExport('all', 'all', myElement);
            }
            $scope.consumeDiamond = function () {
                //获得输入参数
                var message = $scope.message;
                message.server = ($scope.ciyuan.server == null || $scope.ciyuan.server.length == undefined) ? '' : $scope.ciyuan.server;
                message.channel = ($scope.ciyuan.alliance == null || $scope.ciyuan.alliance.length == undefined) ? '' : $scope.ciyuan.alliance.join(',');
                message.startD = $(".date-picker-star").val() + '+00:00:00';
                message.endD = $(".date-picker-end").val() + '+23:59:59';
                //表头初始化
                $scope.gridOptionsDiamond.columnDefs = [
                    {
                        field: '日期', sort: {
                        direction: 'desc', priority: 0
                    }
                    },
                    {field: '获得'},
                    {field: '消耗'},
                ];
                if (message.server) {
                    $scope.gridOptionsDiamond.columnDefs.splice(1, 0, {field: '服务器'});
                }
                ;
                if (message.channel) {
                    $scope.gridOptionsDiamond.columnDefs.length > 3 ? $scope.gridOptionsDiamond.columnDefs.splice(2, 0, {field: '渠道'}) :
                        $scope.gridOptionsDiamond.columnDefs.splice(1, 0, {field: '渠道'});
                }
                var calSuccess = function (data, status, headers, config) {
                    var consume = data.data;
                    var e_data_in = [];
                    var e_data_out = [];
                    //表格数据
                    var gridData = [];
                    //渠道转为数组
                    var tagArr = []
                    if (!(message.channel == null)) {
                        var tagArr = message.channel.split(','); //字符串转数组
                    }
                    //下载表名
                    $scope.gridOptionsDiamond.exporterCsvFilename = message.startD + '至' + message.endD + '钻石统计表.csv';

                    var _in = 0;
                    var _out = 0;
                    var _data = '';
                    _.each(consume, function (item, index) {
                        if (tagArr.length <= 1) {
                            e_data_in.push([item.time, item.in]);
                            e_data_out.push([item.time, item.out]);
                        } else if (tagArr.length > 1) {
                            if (_data == '' || _data == item.time) {
                                _in = Number(_in) + Number(item.in);
                                _out = Number(_out) + Number(item.out);
                                _data = item.time;
                            } else {
                                e_data_in.push([_data, _in]);
                                e_data_out.push([_data, _out]);
                                _data = item.time;
                                _in = Number(item.in);
                                _out = Number(item.out);
                            }
                            if ((consume.length - 1) == (index)) {
                                e_data_in.push([item.time, _in]);
                                e_data_out.push([item.time, _out]);
                            }
                        }
                        var gData = {};
                        gData['日期'] = item.time;
                        if (message.server) {
                            for (var i = 0; i < serAlicDic.service[0].length; i++) {
                                (function (i) {
                                    if (serAlicDic.service[0][i] == item.server) {
                                        gData['服务器'] = serAlicDic.service[1][i];
                                    }
                                })(i);
                            }
                        }
                        ;
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
                        gData['获得'] = item.in;
                        gData['消耗'] = item.out;
                        gridData.push(gData);
                    });
                    $scope.gridOptionsDiamond.data = gridData;
                    if (tagArr.length <= 1) {
                        mobaDiamondConsumeChart.setOption({
                            legend: {data: ['获得', '消耗']},
                            //显示工具条
                            toolbox: {
                                show: true,
                                feature: {
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
                            series: [
                                {
                                    name: '获得',
                                    type: 'line',
                                    data: e_data_in
                                },
                                {
                                    name: '消耗',
                                    type: 'line',
                                    data: e_data_out
                                }
                            ]
                        });
                    } else if (tagArr.length > 1) {
                        mobaDiamondConsumeChart.setOption({
                            legend: {data: ['获得', '消耗']},
                            //显示工具条
                            toolbox: {
                                show: true,
                                feature: {
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
                            series: [
                                {
                                    name: '获得',
                                    type: 'line',
                                    data: e_data_in
                                },
                                {
                                    name: '消耗',
                                    type: 'line',
                                    data: e_data_out
                                }
                            ]
                        });
                    }
                    else {
                        if (mobaDiamondConsumeChart) {
                            mobaDiamondConsumeChart.dispose();
                            mobaDiamondConsumeChart = echartsService.line('mobaDiamondConsume', '钻石产出和消耗');
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
                    url: '/gmtool' + requires.MOBA_GET_DIAMOND,
                    params: message
                }).success(calSuccess).error(calError);
                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
            }


            //金币总览    
            var mobaGoldConsumeChart = echartsService.line('mobaGoldConsume', '金币产出和消耗');
            $scope.consumeGold = function () {
                //获得输入参数
                var message = $scope.message;
                message.server = ($scope.ciyuan.server == null || $scope.ciyuan.server.length == undefined) ? '' : $scope.ciyuan.server;
                message.channel = ($scope.ciyuan.alliance == null || $scope.ciyuan.alliance.length == undefined) ? '' : $scope.ciyuan.alliance.join(',');
                message.startD = $(".date-picker-star").val();
                message.endD = $(".date-picker-end").val();
                //表头初始化
                $scope.gridOptionsGold.columnDefs = [
                    {
                        field: '日期', sort: {
                        direction: 'desc', priority: 0
                    }
                    },
                    {field: '获得'},
                    {field: '消耗'},
                ];
                if (message.server) {
                    $scope.gridOptionsGold.columnDefs.splice(1, 0, {field: '服务器'});
                }
                ;
                if (message.channel) {
                    $scope.gridOptionsGold.columnDefs.length > 3 ? $scope.gridOptionsGold.columnDefs.splice(2, 0, {field: '渠道'}) :
                        $scope.gridOptionsGold.columnDefs.splice(1, 0, {field: '渠道'});
                }
                var calSuccess = function (data, status, headers, config) {
                    var consume = data.data;
                    var e_data_in = [];
                    var e_data_out = [];
                    //表格数据
                    var gridData = [];
                    //渠道转为数组
                    var tagArr = []
                    if (!(message.channel == null)) {
                        var tagArr = message.channel.split(','); //字符串转数组
                    }
                    ;
                    //下载表名
                    $scope.gridOptionsGold.exporterCsvFilename = message.startD + '至' + message.endD + '金币统计表.csv';

                    var _in = 0;
                    var _out = 0;
                    var _data = '';
                    _.each(consume, function (item) {
                        if (tagArr.length <= 1) {
                            e_data_in.push([item.time, item.in]);
                            e_data_out.push([item.time, item.out]);
                        } else if (tagArr.length > 1) {
                            if (_data == '' || _data == item.time) {
                                _in = Number(_in) + Number(item.in);
                                _out = Number(_out) + Number(item.out);
                                _data = item.time;
                            } else {
                                e_data_in.push([_data, _in]);
                                e_data_out.push([_data, _out]);
                                _data = item.time;
                                _in = Number(item.in);
                                _out = Number(item.out);
                            }
                            if ((consume.length - 1) == (index)) {
                                e_data_in.push([item.time, _in]);
                                e_data_out.push([item.time, _out]);
                            }
                        }
                        var gData = {};
                        gData['日期'] = item.time;
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
                        gData['获得'] = item.in;
                        gData['消耗'] = item.out;
                        gridData.push(gData);
                    });
                    $scope.gridOptionsGold.data = gridData;
                    if (tagArr.length <= 1) {
                        mobaGoldConsumeChart.setOption({
                            legend: {data: ['获得', '消耗']},
                            //显示工具条
                            toolbox: {
                                show: true,
                                feature: {
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
                                type: 'time',
                                interval: 24 * 60 * 60 * 1000
                            },
                            series: [
                                {
                                    name: '获得',
                                    type: 'line',
                                    data: e_data_in
                                },
                                {
                                    name: '消耗',
                                    type: 'line',
                                    data: e_data_out
                                }
                            ]
                        });
                    } else if (tagArr.length > 1) {
                        mobaGoldConsumeChart.setOption({
                            legend: {data: ['获得', '消耗']},
                            //显示工具条
                            toolbox: {
                                show: true,
                                feature: {
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
                                type: 'time',
                                interval: 24 * 60 * 60 * 1000
                            },
                            series: [
                                {
                                    name: '获得',
                                    type: 'line',
                                    data: e_data_in
                                },
                                {
                                    name: '消耗',
                                    type: 'line',
                                    data: e_data_out
                                }
                            ]
                        });
                    }
                    else {
                        if (mobaGoldConsumeChart) {
                            mobaGoldConsumeChart.dispose();
                            mobaGoldConsumeChart = echartsService.line('mobaGoldConsume', '金币产出和消耗');
                        }
                    }
                    spinner.spin();
                };

                var calError = function (data, status, headers, config) {
                    console.log(status);
                    spinner.spin();
                };

                $http({
                    method : 'GET' ,
                    url : '/gmtool' + requires.MOBA_GET_GOLD,
                    params : message
                }).success( calSuccess ).error( calError );
                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
            }

            $scope.resource = function () {
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