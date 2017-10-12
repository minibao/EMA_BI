app.controller('mobaOnlineTime',
    ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants', '$sessionStorage',
        function ($scope, $http, $location, $cookieStore, echartsService, $sessionStorage) {
            $scope.ciyuan = {server: '', alliance: ''};
            $scope.hideGrid = $sessionStorage.excelShow;
            $scope.$watch('hideGrid', function () {
                $sessionStorage.excelShow = $scope.hideGrid;
            })
            var mobaOlineTimeChart = echartsService.bar('mobaOnlineTime', '在线时长分布统计表');
            ;
            var serAlicDic = $scope.ciyuanSerAlicDic;
            /*定义数组*/
            var setSeriesUser = [];
            var lengedData = []; //图例
            var selectedDate = null;   //已选择的日期
            //表格声明
            $scope.gridOptions = {
                columnDefs: $scope.columns,
                treeRowHeaderAlwaysVisible: false,
                enableRowSelection: false,
                showGridFooter: true,
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

            $scope.mabaOnlineTime = function () {
                var message = $scope.message;
                message.server = ($scope.ciyuan.server == null || $scope.ciyuan.server.length == undefined) ? '' : $scope.ciyuan.server;
                message.channel = ($scope.ciyuan.alliance == null || $scope.ciyuan.alliance.length == 0) ? '' : $scope.ciyuan.alliance.join(',');
                message.startD = $(".date-picker-single").val() + '+00:00:00';
                message.endD = $(".date-picker-single").val() + '+23:59:59';
                var lengedName = '';
                var svrName = $('.dropdown-toggle:eq(0)').attr('title');
                var alcName = $('.dropdown-toggle:eq(1)').attr('title');
                var date = message.startD + '-' + message.endD;
                if (svrName == '请选择服务器') svrName = '全服务器';
                if (alcName == '选择渠道') alcName = '全渠道';
                lengedName = svrName + '-' + alcName;
                if (selectedDate != date) {
                    setSeriesUser = [];
                    lengedData = [];
                    selectedDate = message.startD + '-' + message.endD;
                    if (mobaOlineTimeChart) {
                        mobaOlineTimeChart.dispose();
                        mobaOlineTimeChart = echartsService.bar('mobaOnlineTime', '在线时长分布统计表');
                    }
                }

                var calSuccess = function (data, status, headers, config) {
                    var onlineTime = data.data;
                    var e_data = [];
                    var gridData = [];
                    //渠道转为数组
                    var tagArr = []
                    if (!(message.channel == null)) {
                        var tagArr = message.channel.split(','); //字符串转数组
                    }
                    ;
                    //下载表名
                    $scope.gridOptions.exporterCsvFilename = message.startD + '至' + message.endD + '在线时长分布统计表.csv';
                    //表头
                    $scope.gridOptions.columnDefs = [
                        {
                            field: '时间', sort: {
                            direction: 'desc', priority: 0
                        }
                        },
                        {field: '在线时长', type: 'number'},
                        {field: '在线人数'}
                    ];
                    if (message.server) {
                        $scope.gridOptions.columnDefs.splice(1, 0, {field: '服务器'});
                    }
                    ;
                    if (message.channel) {
                        $scope.gridOptions.columnDefs.length > 3 ? $scope.gridOptions.columnDefs.splice(2, 0, {field: '渠道'}) :
                            $scope.gridOptions.columnDefs.splice(1, 0, {field: '渠道'})
                    }
                    ;
                    if (mobaOlineTimeChart == null) {
                        mobaOlineTimeChart = echartsService.bar('mobaOnlineTime', '在线时长分布统计表');
                    }
                    _.each(onlineTime, function (item) {
                        //给grid的数据
                        var gData = {};
                        gData = {
                            '时间': item.CreateOnlineTime,
                            '在线时长': item.onlineTime,
                            '在线人数': item.allNum
                        }
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
                        gridData.push(gData);
                        //给echarts的数据
                        e_data.push([item.onlineTime, item.allNum]);
                    });
                    if (tagArr.length >= 1 || tagArr[0] == '') {
                        //储存图例数据
                        lengedData.push(lengedName);
                        setSeriesUser.push({
                            name: lengedName,
                            type: 'bar',
                            data: e_data
                        });
                    } else {
                        setSeriesUser = [];
                        lengedData = [];
                    }

                    $scope.gridOptions.data = gridData;

                    //单渠道绘制图标
                    if (tagArr.length >= 1 || tagArr[0] == '') {
                        mobaOlineTimeChart.setOption({
                            legend: {
                                data: lengedData
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
                                name: '在线时长'
                            },
                            yAxis: {
                                name: '人数'
                            },
                            series: setSeriesUser
                        });
                    } else {
                        if (mobaOlineTimeChart) {
                            mobaOlineTimeChart.dispose();
                            mobaOlineTimeChart = echartsService.bar('mobaOnlineTime', '在线时长分布统计表');
                        }
                    }
                    spinner.spin();
                }
                var calError = function (data, status, headers, config) {
                    console.log(status);
                    spinner.spin();
                };

                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.MOBA_ONLINE_TIME,
                    params: message
                }).success(calSuccess).error(calError);

                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
            };
            setTimeout(function () {
                $scope.mabaOnlineTime();
            }, $scope.reqDelay);
        }]);


//style controll 
$(function () {

});