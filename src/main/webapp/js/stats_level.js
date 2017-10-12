app.controller('statsLevel',
    ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants',
        function ($scope, $http, $location, $cookieStore, echartsService) {
            $scope.filter = {channel: '', server: '', time: ''};
            var statsUserLevelChart;

            /*定义数组*/
            var setSeriesUser = [];   //玩家等级
            var lengedData = []; //图例
            var selectedChannel = null;   //已选择的服务器
            var selectedChannelTag = null;
            var selectedContainer = null;   //已选择的渠道
            var selectedDate = null;   //已选择的日期
            var e_title = ['等级'];
            var excel_data = [];

            //表格声明
            $scope.gridOptions = {
                columnDefs: $scope.columns,
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

            //绑定筛选
            $scope.timeMethod = $('#selectFilter').val();
            $scope.filter.vocation = $scope.vocations[0];
            $scope.filter.retain = $scope.retain[0];
            $scope.filter.pay = $scope.pay[0];

            $scope.userLevel = function () {

                var message = $scope.message;
                message.dateInfo = $(".date-picker-single").val();
                message.containerName = $scope.filter.server == null ? null : $scope.filter.server.containerValue;
                message.channel = $scope.filter.channel == null ? null : $scope.filter.channel.chnValue;
                message.channelTag = ($scope.filter.channelTag == null || $scope.filter.channelTag.length == 0) ? null : $scope.filter.channelTag.join(',');
                message.startD = $(".date-picker-star").val();
                message.endD = $(".date-picker-end").val();
                message.vocation = $scope.filter.vocation.value;
                message.isRetain = $scope.filter.retain.value;
                message.isPay = $scope.filter.pay.value;
                message.timeType = 0;

                var lengedName = [];
                if ($scope.filter.server)
                    lengedName.push($scope.filter.server.containerName);
                if ($scope.filter.channel)
                    lengedName.push($scope.filter.channel.chnName);
                if (message.channelTag)
                    lengedName.push(message.channelTag);
                if (message.vocation)
                    lengedName.push($scope.filter.vocation.name);
                if (message.isRetain)
                    lengedName.push($scope.filter.retain.name);
                if (message.isPay)
                    lengedName.push($scope.filter.pay.name);
                if (lengedName.length == 0)
                    lengedName = ['全部'];

                if (statsUserLevelChart == null)
                    statsUserLevelChart = echartsService.bar('statsUserLevel', '玩家等级分布', lengedName.join('-'), lengedName.join('-'));

                if (selectedChannel != message.channel
                    || selectedChannelTag != message.channelTag
                    || selectedContainer != message.containerName
                    || selectedDate != message.dateInfo) {
                    selectedChannel = message.channel;
                    selectedChannelTag = message.channelTag;
                    selectedContainer = message.containerName;
                    selectedDate = message.dateInfo;
                    //置空
                    setSeriesUser = [];
                    lengedData = [];
                    excel_data = [];
                    e_title = ['等级'];
                    //重绘画布
                    statsUserLevelChart.dispose();
                    statsUserLevelChart = echartsService.bar('statsUserLevel', '玩家等级分布', lengedName.join('-'), lengedName.join('-'));
                }
                //初始化表格
                $scope.gridOptions.columnDefs = [];
                $scope.gridOptions.data = [];

                var calSuccess = function (data, status, headers, config) {
                    setSeriesUser = [];
                    statsUserLevelChart.dispose();
                    statsUserLevelChart = null;
                    if (statsUserLevelChart == null)
                        statsUserLevelChart = echartsService.bar('statsUserLevel', '玩家等级分布');
                    var level = data.level;
                    var e_data = [];
                    var gridData = [];
                    //渠道转为数组
                    var tagArr = []
                    if (!(message.channelTag == null)) {
                        var tagArr = message.channelTag.split(','); //字符串转数组
                    }
                    ;
                    //下载表名
                    if (message.startD && message.endD)
                        $scope.gridOptions.exporterCsvFilename = message.startD + '至' + message.endD + '等级分布统计表.csv';
                    else if (message.dateInfo)
                        $scope.gridOptions.exporterCsvFilename = message.dateInfo + '等级分布统计表.csv';

                    _.each(level, function (item) {
                        //给grid的数据
                        var gData = {};
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
                        if ($scope.timeMethod == 0) {
                            gData['时间'] = item.dateInfo;
                        } else if ($scope.timeMethod == 1) {
                            gData['角色创建时间'] = (message.startD + '-' + message.endD);   //后端无返回,平衡dataInfo
                        }
                        ;
                        if (item.vocation != null) {
                            gData['职业'] = $scope.vocationName[item.vocation];
                        }
                        ;
                        gData['等级'] = item.lv;
                        gData['数量'] = item.num;
                        if (item.isPay != null) {
                            gData['付费状态'] = $scope.payName[item.isPay];
                        }
                        ;
                        if (item.isRetain != null) {
                            gData['留存状态'] = $scope.retainName[item.isRetain];
                        }
                        ;
                        gridData.push(gData);
                        //给echarts的数据
                        if (tagArr.length <= 1) {
                            while (e_data.length < item.lv) {
                                if ((e_data.length + 1) == item.lv) {
                                    e_data.push([item.lv, item.num]);
                                    break;
                                }
                                else {
                                    e_data.push([e_data.length + 1, 0]);
                                }
                            }
                        }
                    });

                    if (e_data.length != 0 && tagArr.length <= 1) {
                        //储存图例数据
                        lengedData.push(lengedName.join('-'));
                        e_title.push(lengedName.join('-'));
                        setSeriesUser.push({
                            name: lengedName.join('-'),
                            type: 'bar',
                            data: e_data,
                            color: color[e_data.length]
                        });
                    }

                    $scope.gridOptions.data = gridData;

                    //单渠道绘制图标
                    //if (tagArr.length <= 1) {
                        statsUserLevelChart.setOption({
                            legend: {data: lengedData},
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
                                name: '等级',
                                type: 'value'
                            },
                            yAxis: {
                                name: '人数'
                            },
                            series: setSeriesUser
                        });
                    //} else {
                    //    if (statsUserLevelChart) {
                    //        statsUserLevelChart.dispose();
                    //        statsUserLevelChart = echartsService.bar('statsUserLevel', '玩家等级分布');
                    //    }
                    //}
                    spinner.spin();
                }
                var calError = function (data, status, headers, config) {
                    console.log(status);
                    spinner.spin();
                };

                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.STATS_LEVEL,
                    params: message
                }).success(calSuccess).error(calError);

                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
            };
            setTimeout(function () {
                $scope.userLevel();
            }, $scope.reqDelay);
        }]);


//style controll 
$(function () {

});