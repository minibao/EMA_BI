/**
 * Created by Administrator on 2016/12/27.
 */
app.controller('pingtaijiefeng',
    ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants',
        function ($scope, $http, $location, $cookieStore, echartsService, uiGridConstants) {
            //搜索
            var message = {};
            var calSuccessseo = function (data, status, headers, config) {
                console.log(data.data);
                if (data.data.uid) {
                    $(".showinfo").show();
                    $(".info").html("");
                    message.uid = data.data.uid;
                    message.ptfrozen = data.data.pfFrozen;
                    message.zhifufrozen = data.data.billingFrozen;
                    if (data.data.billingFrozen == true) {
                        $(".zhifuclosed").attr("disabled", "disabled");
                        $(".zhifuopen").removeAttr("disabled");
                    } else {
                        $(".zhifuclosed").removeAttr("disabled");
                        $(".zhifuopen").attr("disabled", "disabled");
                    }
                    if (data.data.pfFrozen == true) {
                        $(".pTclosed").attr("disabled", "disabled");
                        $(".pTopen").removeAttr("disabled");
                    } else {
                        $(".pTclosed").removeAttr("disabled");
                        $(".pTopen").attr("disabled", "disabled");
                    }
                    $(".info").eq(0).html("UID:" + data.data.uid);
                    $(".info").eq(1).html("支付状态:" + (data.data.billingFrozen == true ? '封禁' : '正常'));
                    $(".info").eq(2).html("平台状态:" + (data.data.pfFrozen == true ? '封禁' : '正常'));
                    $(".info").eq(3).html("创建时间:" + data.data.createTs);
                    $(".info").eq(4).html("pfAvatarId:" + data.data.pfAvatarId);
                    $(".info").eq(5).html("pfClubId:" + data.data.pfClubId);


                } else {
                    $(".showinfo").show();
                    $(".info").html("");
                    $(".info").eq(2).html("没有找到相应的结果！");

                }

            };
            var calError = function (data, status, headers, config) {
                console.log(status);

            };
            $scope.SearchbyUID = function () {
                var uid = ($('#inputUID').val().length == 0 ? null : $('#inputUID').val());
                if (uid == null) {
                    alert("请输入UID再搜索");
                } else {
                    $http({
                        method: 'POST',
                        url: '/gmtool' + requires.PF_MANAGE_JIEFENG_SEO,
                        params: {
                            uid: uid
                        }
                    }).success(calSuccessseo).error(calError);
                }
            }

            //平台封禁
            var calSuccess = function (data, status, headers, config) {
                console.log(status);
                loadagain(message.uid);
            };

            $scope.pingtaiclosed = function () {
                var divUID=$(".info").eq(0).html();
                if (divUID == "" || divUID == null) {
                    return false;
                }
                $http({
                    method: 'POST',
                    url: '/gmtool' + requires.PF_MANAGE_JIEFENG_JIEFENG,
                    params: {
                        uid: message.uid,
                        frozen: true,
                        type: "pf"
                    }
                }).success(calSuccess).error(calError);
            }
            //平台解封
            $scope.pingtaiopen = function () {
                var divUID=$(".info").eq(0).html();
                if (divUID == "" || divUID == null) {
                    return false;
                }
                $http({
                    method: 'POST',
                    url: '/gmtool' + requires.PF_MANAGE_JIEFENG_JIEFENG,
                    params: {
                        uid: message.uid,
                        frozen: false,
                        type: "pf"
                    }
                }).success(calSuccess).error(calError);
            }
            //支付封禁
            $scope.zhifuclosed = function () {
                var divUID=$(".info").eq(0).html();
                if (divUID == "" || divUID == null) {
                    return false;
                }
                $http({
                    method: 'POST',
                    url: '/gmtool' + requires.PF_MANAGE_JIEFENG_JIEFENG,
                    params: {
                        uid: message.uid,
                        frozen: true,
                        type: "pay"
                    }
                }).success(calSuccess).error(calError);
            }
            //支付解封
            $scope.zhifuopen = function () {
                var divUID=$(".info").eq(0).html();
                if (divUID == "" || divUID == null) {
                    return false;
                }
                $http({
                    method: 'POST',
                    url: '/gmtool' + requires.PF_MANAGE_JIEFENG_JIEFENG,
                    params: {
                        uid: message.uid,
                        frozen: false,
                        type: "pay"
                    }
                }).success(calSuccess).error(calError);
            }

            var loadagain = function (uid) {
                if (uid == "" || uid == null) {
                    return false;
                }
                var divUID=$(".info").eq(0).html();
                if (divUID == "" || divUID == null) {
                    return false;
                }
                $http({
                    method: 'POST',
                    url: '/gmtool' + requires.PF_MANAGE_JIEFENG_SEO,
                    params: {
                        uid: uid
                    }
                }).success(calSuccessseo).error(calError);
            }

        }]);

//style controll
$(function () {

});