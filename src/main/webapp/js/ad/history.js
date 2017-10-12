app.controller('statsHotCloudShortCnntSet',
    ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants',
        function ($scope, $http, $location, $cookieStore, echartsService, uiGridConstants) {
            $scope.retentionFilter = [{dictValue: 1, dictName: '次日'},
                {dictValue: 2, dictName: '2日'},
                {dictValue: 3, dictName: '3日'},
                {dictValue: 4, dictName: '4日'},
                {dictValue: 5, dictName: '5日'},
                {dictValue: 6, dictName: '6日'},
                {dictValue: 7, dictName: '7日'},
                {dictValue: 15, dictName: '15日'},
                {dictValue: 30, dictName: '30日'}];
            $scope.filter = {channel: '', server: '', time: '', reday: [{dictValue: 1, dictName: '次日'}]};
            $scope.gridOptions = {
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
            $scope.searchHotCloudSC = function () {
                //初始化表格
                $scope.gridOptions.columnDefs = [
                    {field: 'ID'},
                    {
                        field: '新增日期', sort: {
                        direction: 'desc', priority: 0
                    }
                    },
                    {field: 'appId'},
                    {field: '短链名'},
                    {field: '短链'},
                    {field: '激活人数'},
                    {field: '新增人数'},
                    {field: '渠道id'},
                    {field: '花费'},
                    {field: '付费总额'},
                    {
                        field: '修改',
                        cellTemplate: '<button  class="btn btn-small btn-primary data-details" >录入</button> '
                    }
                ];

                $scope.gridOptions.data = [];
                var rDays = (function () {
                    var arr = $scope.filter.reday;
                    if (arr.length == 0)
                        return 1;
                    var tol = [];
                    for (var i = 0; i < arr.length; i++) {
                        tol.push(arr[i].dictValue);
                    }
                    ;
                    return tol.join(',');
                })();
                //参数
                var message = $scope.message;
                message.appId = $('#appId').val();
                //message.chId = $scope.chId;
                message.chId = ($scope.chId == null || $scope.chId.length == 0) ? '' : $scope.chId.join(',');
                message.spreadurl = $('#allShortUrl').is(':checked') ? 'all' : $('#shortUrl').val();
                message.returnDays = rDays;
                message.startD = $(".date-picker-star").val();
                message.endD = $(".date-picker-end").val();
                var returnDays = message.returnDays.split(',');
                for (var i = 1; i < 10; i++) {
                    var str = i;
                    var num = i;
                    if (i == 1)  str = '次';
                    if (i == 8) {
                        str = 15;
                        num = 15;
                    }
                    if (i == 9) {
                        str = 30;
                        num = 30;
                    }
                    (function (str) {
                        for (var j = 0; j < returnDays.length; j++) {
                            if (returnDays[j] == num) {
                                $scope.gridOptions.columnDefs.push({field: '' + str + '日留存人数'});
                                $scope.gridOptions.columnDefs.push({field: '' + str + '日留存率'});
                            }
                        }
                    })(str)
                }
                ;
                //call success
                var orderlist = [];
                var calSuccess = function (data, status, headers, config) {
                    var result = data.result;
                    var gridData = [];
                    if (result == 0) {
                        var resData = data.data;
                        _.each(resData, function (item, index) {
                            var gData = {
                                '新增日期': item.regDate,
                                'appId': item.appId,
                                '短链名': item.spreadName,
                                '短链': item.spreadurl,
                                '激活人数': item.installCount,
                                '新增人数': item.regMemberCount,
                                '渠道id': item.chId,
                                'ID': index,
                                '花费': item.cost,
                                '付费总额': item.dailyAmount
                            };

                            orderlist[index] = item;
                            (function (item) {
                                for (var i = 1; i < 10; i++) {
                                    var num = i;
                                    var str = i;
                                    if (i == 1) {
                                        str = '次';
                                    }
                                    if (i == 8) {
                                        num = 15;
                                        str = 15;
                                    }
                                    if (i == 9) {
                                        num = 30;
                                        str = 30;
                                    }
                                    ;
                                    var ReNum = eval("item.ReNum" + num);
                                    var RePercent = eval("item.RePercent" + num);
                                    if (ReNum) {
                                        gData['' + str + '日留存人数'] = ReNum;
                                        gData['' + str + '日留存率'] = RePercent;
                                    }
                                }
                            })(item)
                            gridData.push(gData);
                        })
                        $scope.gridOptions.data = gridData;
                    } else {
                        alert('接口调用失败，请检查服务器后重试。');
                        return false;
                    }
                    spinner.spin();
                };
                //绑定事件
                $(document).on("click", ".data-details", function () {
                    $(".mask").show();
                    var orderid = $(this).parent().prevAll().last().children().html();
                    var showdata = orderlist[orderid];
                    appendcontent(showdata);
                })
                var calError = function (data, status, headers, config) {
                    console.log('参数错误：' + status);
                    spinner.spin();
                };
                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.STATS_AD_NEW_ADD,
                    params: message
                }).success(calSuccess).error(calError);
                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
            };
            setTimeout(function () {
                $scope.searchHotCloudSC();
            }, $scope.reqDelay);


            function appendcontent(showdata) {
                if (showdata) {
                    $("#in-cost").val("");
                    $("#appId-sp").html(showdata['appId']);
                    //$("#RePercentnull").html(showdata['RePercentnull']);
                    $("#regDate").html(showdata['regDate']);
                    //$("#ReNumnull").html(showdata['ReNumnull']);
                    $("#spreadurl").html(showdata['spreadurl']);
                    $("#spreadName").html(showdata['spreadName']);
                    $("#regMemberCount").html(showdata['regMemberCount']);
                    $("#installCount").html(showdata['installCount']);
                    $("#chId").html(showdata['chId']);
                    $("#cost").html(showdata['cost']);
                }
            }

            //绑定事件
            $(document).on("click", "#mask-close", function () {
                $(".mask").hide();
                $scope.searchHotCloudSC();
            })

            var updatesuccess = function (data, status, headers, config) {
                console.log(data);
                var data = data.data.status;
                if (data == "0") {
                    layer.msg('修改成功！');
                } else {
                    layer.msg('修改失败！');
                }
            }
            var updateerror = function (data, status, headers, config) {
                layer.msg('修改失败！');
                console.log(data);
            }
            $(document).on("click", "#update-cost", function () {
                var chId = $("#chId").html();
                if (chId == null || chId == "") {
                    layer.msg('请先选择渠道后再搜索！');
                    return false;
                }
                var cost = $("#in-cost").val();
                var spreadurl = $("#spreadurl").html();
                var appId = $("#appId-sp").html();
                var allianceId = chId;
                var calcDate = $("#regDate").html();
                var str = {};
                str.token = sessionStorage.userToken;
                str.mid = $location.search().mid || 0;
                str.cost = cost;
                str.spreadurl = spreadurl;
                str.appId = appId;
                str.calcDate = calcDate;
                str.allianceId = allianceId;
                if (!isNaN(cost) && cost.length < 20) {
                    $http({
                        method: 'GET',
                        url: '/gmtool' + requires.STATS_AD_UPDATE_Daily_COST,
                        params: str
                    }).success(updatesuccess).error(updateerror);
                } else {
                    layer.msg('输入正确的格式！');
                    return false;
                }

            })
        }]);

//style controll 
$(function () {

});
