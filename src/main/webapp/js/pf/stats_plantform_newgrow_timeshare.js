/**
 * Created by Administrator on 2017/1/17.
 */
app.controller('statsPlantformNewGrowTimeshare',
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
                showGridFooter: true,
                showColumnFooter: true,
                enableGridMenu: true,
                enableSelectAll: true,
                exporterMenuPdf: false,
                columnDefs: [
                    {field: '时间', enableColumnResizing: false},
                    {field: '新增游戏设备数', enableColumnResizing: false},
                    {field: '新增游戏账号数', enableColumnResizing: false},
                    {field: '新增平台设备数', enableColumnResizing: false},
                    {field: '新增平台账号数', enableColumnResizing: false}
                ],
                exporterOlderExcelCompatibility: true,
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                }
            };

            $scope.export = function () {
                var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
                $scope.gridApi.exporter.csvExport('all', 'all', myElement);
            };
            $scope.PlantformactiveUserCompare = function () {
                //$scope.filter.server.appId=window.inputappId;
                //$scope.filter.channel.allianceId=window.inputchannel;
                //$scope.filter.channelTag=window.inputchanneltag;
                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
                var message = $scope.message;
                console.log($scope.filter.server);
                console.log($scope.filter.server.appId);

                message.appId = $scope.filter.server == null ? '' : $scope.filter.server.appId;
                message.allianceId = $scope.filter.channel == null ? '' : $scope.filter.channel.allianceId;
                message.channelTag = ($scope.filter.channelTag == null || $scope.filter.channelTag.length == 0) ? '' : $scope.filter.channelTag.join(',');
                message.compareD = $(".date-picker-single").val();
                //根据单选框控制grid的列数
                $scope.gridOptions.columnDefs = "";
                $scope.gridOptions.columnDefs = [
                    {field: '时间', enableColumnResizing: false},
                    {field: '新增游戏设备数', enableColumnResizing: false,aggregationType: uiGridConstants.aggregationTypes.sum},
                    {field: '新增游戏账号数', enableColumnResizing: false,aggregationType: uiGridConstants.aggregationTypes.sum},
                    {field: '新增平台设备数', enableColumnResizing: false,aggregationType: uiGridConstants.aggregationTypes.sum},
                    {field: '新增平台账号数', enableColumnResizing: false,aggregationType: uiGridConstants.aggregationTypes.sum}
                ];
                if (message.appId) {
                    $scope.gridOptions.columnDefs.splice(1, 0, {field: '游戏ID'});
                }

                if (message.allianceId) {
                    //$scope.gridOptions.columnDefs.length > 4 ? $scope.gridOptions.columnDefs.splice(2,0,{field:'渠道'}) :
                    $scope.gridOptions.columnDefs.splice(2, 0, {field: '渠道'});
                }

                if (message.channelTag) {
                    $scope.gridOptions.columnDefs.splice(3, 0, {field: '子渠道'});
                }

                var calSuccess = function (data, status, headers, config) {
                    var active_timeshare = data.reg;
                    var gridData = [];
                    var fileName = ['平台分时活跃'];
                    var temp = "00";
                    var device = 0;
                    var uid = 0;
                    var pfdevice = 0;
                    var pfuid = 0;
                    var itemdata;
                    var hour = 0;
                    for (var i = 0; i < active_timeshare.length; i++) {
                        var shareresult = active_timeshare[i].data.result;
                        var sharetime = active_timeshare[i].time;

                        //匹配2017-01-16 00,当出现不一样时减去上一次
                        sharetime = sharetime.split(" ");
                        sharetime = sharetime[1].split(":");
                        //sharetime = sharetime[0];
                        if(sharetime[1] == "00" && sharetime[2] == "00" && sharetime[0]== "00" ){
                            continue;
                        }
                        if (i == active_timeshare.length - 1) {
                            var _hour = Number(hour) + 1;
                            gridData.push({
                                "时间": shareresult.regDate + " " + Number(hour) + "—" + _hour + "时",
                                "新增游戏设备数": shareresult.gameDeviceCount - device,
                                "新增游戏账号数": shareresult.gameUidCount - uid,
                                "新增平台设备数": shareresult.pfDeviceCount - pfdevice,
                                "新增平台账号数": shareresult.pfUidCount - pfuid,
                                "游戏ID": message.appId,
                                "渠道": shareresult.allianceId,
                                "子渠道": shareresult.channelTag
                            });
                        }
                        if (sharetime[1] == "00" && sharetime[2] == "00") {
                            var _hour = Number(hour) + 1;
                            gridData.push({
                                "时间": shareresult.regDate + " " + Number(hour) + "—" + _hour + "时",
                                "新增游戏设备数": shareresult.gameDeviceCount - device,
                                "新增游戏账号数": shareresult.gameUidCount - uid,
                                "新增平台设备数": shareresult.pfDeviceCount - pfdevice,
                                "新增平台账号数": shareresult.pfUidCount - pfuid,
                                "游戏ID": message.appId,
                                "渠道": shareresult.allianceId,
                                "子渠道": shareresult.channelTag
                            });
                            device = shareresult.gameDeviceCount;//0;
                            uid = shareresult.gameUidCount;//0;
                            pfdevice = shareresult.pfDeviceCount;//0;
                            pfuid = shareresult.pfUidCount;//0;
                            hour = hour + 1;
                        }/* else {
                            device = shareresult.gameDeviceCount;
                            uid = shareresult.gameUidCount;
                            pfdevice = shareresult.pfDeviceCount;
                            pfuid = shareresult.pfUidCount;

                        }*/
                        itemdata = active_timeshare[i];
                        temp = sharetime;
                    }
                    $scope.gridOptions.data = gridData;
                    spinner.spin();
                };
                var calError = function (data, status, headers, config) {
                    console.log(status);
                    spinner.spin();
                };
                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.STATS_PLANTFORM_NEW_GROW_REALTIME,
                    params: message
                }).success(calSuccess).error(calError);


            }

            setTimeout(function() {
                $scope.PlantformactiveUserCompare();
            }, $scope.reqDelay);

        }])
;

//style controll
$(function () {

});