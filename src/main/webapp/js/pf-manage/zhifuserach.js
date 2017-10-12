/**
 * Created by Administrator on 2016/12/27.
 */
app.controller('zhifuserach',
    ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants',
        function ($scope, $http, $location, $cookieStore, echartsService, uiGridConstants) {
            //搜索
            var message = {};
            var showdata = {};

            $scope.gridiospay = {
                showGridFooter: true,
                showColumnFooter: true,
                enableGridMenu: true,
                enableSelectAll: true,
                exporterMenuPdf: false,
                exporterCsvFilename: 'Iospay.csv',
                exporterOlderExcelCompatibility: true,
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                }
            };

            $scope.gridorderinfo = {
                showGridFooter: true,
                showColumnFooter: true,
                enableGridMenu: true,
                enableSelectAll: true,
                exporterMenuPdf: false,
                exporterCsvFilename: 'gridorderinfo.csv',
                exporterOlderExcelCompatibility: true,
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                }
            };
            $scope.gridpayment = {
                showGridFooter: true,
                showColumnFooter: true,
                enableGridMenu: true,
                enableSelectAll: true,
                exporterMenuPdf: false,
                exporterCsvFilename: 'gridpayment.csv',
                exporterOlderExcelCompatibility: true,
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                }
            };
            var calSuccess = function (data, status, headers, config) {
                console.log(data);
                showdata = data.data;
                $('.hidediv').css("opacity", "0");
                $(".ChannelCallBack").css("z-index", "100");
                $(".ChannelCallBack").css("opacity", "1");
                // 分别填充四个表单
                console.log(showdata);
                channelfun(showdata.ChannelCallBack);
                iospayfun(showdata.IosPay);
                orderinfofun(showdata.OrderInfo);
                paymentfun(showdata.Payment);

            };

            var calError = function (data, status, headers, config) {
                console.log(status);
            };

            $scope.serachbyuid = function () {

                if ($('.titleinfo').html() == "") {
                    $('.titleinfo').html("渠道支付回调");
                } else {

                }
                var uid = ($('#inputuid').val().length == 0 ? null : $('#inputuid').val());
                message.uid = uid;
                if (uid == null) {
                    alert("UID不能为空");
                } else {

                    $http({
                        method: 'POST',
                        url: '/gmtool' + requires.PF_MANAGE_ZHIFU_SEO,
                        params: message
                    }).success(calSuccess).error(calError);
                }
            }
            //四个表单的方法
            function channelfun(data) {
                $('.ChannelCallBack').empty();
                for (var i = 0; i < data.length; i++) {
                    $('.ChannelCallBack').append("<div class='channel-p' >orderId : " + data[i].orderId + "</div> ")
                    $('.ChannelCallBack').append("<div class='channel-p' >channelDetailInfo : " + data[i].channelDetailInfo + "</div>")
                    $('.ChannelCallBack').append("<div class='channel-p' >channelName : " + data[i].channelName + "</div> <hr>")
                }
            }

            function iospayfun(data) {
                $scope.columns = [
                    {field: 'uid'},
                    {field: 'environment'},
                    {field: 'id'},
                    {field: 'orderId'},
                    {field: 'productId'},
                    {field: 'purchaseDate'},
                    {field: 'quantity'},
                    {field: 'status'},
                    {field: 'transactionId'},
                    {field: 'amount'}
                ];
                $scope.gridiospay = {
                    columnDefs: $scope.columns,
                    showGridFooter: true,
                    showColumnFooter: true,
                    enableGridMenu: true,
                    enableSelectAll: true,
                    exporterMenuPdf: false,
                    columnDefs: [
                        {field: 'uid', minWidth: 50, width: 80, enableColumnResizing: false},
                        {field: 'environment', minWidth: 100, width: 120, enableColumnResizing: true},
                        {field: 'id', minWidth: 50, width: 80, enableColumnResizing: false},
                        {field: 'orderId', minWidth: 300, width: 320, enableColumnResizing: true},
                        {field: 'productId', minWidth: 300, width: 320, enableColumnResizing: true},
                        {field: 'purchaseDate', minWidth: 200, width: 220, enableColumnResizing: true},
                        {field: 'quantity', minWidth: 50, width: 80, enableColumnResizing: false},
                        {field: 'status', minWidth: 50, width: 80, enableColumnResizing: false},
                        {field: 'transactionId', minWidth: 150, width: 180, enableColumnResizing: true},
                        {field: 'amount', minWidth: 50, width: 80, enableColumnResizing: false}
                    ],

                    exporterOlderExcelCompatibility: true,
                    onRegisterApi: function (gridApi) {
                        $scope.gridApi = gridApi;
                    }
                };

                var gridData = [];

                angular.forEach(data, function (item, index) {
                    gridData.push({
                        "uid": item.uid,
                        "environment": item.environment,
                        "id": item.id,
                        "orderId": item.orderId,
                        "productId": item.productId,
                        "purchaseDate": item.purchaseDate,
                        "quantity": item.quantity,
                        "status": item.status,
                        "transactionId": item.transactionId,
                        "amount": item.amount
                    });
                });

                $scope.gridiospay.data = gridData;
            }

            function orderinfofun(data) {
                $scope.columns = [
                    {field: 'uid'},
                    {field: 'allianceId'},
                    {field: 'allianceProdId'},
                    {field: 'allianceProdInfo'},
                    {field: 'allianceUid'},

                    {field: 'appId'},
                    {field: 'channelTag'},
                    {field: 'gameTransCode'},
                    {field: 'id'},
                    {field: 'orderId'},
                    {field: 'orderStatus'},

                    {field: 'price'},
                    {field: 'prodId'},
                    {field: 'prodInfo'},
                    {field: 'quantity'},
                    {field: 'amount'},

                    {field: 'unit'}
                ];
                $scope.gridorderinfo = {
                    columnDefs: $scope.columns,
                    showGridFooter: true,
                    showColumnFooter: true,
                    enableGridMenu: true,
                    enableSelectAll: true,
                    exporterMenuPdf: false,
                    columnDefs: [
                        {field: 'uid', minWidth: 50, width: 80, enableColumnResizing: false},
                        {field: 'allianceId', minWidth: 100, width: 120, enableColumnResizing: false},
                        {field: 'allianceProdId', minWidth: 300, width: 320, enableColumnResizing: true},
                        {field: 'allianceProdInfo', minWidth: 300, width: 320, enableColumnResizing: true},
                        {field: 'allianceUid', minWidth: 100, width: 120, enableColumnResizing: true},

                        {field: 'appId', minWidth: 50, width: 80, enableColumnResizing: false},
                        {field: 'channelTag', minWidth: 100, width: 120, enableColumnResizing: false},
                        {field: 'gameTransCode', minWidth: 300, width: 320, enableColumnResizing: true},
                        {field: 'id', minWidth: 50, width: 80, enableColumnResizing: false},
                        {field: 'orderId', minWidth: 650, width: 680, enableColumnResizing: true},
                        {field: 'orderStatus', minWidth: 100, width: 120, enableColumnResizing: false},

                        {field: 'price', minWidth: 50, width: 80, enableColumnResizing: false},
                        {field: 'prodId', minWidth: 150, width: 180, enableColumnResizing: false},
                        {field: 'prodInfo', minWidth: 150, width: 180, enableColumnResizing: false},
                        {field: 'quantity', minWidth: 50, width: 80, enableColumnResizing: false},
                        {field: 'amount', minWidth: 50, width: 80, enableColumnResizing: false},

                        {field: 'unit', minWidth: 50, width: 80, enableColumnResizing: false}

                    ],

                    exporterOlderExcelCompatibility: true,
                    onRegisterApi: function (gridApi) {
                        $scope.gridApi = gridApi;
                    }
                };

                var gridData = [];

                angular.forEach(data, function (item, index) {
                    gridData.push({
                        "uid": item.uid,
                        "allianceId": item.allianceId,
                        "allianceProdId": item.allianceProdId,
                        "allianceProdInfo": item.allianceProdInfo,
                        "allianceUid": item.allianceUid,

                        "appId": item.appId,
                        "channelTag": item.channelTag,
                        "gameTransCode": item.gameTransCode,
                        "id": item.id,
                        "orderId": item.orderId,
                        "orderStatus": swichorderstatus(item.orderStatus),

                        "price": item.price,
                        "prodId": item.prodId,
                        "prodInfo": item.prodInfo,
                        "quantity": item.quantity,
                        "amount": item.amount,
                        "unit": item.unit
                    });
                });

                $scope.gridorderinfo.data = gridData;

            }

            function paymentfun(data) {
                $scope.columns = [
                    {field: 'uid'},
                    {field: 'appId'},
                    {field: 'buyerEmail'},
                    {field: 'buyerId'},
                    {field: 'channelId'},

                    {field: 'channelTag'},
                    {field: 'paymentId'},
                    {field: 'paymentTime'},
                    {field: 'price'},
                    {field: 'quantity'},

                    {field: 'status'},
                    {field: 'totalFee'},
                    {field: 'tradeNo'}
                ];
                $scope.gridpayment = {
                    columnDefs: $scope.columns,
                    showGridFooter: true,
                    showColumnFooter: true,
                    enableGridMenu: true,
                    enableSelectAll: true,
                    exporterMenuPdf: false,
                    columnDefs: [
                        {field: 'uid', minWidth: 50, width: 80, enableColumnResizing: false},
                        {field: 'appId', minWidth: 100, width: 120, enableColumnResizing: true},
                        {field: 'buyerEmail', minWidth: 150, width: 180, enableColumnResizing: false},
                        {field: 'buyerId', minWidth: 100, width: 120, enableColumnResizing: true},
                        {field: 'channelId', minWidth: 100, width: 120, enableColumnResizing: true},

                        {field: 'channelTag', minWidth: 100, width: 120, enableColumnResizing: true},
                        {field: 'paymentId', minWidth: 650, width: 680, enableColumnResizing: false},
                        {field: 'paymentTime', minWidth: 150, width: 180, enableColumnResizing: false},
                        {field: 'price', minWidth: 50, width: 80, enableColumnResizing: true},
                        {field: 'quantity', minWidth: 50, width: 80, enableColumnResizing: false},

                        {field: 'status', minWidth: 50, width: 80, enableColumnResizing: false},
                        {field: 'totalFee', minWidth: 100, width: 120, enableColumnResizing: false},
                        {field: 'tradeNo', minWidth: 100, width: 120, enableColumnResizing: false}
                    ],

                    exporterOlderExcelCompatibility: true,
                    onRegisterApi: function (gridApi) {
                        $scope.gridApi = gridApi;
                    }
                };

                var gridData = [];

                angular.forEach(data, function (item, index) {
                    gridData.push({
                        "uid": item.uid,
                        "appId": item.appId,
                        "buyerEmail": item.buyerEmail,
                        "buyerId": item.buyerId,
                        "channelId": item.channelId,

                        "channelTag": item.channelTag,
                        "paymentId": item.paymentId,
                        "paymentTime": item.paymentTime,
                        "price": item.price,
                        "quantity": item.quantity,

                        "status": item.status,
                        "totalFee": item.totalFee,
                        "tradeNo": item.tradeNo

                    });
                });

                $scope.gridpayment.data = gridData;

            }

            //判断当前应该显示什么标题
            function function_name(argument) {

            }

            function swichorderstatus(status) {
                switch (status) {
                    case 0:
                        return "初始化";
                    case 1:
                        return "已成功";
                    case 2:
                        return "已失败";
                    case 3:
                        return "已取消";
                    case 4:
                        return "发货失败";
                    case 5:
                        return "发货成功";
                    default:
                        status;
                }
            }

        }]);

