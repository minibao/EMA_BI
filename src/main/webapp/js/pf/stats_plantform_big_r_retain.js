/**
 * Created by Administrator on 2017/3/3.
 */
/**
 * Created by Administrator on 2017/3/3.
 */
app.controller('statsPlantformBigRRetain',
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
                    {field: '平台账号', enableColumnResizing: false},
                    {field: 'VIP等级', enableColumnResizing: false},
                    {field: '充值App', enableColumnResizing: true, width: '15%'},
                    //{field: 'allMoney', enableColumnResizing: false},
                    {field: '活跃度', enableColumnResizing: false},
                    {field: '激活App', enableColumnResizing: true, width: '15%'},
                    //{field: 'lastGame', enableColumnResizing: false},
                    {field: '最后充值时间', enableColumnResizing: false}
                    //{field: 'lastUplevelTime', enableColumnResizing: false}
                ];
                var calSuccess = function (data, status, headers, config) {

                    if (data.result == 0) {
                        var resData = data.data;
                    } else {
                        layMsg('服务器查询失败！');
                        return false;
                    }
                    var gridData = [];
                    _.each(data.data, function (item, index) {
                        gridData.push({
                            "平台账号": item.uid,
                            "VIP等级": item.level,
                            //"allMoney": item.allMoney,
                            //"lastGame": item.lastGame,
                            "最后充值时间": item.lastTime,
                            //"最后": item.lastUplevelTime,
                            "充值App": item.payApp,
                            "活跃度": item.lastLoginTs,
                            "激活App": item.loginApp
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
                    url: '/gmtool' + requires.STATS_USERLEVEL_GET_APP_INFO,
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

//function appidtoname(appid) {
//    var str = "";
//    var array = appid.split(",");
//    for (var i = 0; i < array.length; i++) {
//        for (var q = 0; q < window.appid_name.length; q++) {
//            if (array[i] == window.appid_name[q].appId) {
//                str = str + window.appid_name[q].appName + ",";
//            }
//        }
//    }
//    str = (str.substring(str.length - 1) == ',') ? str.substring(0, str.length - 1) : str;
//    return str;
//}
