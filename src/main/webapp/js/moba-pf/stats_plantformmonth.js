/**
 * Created by Administrator on 2017/6/28.
 */
app.controller('statsPlantformMonth',
    ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants', '$sessionStorage',
        function ($scope, $http, $location, $cookieStore, echartsService, uiGridConstants, $sessionStorage) {
            $scope.retentionFilter = [{dictValue: 1, dictName: '次日'},
                {dictValue: 2, dictName: '2日'},
                {dictValue: 3, dictName: '3日'},
                {dictValue: 4, dictName: '4日'},
                {dictValue: 5, dictName: '5日'},
                {dictValue: 6, dictName: '6日'},
                {dictValue: 7, dictName: '7日'},
                {dictValue: 8, dictName: '8日'},
                {dictValue: 9, dictName: '9日'},
                {dictValue: 10, dictName: '10日'},
                {dictValue: 11, dictName: '11日'},
                {dictValue: 12, dictName: '12日'},
                {dictValue: 13, dictName: '13日'},
                {dictValue: 14, dictName: '14日'},
                {dictValue: 15, dictName: '15日'},
                {dictValue: 16, dictName: '16日'},
                {dictValue: 17, dictName: '17日'},
                {dictValue: 18, dictName: '18日'},
                {dictValue: 19, dictName: '19日'},
                {dictValue: 20, dictName: '20日'},
                {dictValue: 21, dictName: '21日'},
                {dictValue: 22, dictName: '22日'},
                {dictValue: 23, dictName: '23日'},
                {dictValue: 24, dictName: '24日'},
                {dictValue: 25, dictName: '25日'},
                {dictValue: 26, dictName: '26日'},
                {dictValue: 27, dictName: '27日'},
                {dictValue: 28, dictName: '28日'},
                {dictValue: 29, dictName: '29日'},
                {dictValue: 30, dictName: '30日'}];
            $scope.filter = {channel: '', server: '', time: '', reday: [{dictValue: 1, dictName: '次日'}]};
            $scope.gridOptions = {
                treeRowHeaderAlwaysVisible: false,
                enableRowSelection: false,
                enableGridMenu: true,
                enableSelectAll: true,
                exporterMenuPdf: false,
                exporterOlderExcelCompatibility: true,
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                }
            };

            /**
             *控制appid只选择次元 .
             */
            $scope.appid = '20015';
            for (var i = 0; i < $scope.sysPlantformContainerInfo.length; i++) {
                if ($scope.sysPlantformContainerInfo[i].appId == $scope.appid) {
                    $scope.filter.server = $scope.sysPlantformContainerInfo[i];
                    break;
                }
            }

            $scope.export = function () {
                var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
                $scope.gridApi.exporter.csvExport('all', 'all', myElement);
            };

            $scope.Plantformmonth = function () {
                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);

                var message = $scope.message;
                message.appId = $scope.filter.server == null ? '' : $scope.filter.server.appId;
                message.allianceId = $scope.filter.channel == null ? '' : $scope.filter.channel.allianceId;
                //message.channelTag = ($scope.filter.channelTag == null || $scope.filter.channelTag.length == 0) ? '' : $scope.filter.channelTag.join(',');
                message.startD = $(".date-picker-star").val();
                message.endD = $(".date-picker-end").val();
                message.startD = message.startD.substr(0, 8) + "01";
                message.endD = message.endD.substr(0, 8) + "01";

                $scope.gridOptions.columnDefs = "";
                $scope.gridOptions.columnDefs = [
                    {field: '日期', enableColumnResizing: false},
                    {field: 'mau', enableColumnResizing: false},
                    {field: 'sale', enableColumnResizing: false},
                    {field: 'mnu', enableColumnResizing: false},
                    {field: 'payRate', enableColumnResizing: false},
                    {field: 'arppu', enableColumnResizing: false},
                    {field: 'arpu', enableColumnResizing: false}
                ];
                if (message.appId) {
                    $scope.gridOptions.columnDefs.splice(1, 0, {field: '游戏ID'});
                }
                if (message.allianceId) {
                    $scope.gridOptions.columnDefs.splice(2, 0, {field: '渠道'});
                }
                var dayArray = [];//保存多次的数据
                var calSuccess = function (data, status, headers, config) {
                    var gridData = [];
                    try {
                        dayArray = data.data;
                        for (var i = 0; i < dayArray.length; i++) {
                            var dataT = dayArray[i].mau.date.substr(0, 10);
                            gridData.push({
                                "日期": dataT,
                                "游戏ID": dayArray[i].mau.appId,
                                "渠道": dayArray[i].mau.allianceId,
                                "mau": dayArray[i].mau.mauCount,
                                "mnu": dayArray[i].mnu.mnuCount,
                                "payRate": dayArray[i].payRate.payRate,
                                "sale": dayArray[i].sale.totalAmount,
                                "arppu": dayArray[i].arppu.arppu,
                                "arpu": dayArray[i].arpu.arpu
                            });
                        }
                    } catch (err) {

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
                    url: '/gmtool' + requires.STATS_pfMonth,
                    params: message
                }).success(calSuccess).error(calError);

            }
        }])


