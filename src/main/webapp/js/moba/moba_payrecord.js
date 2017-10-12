/**
 * Created by Administrator on 2017/1/13.
 */
app.controller('mobaPayRecord', ['$scope', '$http', '$location', '$cookieStore', 'uiGridConstants',
    function ($scope, $http, $location, $cookieStore, uiGridConstants) {
        $scope.columns = [
            {field: '时间', enableColumnResizing: false},
            {field: 'UID', enableColumnResizing: false},
            {field: '服务器', enableColumnResizing: false},
            {field: '现金', type: 'number', enableColumnResizing: true},
            {field: '钻石', type: 'number', enableColumnResizing: false}
        ];
        //$scope.export = function () {
        //    var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
        //    $scope.gridApi.exporter.csvExport('all', 'all', myElement);
        //};
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
        $scope.payrecord = function () {
            var message = $scope.message;
            message.uid = $("#inputuid").val();
            if (message.uid == null || message.uid == "") {
                layer.msg("UID不能为空！",function(){
                    return false;
                });
            }
            //message.uid="206915579";
            var calSuccess = function (data, status, headers, config) {
                var payrecord = data.data;
                console.log(payrecord);
                var gridData = [];
                var fileName = ['充值记录'];
                angular.forEach(payrecord, function (item, index) {
                    gridData.push({
                        "时间": item.time,
                        "UID": item.uid,
                        "服务器": item.server,
                        "现金": item.cash,
                        "钻石": item.gold
                    });

                });
                $scope.gridOptions.data = gridData;
                spinner.spin();
            }

            var calError = function (data, status, headers, config) {
                console.log(status);
                spinner.spin();
            };

            $http({
                method: 'GET',
                url: '/gmtool' + requires.MOBA_PAYRECORD,
                params: message
            }).success(calSuccess).error(calError);

            var spinner = new Spinner();
            var target = $("#spin").get(0);
            spinner.spin(target);
        };
        $scope.searchbyUID = function () {
            setTimeout(function () {
                $scope.payrecord();
            }, $scope.reqDelay);
        }
    }
]);


//style controll
$(function () {

});
