/**
 * Created by Administrator on 2017/5/5.
 */
app.controller('budanserch',
    ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants',
        function ($scope, $http, $location, $cookieStore, echartsService, uiGridConstants) {

            $scope.griduserinfo = {
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
            $scope.gridhistory = {
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
            //表头
            $scope.griduserinfo.columnDefs = [
                {field: 'UID', width: '10%'},
                {field: '昵称', width: '10%'},
                {field: '手机号', width: '10%'},
                {field: '邮箱', width: '12%'},
                {field: '注册时间', width: '15%'},
                {field: '更新时间', width: '15%'},
                {field: 'IOS设备', width: '30%'},
                {field: '安卓设备', width: '30%'}
            ];
            $scope.gridhistory.columnDefs = [
                {field: 'OrderID', width: '40%'},
                {
                    field: '操作',
                    width: '10%',
                    cellTemplate: '<div style="width: 100%;text-align: center;"><button  class="btn btn-small btn-primary data-details" >详细</button></div> '
                },
                {field: 'AppID', width: '10%'},
                {field: '渠道ID', width: '10%'},
                {field: '用户UID', width: '10%'},
                {field: '订单状态', width: '10%'},
                {field: '订单金额', width: '10%'},
                {field: '订单创建时间', width: '30%'},
                {field: '订单更新时间', width: '30%'}

            ];

            var orderId ="" ;
            var allianceUid ="";
            var appId = "";
            $scope.hidebindpage = function () {
                $('.frmbind').hide();
            }
            $scope.budan = function () {
                var message = $scope.message;
                message.orderId = orderId;
                message.allianceUid = allianceUid;
                message.appId = appId;
                if (message.allianceUid == null || message.allianceUid == "") {
                    try {
                        message.allianceUid = message.uid;
                    }
                    catch (e) {
                        alert("uid赋值给allianceUid出现错误！");
                    }
                }
                console.log(message);

                var calSuccess = function (data, status, headers, config) {
                    console.log(data);
                    alert(data.msg + "");
                };
                var calError = function (data, status, headers, config) {
                    console.log(data);
                    alert("绑定失败！");
                };

                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.PF_ADMIN_SUPPLY_ORDERFORGAME,
                    params: message
                }).success(calSuccess).error(calError);

            }

            var orderlist = [];
            $(document).on("click", ".data-details", function () {
                $('.frmbind').show();
                var orderid = $(this).parent().parent().prev().children().html();
                console.log(orderlist);
                var showdata = orderlist[orderid];
                appenddata(showdata);
            })
            $scope.serachUserInfo = function () {
                var message = $scope.message;
                var parameter = {};
                var gridDataInfo = [];
                var gridDataHistory = [];

                message.uid = $scope.uid == undefined ? '' : $scope.uid;
                message.phone = $scope.phone == undefined ? '' : $scope.phone;
                message.nickname = $scope.nickname == undefined ? '' : $scope.nickname;
                message.email = $scope.email == undefined ? '' : $scope.email;

                message.allianceId = $scope.allianceId == undefined ? '' : $scope.allianceId;
                message.allianceUid = $scope.allianceUid == undefined ? '' : $scope.allianceUid;

                message.startD = $(".date-picker-star").val();
                message.endD = $(".date-picker-end").val();

                if (message.allianceId != "" && message.allianceUid != "") {
                    parameter.allianceId = message.allianceId;
                    parameter.allianceUid = message.allianceUid;
                } else if (message.uid != "" || message.phone != "" || message.nickname != "" || message.email != "") {
                    parameter.uid = message.uid;
                    parameter.phone = message.phone;
                    parameter.nickname = message.nickname;
                    parameter.email = message.email;
                } else {
                    alert("请输入正确的信息！");
                    return false;
                }

                var calSuccess = function (data, status, headers, config) {
                    try {
                        var userinfo = data.data.basic;
                    } catch (e) {

                    }
                    _.each(userinfo, function (item) {
                        gridDataInfo.push({
                            "UID": item.uid,
                            "昵称": item.nickname,
                            "手机号": item.mobile,
                            "邮箱": item.email,
                            "绑定邮箱": item.email,
                            "注册时间": item.createTs,
                            "更新时间": item.updateTs,
                            "IOS设备": item.iosDeviceKey,
                            "安卓设备": item.androidDeviceKey
                        });
                    });

                    $scope.griduserinfo.data = gridDataInfo;
                    spinner.spin();
                };

                var calSuccessBD = function (data, status, headers, config) {
                    var budan = data.data;
                    //绑定事件
                    _.each(budan, function (item) {
                        gridDataHistory.push({
                            "OrderID": item.orderId,
                            "AppID": item.appId,
                            "渠道ID": item.allianceId,
                            "用户UID": item.uid,
                            "订单状态": item.orderStatus,
                            "订单金额": item.amount,
                            "订单创建时间": item.createTs,
                            "订单更新时间": item.updateTs
                        });
                        orderlist[item.orderId] = item;
                    });
                    console.log(orderlist);

                    $scope.gridhistory.data = gridDataHistory;
                    spinner.spin();
                };

                var calError = function (data, status, headers, config) {
                    console.log(status);
                    spinner.spin();
                };
                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.PF_ADMIN_GET_USERINFO,
                    params: message
                }).success(calSuccess).error(calError);
                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.PF_ADMIN_GET_ORDERINFO,
                    params: message
                }).success(calSuccessBD).error(calError);

                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
            }
            function appenddata(data) {
                orderId =  "";
                allianceUid = "";
                appId ="";
                var strhtml = "";
                console.log(data);
                $.each(data, function (i) {
                    strhtml = strhtml + '<div><span>' + i + ':  </span><span>' + data[i] + '</span></div> <hr>';
                });
                orderId = data.orderId;
                allianceUid = data.allianceUid;
                if(allianceUid == ""){
                    allianceUid = $scope.allianceUid;
                }
                console.log(allianceUid);
                appId = data.appId;

                $('.info').html(strhtml);
            }
        }]);

//style controll
$(function () {

});