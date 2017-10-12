/**
 * Created by Administrator on 2017/3/14.
 */
app.controller('supplierShow',
    ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants', '$sessionStorage',
        function ($scope, $http, $location, $cookieStore, echartsService, uiGridConstants, $sessionStorage) {
            $scope.filter = {channel: '', server: '', time: ''};
            $scope.hideGrid = $sessionStorage.excelShow;
            $scope.$watch('hideGrid', function () {
                $sessionStorage.excelShow = $scope.hideGrid;
            })
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
            $scope.showdata = function () {
                var message = $scope.message;
                message.appId = $scope.filter.server == null ? '' : $scope.filter.server.appId;
                message.allianceId = $scope.filter.channel == null ? null : $scope.filter.channel.allianceId;
                message.channelTag = ($scope.filter.channelTag == null || $scope.filter.channelTag.length == 0) ? null : $scope.filter.channelTag.join(',');
                message.startDate = $(".date-picker-star").val();
                message.endDate = $(".date-picker-end").val();
                var calSuccess = function (data, status, headers, config) {
                    var fileName = ['供应商查询-'];
                    var supplierdata = data.data;
                    var gridData = [];
                    //渠道转为数组
                    var tagArr = [];
                    if (!(message.channelTag == null)) {
                        var tagArr = message.channelTag.split(','); //字符串转数组
                    }
                    fileName.push(message.startD + '至' + message.endD);
                    $scope.gridOptions.exporterCsvFilename = fileName.join('-') + '.csv';
                    $scope.gridOptions.columnDefs = [
                        {
                            field: '日期', sort: {
                            direction: 'desc', priority: 0
                        }
                        },
                        {field: '游戏帐号新增'},
                        {field: '游戏设备新增'},
                        //{field: '平台设备新增'},
                        //{field: '平台帐号新增'},
                        {field: '付费用户数'},
                        {field: '收入'}
                    ];
                    //if (message.appId) {
                    //    $scope.gridOptions.columnDefs.splice(1, 0, {field: '游戏ID'});
                    //}
                    //if (message.allianceId) {
                    //    $scope.gridOptions.columnDefs.length > 3 ? $scope.gridOptions.columnDefs.splice(2, 0, {field: '渠道'}) :
                    //        $scope.gridOptions.columnDefs.splice(1, 0, {field: '渠道'});
                    //}
                    //if (message.channelTag) {
                    //    $scope.gridOptions.columnDefs.splice(3, 0, {field: '子渠道'});
                    //}

                    _.each(supplierdata, function(item) {
                        var gData = {};
                        gData['日期'] = item.regDate;
                        if(item.appId != ''){
                            gData["游戏ID"] = item.appId
                        }
                        if( item.allianceId != ''){
                            gData['渠道'] = item.allianceId;
                        }
                        if(item.channelTag != ''){
                            gData['子渠道'] = item.channelTag;
                        }
                        gData['游戏帐号新增'] = item.gameUidCount;
                        gData['游戏设备新增'] = item.gameDeviceCount;
                        gData['收入'] = item.totalAmount;
                        gData['平台设备新增'] = item.pfDeviceCount;
                        gData['付费用户数'] = item.payUser;
                        gData['平台帐号新增'] = item.pdUidCount;
                        gridData.push(gData);
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
                    url: '/gmtool' + requires.SUPPLIER_SHOW,
                    params: message
                }).success(calSuccess).error(calError);
                var spinner = new Spinner();
                var target = $("#spin_b").get(0);
                spinner.spin(target);
            };
            setTimeout(function () {
                $scope.showdata();
            }, $scope.reqDelay);
        }]);

//style controll
$(function () {

});