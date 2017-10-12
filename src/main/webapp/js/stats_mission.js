app.controller('statsMission', ['$scope', '$http', '$location', '$cookieStore', 'echartsService',
    function ($scope, $http, $location, $cookieStore, echartsService) {
        $scope.filter = {channel: '', server: '', time: ''};
        $scope.columns = [{field: '任务'}, {field: '数量'}];
        $scope.gridOptions = {
            columnDefs: $scope.columns,
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

        var statsUserMissionChart;

        $scope.filter.vocation = $scope.vocations[0];
        $scope.timeMethod = $('#selectFilter').val();
        $scope.filter.retain = $scope.retain[0];
        $scope.filter.pay = $scope.pay[0];


        $scope.userMission = function () {

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
            message.timeType = $scope.timeMethod;

            $scope.columns = [{field: '任务'}, {field: '数量'}];
            var lengedName = [];
            if ($scope.filter.server) {
                lengedName.push($scope.filter.server.containerName);
                $scope.columns.splice($scope.columns.length - 1, 0, {field: '服务器'});
            }
            if ($scope.filter.channel) {
                lengedName.push($scope.filter.channel.chnName);
                $scope.columns.splice($scope.columns.length - 1, 0, {field: '渠道'});
            }
            if (message.channelTag) {
                lengedName.push(message.channelTag);
                $scope.columns.splice($scope.columns.length - 1, 0, {field: '子渠道'});
            }
            if (message.timeType == 0) {
                lengedName.push(message.dateInfo);
                $scope.columns.splice($scope.columns.length - 1, 0, {
                    field: '时间', sort: {
                        direction: 'desc', priority: 0
                    }
                });
            } else if (message.timeType == 1) {
                lengedName.push(message.startD + '-' + message.endD);
                $scope.columns.splice($scope.columns.length - 1, 0, {
                    field: '角色创建时间', sort: {
                        direction: 'desc', priority: 0
                    }
                });
            }
            ;

            if (message.vocation) {
                lengedName.push($scope.filter.vocation.name);
                $scope.columns.splice($scope.columns.length - 1, 0, {field: '职业'});
            }
            if (message.isRetain != undefined) {
                lengedName.push($scope.filter.retain.name);
                $scope.columns.splice($scope.columns.length - 1, 0, {field: '留存'});
            }
            if (message.isPay != undefined) {
                lengedName.push($scope.filter.pay.name);
                $scope.columns.splice($scope.columns.length - 1, 0, {field: '付费'});
            }
            if (lengedName.length == 0)
                lengedName = ['全部'];
            $scope.gridOptions.columnDefs = $scope.columns;

            if (statsUserMissionChart == null)
                statsUserMissionChart = echartsService.bar('statsUserMission', '主线任务进度', lengedName.join('-'), lengedName.join('-'));

            var calSuccess = function (data, status, headers, config) {
                statsUserMissionChart.dispose();
                statsUserMissionChart = null;
                if (statsUserMissionChart == null) {
                    statsUserMissionChart = echartsService.line('statsUserMission', '主线任务进度');
                }


                var mission = data.mission;
                var x_data = [];
                var y_data = [];
                var gridData = [];

                //渠道转为数组
                var tagArr = []
                if (!(message.channelTag == null)) {
                    var tagArr = message.channelTag.split(','); //字符串转数组
                }
                ;

                $scope.gridOptions.exporterCsvFilename = lengedName.join('-') + '.csv';
                _.each(mission, function (item) {
                    if (tagArr.length <= 1) {
                        x_data.push(item.mission);
                        y_data.push(item.num);
                    }
                    if (message.timeType == 0) {
                        gridData.push({
                            "任务": item.mission,
                            "数量": item.num,
                            "服务器": item.containerName,
                            "渠道": item.channel,
                            "子渠道": item.channelTag,
                            "留存": $scope.retainName[item.isRetain],
                            "付费": $scope.payName[item.isPay],
                            "职业": $scope.vocationName[item.vocation],
                            "时间": item.dateInfo
                        });
                    }
                    if (message.timeType == 1) {
                        gridData.push({
                            "任务": item.mission,
                            "数量": item.num,
                            "服务器": item.containerName,
                            "渠道": item.channel,
                            "子渠道": item.channelTag,
                            "留存": $scope.retainName[item.isRetain],
                            "付费": $scope.payName[item.isPay],
                            "职业": $scope.vocationName[item.vocation],
                            "角色创建时间": message.startD + '-' + message.endD,   //后端无返回,平衡dataInfo
                        });
                    }

                });
                $scope.gridOptions.data = gridData;
                if (tagArr.length <= 1) {

                    statsUserMissionChart.setOption({
                        legend: {
                            data: lengedName.join('-'),
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
                            type: 'category',
                            name: '主线任务',
                            data: x_data
                        },
                        yAxis: {
                            type: 'value',
                            name: '人数'
                        },
                        series: [{
                            name: lengedName.join('-'),
                            type: 'bar',
                            data: y_data
                        }]
                    });

                } else {
                    if (statsUserMissionChart) {
                        statsUserMissionChart.dispose();
                        statsUserMissionChart = echartsService.line('statsUserMission', '主线任务进度');
                    }
                }
                ;
                spinner.spin();
            }

            var calError = function (data, status, headers, config) {
                console.log(status);
                spinner.spin();
            };

            $http({
                method: 'GET',
                url: '/gmtool' + requires.STATS_MISSION,
                params: message
            }).success(calSuccess).error(calError);

            var spinner = new Spinner();
            var target = $("#spin").get(0);
            spinner.spin(target);
        };
        setTimeout(function () {
            $scope.userMission();
        }, $scope.reqDelay);
    }
]);


//style controll
$(function () {

});
