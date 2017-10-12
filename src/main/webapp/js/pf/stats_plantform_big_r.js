/**
 * Created by Administrator on 2017/3/3.
 */
app.controller('statsPlantformBigR',
    ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants',
        function ($scope, $http, $location, $cookieStore, echartsService, uiGridConstants) {
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
            $scope.getdata_bigr = function () {
                var message = $scope.message;
                message.startDate = $(".date-picker-star").val();
                message.endDate = $(".date-picker-end").val();
                $scope.gridOptions.columnDefs = [
                    {field: '平台账号'},
                    {field: 'VIP等级'},
                    //{field: 'allMoney'},
                    {field: '充值App'},
                    {field: '最后充值时间'}
                    //{field: 'lastUplevelTime'}
                ];
                var calSuccess = function (data, status, headers, config) {
                    if (data.result == 0) {
                        var resData = data.data;
                    } else {
                        layMsg('服务器查询失败！');
                        return false;
                    }
                    var gridData = [];
                    _.each(data.data, function (item) {
                        gridData.push({
                            "平台账号": item.uid,
                            "VIP等级": item.level,
                            //"allMoney": item.allMoney,
                            "充值App": item.lastGame,
                            "最后充值时间": item.lastTime
                            //"最后": item.lastUplevelTime
                        });
                    });
                    $scope.gridOptions.data = gridData;
                    spinner.spin();
                };
                var calError = function (data, status, headers, config) {
                    console.log(status);
                    spinner.spin();
                };
                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.STATS_USERLEVEL_GET_DATE,
                    params: message
                }).success(calSuccess).error(calError);
                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
            };

            setTimeout(function () {
                $scope.getdata_bigr();
            }, 500);
        }]);

//style controll
$(function () {

});