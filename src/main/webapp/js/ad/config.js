app.controller('statsHotCloudShortCnntSet',
    ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants',
        function ($scope, $http, $location, $cookieStore, echartsService, uiGridConstants) {
            $scope.filter = {channel: '', server: '', time: ''};
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
            //拉取列表
            //初始化表格
            $scope.gridOptions.columnDefs = [
                {field: '游戏ID'},
                {field: '游戏名'},
                {field: '安卓/IOS'},
                {field: 'AppKey', width: '20%'},
                {field: '短链名'},
                {field: '短链'},
                {field: '花费'},
                {
                    field: '修改',
                    cellTemplate: '<button  class="btn btn-small btn-primary data-details" >录入</button> '
                }
            ]

            $scope.gridOptions.data = [];
            function hotCloudList() {
                var message = $scope.message;
                var gridData = [];
                var orderlist = [];
                var calSuccess = function (data, status, headers, config) {
                    var result = data.result;
                    if (result == 0) {
                        var hotList = data.data;
                        _.each(hotList, function (item,index) {

                            gridData.push({
                                '游戏ID': item.gameId,
                                '游戏名': item.gameName,
                                '安卓/IOS': item.type,
                                'AppKey': item.hotAppKey,
                                '短链名': item.urlName,
                                '短链': item.shortUrl,
                                '花费': item.cost
                                //'修改': item.cost
                            });
                            orderlist[item.shortUrl] = item;
                        })
                        $scope.gridOptions.data = gridData;
                    } else {
                        alert('接口连接失败，请检查服务器后重试.')
                    }
                };
                //绑定事件
                $(document).on("click", ".data-details", function () {
                    $(".mask").show();
                    var orderid = $(this).parent().prev().prev().children().html();
                    var showdata = orderlist[orderid];
                    appendcontent(showdata);
                })
                var calError = function (data, status, headers, config) {
                    console.log('参数错误：' + status);
                }
                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.STATS_AD_CONFIG_LIST,
                    params: message
                }).success(calSuccess).error(calError);
            }

            hotCloudList();
            //定义初始参数
            $scope.gameId = '';
            $scope.decType = '';
            $scope.appKey = '';
            $scope.bannerShortCnnt = '';
            $scope.activeShortCnnt = '';
            $scope.validateFnc = function (eve) {
                switch (eve) {
                    case 'apK':
                        if ($scope.appKey.length != 32) {
                            $scope.apktip = 1;
                        } else {
                            $scope.apktip = 0;
                            $('.filter-select .ipt-init:eq(1)').removeClass('bg-red');
                        }
                        break;
                    case 'bsc':
                        if ($scope.bannerShortCnnt.length != 6) {
                            $scope.bsctip = 1;
                        } else {
                            $scope.bsctip = 0;
                            $('.filter-select .ipt-init:eq(2)').removeClass('bg-red');
                        }
                        break;
                    default:
                        console.log('参数错误');
                        break;
                }

            }
            $scope.export = function () {
                var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
                $scope.gridApi.exporter.csvExport('all', 'all', myElement);
            };
            $scope.searchHotCloudSC = function () {
                if ($scope.apktip == 1) {
                    $('.filter-select .ipt-init:eq(1)').addClass('bg-red');
                    return false;
                }
                ;
                if ($scope.bsctip == 1) {
                    $('.filter-select .ipt-init:eq(2)').addClass('bg-red');
                    return false;
                }
                ;
                //参数
                var message = $scope.message;
                message.gameId = $scope.gameId;
                message.hotAppKey = $scope.appKey;
                message.type = $scope.decType;
                message.shortUrl = $scope.bannerShortCnnt;
                message.urlName = $scope.activeShortCnnt;
                if (message.gameId == '' || message.type == "" || message.urlName == '') {
                    alert('输入有空，请检查后重试');
                    return false;
                }
                //call success
                var calSuccess = function (data, status, headers, config) {
                    var result = data.result;
                    if (result == 0) {
                        var Msg = data.data.message;
                        alert(Msg);
                        location.reload();
                    } else {
                        alert('接口调用失败，请检查服务器后重试。');
                        return false;
                    }
                    spinner.spin();
                };
                var calError = function (data, status, headers, config) {
                    console.log('参数错误：' + status);
                    spinner.spin();
                };
                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.STATS_AD_CONFIG,
                    params: message
                }).success(calSuccess).error(calError);
                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
            }

            function appendcontent(showdata) {
                if (showdata) {
                    $("#in-cost").val("");
                    $("#gameId").html(showdata['gameId']);
                    $("#gameName").html(showdata['gameName']);
                    $("#hotAppKey").html(showdata['hotAppKey']);
                    $("#shortUrl").html(showdata['shortUrl']);
                    $("#type").html(showdata['type']);
                    $("#urlName").html(showdata['urlName']);
                    $("#adPf").html(showdata['adPf']);
                    $("#cost").html(showdata['cost']);
                }
            }

            //绑定事件
            $(document).on("click", "#mask-close", function () {
                $(".mask").hide();
                hotCloudList();
            })

            var updatesuccess = function (data, status, headers, config) {
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
                var short = $("#shortUrl").html();
                var cost = $("#in-cost").val();
                var str = {};
                str.shortUrl = short;
                str.cost = cost;
                str.token = sessionStorage.userToken;
                str.mid = $location.search().mid||0;
                if (!isNaN(cost) && cost.length<20) {
                    $http({
                        method: 'GET',
                        url: '/gmtool' + requires.STATS_AD_UPDATE_COST,
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