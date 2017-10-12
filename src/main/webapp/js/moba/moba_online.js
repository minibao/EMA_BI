app.controller('mobaOnline',
    ['$scope', '$http', '$location', '$cookieStore', 'echartsService', '$sessionStorage',
        function ($scope, $http, $location, $cookieStore, echartsService, $sessionStorage) {
            $scope.ciyuan = [{server: '', channel: ''},
                {server: '', channel: '', time: ''}];
            var statsOnlineRealTimeChart;
            var statsOnlineHistChart;
            var y_name = [];
            var e_title = ['时间'];
            var e_title_his = ['时间'];
            var excel_data = [];
            var excel_data_his = [];
            var y_his_name = [];
            var setSeries = [];
            var setHisSeries = [];
            $scope.realtimeOnline = function () {
                var message = $scope.message;
                message.server = ($scope.ciyuan[0].server == null || $scope.ciyuan[0].server.length == undefined) ? '' : $scope.ciyuan[0].server;
                message.startD = '';
                message.endD = '';
                //图例
                var svrName = $('.dropdown-toggle:eq(0)').attr('title');
                if (svrName == '请选择服务器') svrName = '全服务器';
                var legendname = svrName;
                if (statsOnlineRealTimeChart == null)
                    statsOnlineRealTimeChart = echartsService.line('statsOnlineRealTime', '当前在线人数', legendname, legendname);
                var calSuccess = function (data, status, headers, config) {
                    statsOnlineRealTimeChart.dispose();
                    statsOnlineRealTimeChart = null;
                    if (statsOnlineRealTimeChart == null)
                        statsOnlineRealTimeChart = echartsService.line('statsOnlineRealTime', '当前在线人数', legendname, legendname);
                    var dayOnlineList = data.data;
                    var e_data = [];  //给echarts的数据
                    var data = [];  //给表格的数据
                    _.each(dayOnlineList, function (item) {
                        e_data.push([item.lineTime, item.onlineNum]); //给echarts的数据
                        data.push([item.lineTime, item.onlineNum]);  //给表格数据
                    });
                    if (e_data.length != 0) {
                        // 储存lengedName
                        y_name.push(legendname);
                        e_title.push(legendname);
                        setSeries.push({
                            name: legendname,
                            data: e_data,
                            itemStyle: {
                                normal: {opacity: 0}
                            },
                            type: 'line',
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
                    //删除进入的重复项
                    for (var i = 0; i < y_name.length - 1; i++) {
                        if (y_name[i] == y_name[y_name.length - 1]) {
                            y_name.splice(y_name.length - 1, 1);
                            e_title.splice(e_title.length - 1, 1);
                            setSeries.splice(setSeries.length - 1, 1);
                        }
                    }
                    ;
                    buildExcelData(excel_data, data, e_title.length);
                    function newOption() {
                        showDownBtn('downloadExceltop', 'dis');
                        return excelOption(e_title, excel_data, 'realTimeOnlineExcel');
                    }

                    //实时在线人数图表
                    statsOnlineRealTimeChart.setOption({
                        legend: {data: y_name},
                        toolbox: {
                            show: true,
                            feature: {
                                dataView: {
                                    readOnly: false,
                                    lang: ['在线人数详情', '关闭', '刷新'],
                                    optionToContent: newOption
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
                        yAxis: {type: 'value'},
                        //显示数据
                        series: setSeries
                    });
                    spinner.spin();
                };

                var calError = function (data, status, headers, config) {
                    console.log(status);
                    spinner.spin();
                };

                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.STATS_ONLINE,
                    params: message
                }).success(calSuccess).error(calError);
                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
            }

            $scope.dayOnlineHist = function () {
                var message = $scope.message;
                var dateInfo = $(".date-picker-single").val();
                message.startD = dateInfo + '+00:00:00';
                message.endD = dateInfo + '+23:59:59';
                message.server = ($scope.ciyuan[1].server == null || $scope.ciyuan[1].server.length == undefined) ? '' : $scope.ciyuan[1].server;
                var legendname = '';
                var svrName = $('.dropdown-toggle:eq(1)').attr('title');
                if (svrName == '请选择服务器') svrName = '全服务器';
                legendname = dateInfo + '- ' + svrName;
                if (statsOnlineHistChart == null)
                    statsOnlineHistChart = echartsService.line('statsOnlineHist', '历史在线人数');

                var calSuccess = function (data, status, headers, config) {
                    statsOnlineHistChart.dispose();
                    statsOnlineHistChart=null;
                    if (statsOnlineHistChart == null)
                        statsOnlineHistChart = echartsService.line('statsOnlineHist', '历史在线人数');
                    var dayOnlineList = data.data;
                    var e_data = [];  //给echarts的数据
                    var data = [];  //给表格的数据
                    _.each(dayOnlineList, function (item) {
                        e_data.push([item.lineTime, item.onlineNum]); //给echarts的数据
                        data.push([item.lineTime, item.onlineNum]);  //给表格数据
                    });
                    if (e_data.length != 0) {
                        // 储存lengedName
                        y_his_name.push(legendname);
                        e_title_his.push(legendname);
                        setHisSeries.push({
                            name: legendname,
                            data: e_data,
                            itemStyle: {
                                normal: {opacity: 0}
                            },
                            type: 'line',
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
                        //删除进入的重复项
                        for (var i = 0; i < y_his_name.length - 1; i++) {
                            if (y_his_name[i] == y_his_name[y_his_name.length - 1]) {
                                y_his_name.splice(y_his_name.length - 1, 1);
                                e_title_his.splice(e_title_his.length - 1, 1);
                                setHisSeries.splice(setHisSeries.length - 1, 1);
                            }
                        }
                        ;
                        buildExcelData(excel_data_his, data, e_title_his.length);
                        function newOption() {
                            showDownBtn('downloadExcelbot', 'dis');
                            return excelOption(e_title_his, excel_data_his, 'historyOnlineExcel')
                        };

                        //历史在线人数图表
                        statsOnlineHistChart.setOption({
                            legend: {data: y_his_name},
                            //显示工具条
                            toolbox: {
                                show: true,
                                feature: {
                                    dataView: {
                                        readOnly: false,
                                        lang: ['历史在线人数详情', '关闭', '刷新'],
                                        optionToContent: newOption
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
                            xAxis: {type: 'time'},
                            yAxis: {type: 'value'},
                            //显示数据
                            series: setHisSeries
                        });
                    }
                    spinner.spin();
                };

                var calError = function (data, status, headers, config) {
                    console.log(status);
                    spinner.spin();
                };

                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.STATS_ONLINE,
                    params: message
                }).success(calSuccess).error(calError);
                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
            }

            setTimeout(function () {
                $scope.realtimeOnline();
                $scope.dayOnlineHist();
            }, $scope.reqDelay);
        }]);


//style controll 
$(function () {

});
