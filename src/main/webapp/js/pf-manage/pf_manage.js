/**
 * Created by Administrator on 2017/5/5.
 */
app.controller('userManage',
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
                {
                    field: '绑定邮箱',
                    width: '10%',
                    cellTemplate: '<div style="width: 100%;text-align: center;"><button  class="btn btn-small btn-primary data-details" >绑定</button></div> '
                },
                {field: '昵称', width: '10%'},
                {field: '手机号', width: '10%'},
                {field: '邮箱', width: '12%'},
                {field: '注册时间', width: '15%'},
                {field: '更新时间', width: '15%'},
                {field: 'IOS设备', width: '30%'},
                {field: '安卓设备', width: '30%'}
            ];
            $scope.gridhistory.columnDefs = [
                {field: 'AppID', width: '10%'},
                //{field: '游戏名称', width: '10%'},
                {field: '渠道名称', width: '10%'},
                {field: '用户UID', width: '10%'},
                {field: '首次登录时间', width: '15%'},
                {field: '最后登录时间', width: '15%'},
                {field: '首次登录设备', width: '30%'},
                {field: '最后登录设备', width: '30%'},
                {field: '最后登录IP', width: '15%'}
            ];

            var binduid = "";
            $scope.hidebindpage = function () {
                $('.frmbind').hide();
            }
            $scope.bindEmail = function () {
                var message = $scope.message;
                message.uid = binduid;
                message.email = $scope.bindemail == undefined ? '' : $scope.bindemail;

                var calSuccess = function (data, status, headers, config) {
                    console.log(data);
                    alert(data.msg + "");
                };
                var calError = function (data, status, headers, config) {
                    console.log(data);
                    alert("绑定失败！");
                };

                if (message.uid != "" && message.email != "") {
                    //邮箱验证
                    if (!message.email.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/) && message.email != '') {
                        alert('请输入正确的邮箱地址');
                        return false;
                    }
                    $http({
                        method: 'GET',
                        url: '/gmtool' + requires.PF_ADMIN_UPDATE_USERINFO,
                        params: message
                    }).success(calSuccess).error(calError);
                } else {
                    alert('请输入正确的信息');
                }
            }
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
                var orderlist = [];
                var calSuccess = function (data, status, headers, config) {
                    try {
                        var userinfo = data.data.basic;
                        var history = data.data.login;
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
                        orderlist[item.uid] = item.uid;
                    });

                    //绑定事件
                    $(document).on("click", ".data-details", function () {
                        $('.frmbind').show();
                        var orderid = $(this).parent().parent().prev().children().html();
                        var showdata = orderlist[orderid];
                        binduid = showdata;
                    })
                    _.each(history, function (item) {
                        gridDataHistory.push({
                            "AppID": item.loginAppid,
                            //"游戏名称": item.loginAppid,
                            "渠道名称": item.allianceId,
                            "用户UID": item.uid,
                            "首次登录时间": item.firstLoginTs,
                            "最后登录时间": item.previousLoginDate,
                            "首次登录设备": item.firstLoginDeviceInfo,
                            "最后登录设备": item.lastLoginDeviceInfo,
                            "最后登录IP": item.ip
                        });
                    });
                    $scope.griduserinfo.data = gridDataInfo;
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

                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
            }

        }]);

//style controll
$(function () {

});