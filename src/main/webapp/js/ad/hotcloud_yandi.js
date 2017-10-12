/**
 * Created by Administrator on 2017/3/24.
 */
/**
 * Created by Administrator on 2017/3/24.
 */
app.controller('HotCloudYandi',
    ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants', '$sessionStorage',
        function ($scope, $http, $location, $cookieStore, echartsService, uiGridConstants, $sessionStorage) {
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
                treeRowHeaderAlwaysVisible: false,
                enableRowSelection: false,
                enableGridMenu: true,
                enableSelectAll: true,
                exporterMenuPdf: false,
                exporterOlderExcelCompatibility: true,
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                }
            };
            $scope.gridOptions2 = {
                treeRowHeaderAlwaysVisible: false,
                enableRowSelection: false,
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
            //日期数组
            var dateArr = ['', '次日', '二日', '三日', '四日', '五日', '六日', '七日', '十五日', '三十日'];
            $scope.HotCloudYandi = function () {
                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
                var suner = (function () {
                    var arr = $scope.filter.reday;
                    if (arr.length == 0)
                        return '0,1';
                    var tol = ['0'];
                    for (var i = 0; i < arr.length; i++) {
                        tol.push(arr[i].dictValue);
                    }
                    return tol.join(',');
                })();
                var message = $scope.message;
                message.appId = $scope.filter.server == null ? '' : $scope.filter.server.appId;
                message.allianceId = $scope.filter.channel == null ? '' : $scope.filter.channel.allianceId;
                message.channelTag = ($scope.filter.channelTag == null || $scope.filter.channelTag.length == 0) ? '' : $scope.filter.channelTag.join(',');
                message.startD = $(".date-picker-star").val();
                message.endD = $(".date-picker-end").val();
                message.spreadurl = $("#spreadurl").val();
                message.returnDays = suner;
                var calSuccess = function (data, status, headers, config) {
                    var yandidata = data.data;
                    var gridData = [];
                    var gridData2 = [];
                    var echartData = new Array();  //创建二维数组
                    for (var k = 0; k < 10; k++) {
                        echartData[k] = new Array();
                        for (var j = 0; j < 1; j++) {
                            echartData[k][j] = "";
                        }
                    }
                    //储存遍历点
                    var tara = suner.split(',');
                    tara.splice(0, 1);
                    //定义比较对象
                    var compGData = {};
                    var compGData2 = {};
                    //定义新增数组
                    var resData = [];
                    var resData2 = [];
                    //表头定义
                    $scope.gridOptions.columnDefs = [
                        {
                            field: '日期', sort: {
                            direction: 'desc', priority: 0
                        }
                        }
                    ];
                    $scope.gridOptions2.columnDefs = [
                        {
                            field: '日期', sort: {
                            direction: 'desc', priority: 0
                        }
                        }
                    ];
                    if (message.appId) {
                        $scope.gridOptions.columnDefs.push({
                            field: '游戏ID'
                        })
                        $scope.gridOptions2.columnDefs.push({
                            field: '游戏ID'
                        })
                    }

                    if (message.allianceId) {
                        //$scope.gridOptions.columnDefs.length > 4 ? $scope.gridOptions.columnDefs.splice(2,0,{field:'渠道'}) :
                        $scope.gridOptions.columnDefs.push({
                            field: '渠道'
                        })
                        $scope.gridOptions2.columnDefs.push({
                            field: '渠道'
                        })
                    }
                    if (message.channelTag) {
                        $scope.gridOptions.columnDefs.push({
                            field: '子渠道'
                        })
                        $scope.gridOptions2.columnDefs.push({
                            field: '子渠道'
                        })
                    }
                    $scope.gridOptions.columnDefs.push({field: '充值'});
                    $scope.gridOptions2.columnDefs.push({field: '付费'});

                    for (var i = 0; i < tara.length; i++) {
                        var str = tara[i];
                        if (str == 1) str = '次';
                        $scope.gridOptions.columnDefs.push({field: '' + str + '日留存'});
                        $scope.gridOptions2.columnDefs.push({field: '' + str + '日留存'});
                    }

                    //图表数据处理
                    _.each(yandidata, function (item) {
                        var gData = {};
                        var gData2 = {};
                        gData['日期'] = item.regDate.substring(0, 10);
                        gData2['日期'] = item.regDate.substring(0, 10);
                        if (!(item.appId == null || item.appId == '')) {
                            gData["游戏ID"] = item.appId;
                            gData2["游戏ID"] = item.appId;
                        }
                        if (!(item.allianceId == null || item.allianceId == '')) {
                            gData["渠道"] = item.allianceId;
                            gData2["渠道"] = item.allianceId
                        }
                        if (!(item.channelTag == null || item.channelTag == '')) {
                            gData["子渠道"] = item.channelTag;
                            gData2["子渠道"] = item.channelTag;
                        }
                        //新增数据储存
                        if (item.returnDays == 0) {
                            resData.push([item.regDate, item.amount]);
                            resData2.push([item.regDate, item.payMemberCount]);
                            gData['充值'] = item.amount;
                            gData2['设备'] = item.payMemberCount;
                        } else {
                            //存储留存数据
                            for (var i = 0; i < tara.length; i++) {
                                var str = tara[i];
                                if (str == 1) str = '次';
                                if (item.returnDays == tara[i]) {
                                    gData['' + str + '日留存'] = item.amount;
                                    gData2['' + str + '日留存'] = item.payMemberCount;
                                    //gData['' + str + '日留存率'] = item.uidCount;  //下方算法重置
                                }
                            }
                        }
                        //这么做的依据是json数据时间按照顺序排列
                        if (compGData['日期'] == gData['日期']) {
                            delete gData['日期'];
                            $.extend(gridData[gridData.length - 1], gData);
                        } else {
                            compGData = gData;
                            gridData.push(gData);
                        }
                        if (compGData2['日期'] == gData2['日期']) {
                            delete gData2['日期'];
                            $.extend(gridData2[gridData2.length - 1], gData2);
                        } else {
                            compGData2 = gData2;
                            gridData2.push(gData2);
                        }
                    });
                    $scope.gridOptions.data = gridData;
                    $scope.gridOptions2.data = gridData2;
                    spinner.spin();
                };
                var calError = function (data, status, headers, config) {
                    //console.log(status);
                    spinner.spin();
                };
                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.STATS_PLANTFORM_YANDI_HOTCLOUD,
                    params: message
                }).success(calSuccess).error(calError);
            }

            setTimeout(function () {
                $scope.HotCloudYandi();
            }, $scope.reqDelay);

        }])


//style controll
$(function () {

});