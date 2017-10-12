app.controller('statsOnline',
    ['$scope', '$http', '$location', '$cookieStore', 'echartsService',
        function ($scope, $http, $location, $cookieStore, echartsService) {
            $scope.filterList = [{channel: '', server: ''},
                {channel: '', server: '', time: ''}];
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
            var storageX = [];  //储存X轴变动
            var YData_his = [];
            var storageX_his = [];

            $scope.realtimeOnline = function () {
                var message = $scope.message;
                message.containerName = $scope.filterList[0].server == null ? null : $scope.filterList[0].server.containerValue;
                message.channel = $scope.filterList[0].channel == null ? null : $scope.filterList[0].channel.chnValue;


                var servername = $scope.filterList[0].server == null ? null : $scope.filterList[0].server.containerName;
                var channelname = $scope.filterList[0].channel == null ? null : $scope.filterList[0].channel.chnName;
                var legendname = '';
                if (servername)
                    legendname = servername;
                else
                    legendname = '全服务器';
                if (channelname)
                    legendname = legendname + '-' + channelname;
                else
                    legendname = legendname + '-全渠道';

                statsOnlineRealTimeChart = echartsService.line('statsOnlineRealTime', '当前在线人数', legendname, legendname);
                var calSuccess = function (data, status, headers, config) {
                    statsOnlineRealTimeChart.dispose();
                    statsOnlineRealTimeChart = null;

                    if (statsOnlineRealTimeChart == null)
                        statsOnlineRealTimeChart = echartsService.line('statsOnlineRealTime', '当前在线人数', legendname, legendname);
                    var dayOnlineList = data.dayOnlineList;
                    var e_data = [];  //给echarts的数据
                    var data = [];  //给表格的数据

                    _.each(dayOnlineList, function (item) {
                        e_data.push([item.dateInfo + ' ' + item.timeInfo, item.onlineNum]); //给echarts的数据
                        data.push([item.timeInfo, item.onlineNum]);  //给表格数据
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
                            type: 'time',
                            interval: 3 * 60 * 60 * 1000
                        },
                        yAxis: {type: 'value'},
                        //显示数据
                        series: setSeries
                    });
                };

                var calError = function (data, status, headers, config) {
                    console.log(status);
                };

                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.STATS_ONLINE_REAL_TIME,
                    params: message
                }).success(calSuccess).error(calError);
            }

            $scope.dayOnlineHist = function () {
                var message = $scope.message;
                message.dateInfo = $(".date-picker-single").val();
                message.containerName = $scope.filterList[1].server == null ? null : $scope.filterList[1].server.containerValue;
                message.channel = $scope.filterList[1].channel == null ? null : $scope.filterList[1].channel.chnValue;
                var servername = $scope.filterList[1].server == null ? null : $scope.filterList[1].server.containerName;
                var channelname = $scope.filterList[1].channel == null ? null : $scope.filterList[1].channel.chnName;
                var legendname = message.dateInfo;

                if (servername)
                    legendname = legendname + '-' + servername;
                else
                    legendname = legendname + '-全服务器';
                if (channelname)
                    legendname = legendname + '-' + channelname;
                else
                    legendname = legendname + '-全渠道';

                statsOnlineHistChart = echartsService.line('statsOnlineHist', '历史在线人数', legendname, legendname);

                var calSuccess = function (data, status, headers, config) {
                    statsOnlineHistChart.dispose();
                    statsOnlineHistChart = null;
                    if (statsOnlineHistChart == null)
                        statsOnlineHistChart = echartsService.line('statsOnlineHist', '历史在线人数', legendname, legendname);
                    var dayOnlineList = data.dayOnlineList;
                    var e_data = [];  //给echarts的数据
                    var data = [];  //给表格的数据

                    _.each(dayOnlineList, function (item) {
                        e_data.push({value: [item.dateInfo + ' ' + item.timeInfo, item.onlineNum]}); //给echarts的数据
                        data.push([item.timeInfo, item.onlineNum]);  //给表格数据
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
                };

                var calError = function (data, status, headers, config) {
                    console.log(status);
                };

                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.STATS_ONLINE_HIST,
                    params: message
                }).success(calSuccess).error(calError);
            }

            setTimeout(function () {
                $scope.realtimeOnline();
                $scope.dayOnlineHist();
            }, $scope.reqDelay);
        }]);


//style controll 
$(function () {

});