//style controll
$(function () {
    $('.Channelbtn').click(function() {
        $('.hidediv').css("opacity", "0");
        $('.ChannelCallBack').css("opacity", "1");
        $('.ChannelCallBack').css("z-index", "100");
        $('.ChannelCallBack').siblings().css("z-index", "-1");
        $('.titleinfo').html("渠道支付回调");


    })
    $('.IosPaybtn').click(function() {
        $('.hidediv').css("opacity", "0");
        $('#iospaygrid').css("opacity", "1");
        $('#iospaygrid').css("z-index", "100");
        $('#iospaygrid').siblings().css("z-index", "-1");
        $('.titleinfo').html("IOS支付信息");

    })

    $('.Orderbtn').click(function() {
        $('.hidediv').css("opacity", "0");
        $('#orderinfogrid').css("opacity", "1");
        $('#orderinfogrid').css("z-index", "100");
        $('#orderinfogrid').siblings().css("z-index", "-1");
        $('.titleinfo').html("订单信息");
        $('.ChannelCallBack').css("opacity", "0");
    })
    $('.Paymentbtn').click(function() {
        $('.hidediv').css("opacity", "0");
        $('#paymentgrid').css("opacity", "1");
        $('#paymentgrid').css("z-index", "100");
        $('#paymentgrid').siblings().css("z-index", "-1");
        $('.titleinfo').html("支付信息");

    })
});