/**
 * Created by Administrator on 2017/3/24.
 */
app.controller('statsPlantformYandi',
    ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants', '$sessionStorage',
        function ($scope, $http, $location, $cookieStore, echartsService, uiGridConstants, $sessionStorage) {
            $scope.retentionFilter = [{dictValue: 1, dictName: '次日'},
                {dictValue: 2, dictName: '2日'},
                {dictValue: 3, dictName: '3日'},
                {dictValue: 4, dictName: '4日'},
                {dictValue: 5, dictName: '5日'},
                {dictValue: 6, dictName: '6日'},
                {dictValue: 7, dictName: '7日'},
                {dictValue: 8, dictName: '8日'},
                {dictValue: 9, dictName: '9日'},
                {dictValue: 10, dictName: '10日'},
                {dictValue: 11, dictName: '11日'},
                {dictValue: 12, dictName: '12日'},
                {dictValue: 13, dictName: '13日'},
                {dictValue: 14, dictName: '14日'},
                {dictValue: 15, dictName: '15日'},
                {dictValue: 16, dictName: '16日'},
                {dictValue: 17, dictName: '17日'},
                {dictValue: 18, dictName: '18日'},
                {dictValue: 19, dictName: '19日'},
                {dictValue: 20, dictName: '20日'},
                {dictValue: 21, dictName: '21日'},
                {dictValue: 22, dictName: '22日'},
                {dictValue: 23, dictName: '23日'},
                {dictValue: 24, dictName: '24日'},
                {dictValue: 25, dictName: '25日'},
                {dictValue: 26, dictName: '26日'},
                {dictValue: 27, dictName: '27日'},
                {dictValue: 28, dictName: '28日'},
                {dictValue: 29, dictName: '29日'},
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
            $scope.gridOptions1 = {
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
            $scope.gridOptions3 = {
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
            $scope.appid = '20012';
            for (var i=0; i < $scope.sysPlantformContainerInfo.length; i++) {
                if ($scope.sysPlantformContainerInfo[i].appId == $scope.appid) {
                    $scope.filter.server = $scope.sysPlantformContainerInfo[i];
                    break;
                }
            }
            $scope.PlantformYandi = function () {
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
                message.appId =  $scope.appid;
                message.allianceId = $scope.filter.channel == null ? '' : $scope.filter.channel.allianceId;
                message.channelTag = ($scope.filter.channelTag == null || $scope.filter.channelTag.length == 0) ? '' : $scope.filter.channelTag.join(',');
                message.startD = $(".date-picker-star").val();
                message.endD = $(".date-picker-end").val();
                message.returnDays = suner;

                var calSuccess = function (data, status, headers, config) {
                    var yandidata = data.data;
                    var gridData = [];
                    var gridData1 = [];
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
                    var compGData1 = {};
                    var compGData2 = {};
                    //定义新增数组
                    var resData = [];
                    var resData1 = [];
                    var resData2 = [];
                    //表头定义
                    $scope.gridOptions.columnDefs = [
                        {
                            field: '日期', sort: {
                            direction: 'desc', priority: 0
                        }
                        }
                    ];
                    $scope.gridOptions1.columnDefs = [
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
                        $scope.gridOptions1.columnDefs.push({
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
                        $scope.gridOptions1.columnDefs.push({
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
                        $scope.gridOptions1.columnDefs.push({
                            field: '子渠道'
                        })
                        $scope.gridOptions2.columnDefs.push({
                            field: '子渠道'
                        })
                    }
                    $scope.gridOptions.columnDefs.push({field: '充值'});
                    $scope.gridOptions1.columnDefs.push({field: '用户'});
                    $scope.gridOptions2.columnDefs.push({field: '设备'});


                    for (var i = 0; i < tara.length; i++) {
                        var str = tara[i];
                        if (str == 1) str = '次';
                        $scope.gridOptions.columnDefs.push({field: '' + str + '日留存'});
                        $scope.gridOptions1.columnDefs.push({field: '' + str + '日留存'});
                        $scope.gridOptions2.columnDefs.push({field: '' + str + '日留存'});
                    }


                    //图表数据处理
                    _.each(yandidata, function (item) {
                        var gData = {};
                        var gData1 = {};
                        var gData2 = {};
                        gData['日期'] = item.regDate.substring(0, 10);
                        gData1['日期'] = item.regDate.substring(0, 10);
                        gData2['日期'] = item.regDate.substring(0, 10);
                        if (!(item.appId == null || item.appId == '')) {
                            gData["游戏ID"] = item.appId;
                            gData1["游戏ID"] = item.appId;
                            gData2["游戏ID"] = item.appId;

                        }
                        if (!(item.allianceId == null || item.allianceId == '')) {
                            gData["渠道"] = item.allianceId;
                            gData1["渠道"] = item.allianceId;
                            gData2["渠道"] = item.allianceId;
                        }
                        if (!(item.channelTag == null || item.channelTag == '')) {
                            gData["子渠道"] = item.channelTag;
                            gData1["子渠道"] = item.channelTag;
                            gData2["子渠道"] = item.channelTag;
                        }
                        //新增数据储存
                        if (item.returnDays == 0) {
                            resData.push([item.regDate, item.amount]);
                            resData1.push([item.regDate, item.payUidCount]);
                            resData2.push([item.regDate, item.payDeviceCount]);
                            gData['充值'] = item.amount;
                            gData1['用户'] = item.payUidCount;
                            gData2['设备'] = item.payDeviceCount;
                        } else {
                            //存储留存数据
                            for (var i = 0; i < tara.length; i++) {
                                var str = tara[i];
                                if (str == 1) str = '次';
                                if (item.returnDays == tara[i]) {
                                    gData['' + str + '日留存'] = item.amount;
                                    gData1['' + str + '日留存'] = item.payUidCount;
                                    gData2['' + str + '日留存'] = item.payDeviceCount;
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
                        if (compGData1['日期'] == gData1['日期']) {
                            delete gData1['日期'];
                            $.extend(gridData1[gridData1.length - 1], gData1);
                        } else {
                            compGData1 = gData1;
                            gridData1.push(gData1);
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
                    $scope.gridOptions1.data = gridData1;
                    $scope.gridOptions2.data = gridData2;
                    spinner.spin();
                };
                var calError = function (data, status, headers, config) {
                    console.log(status);
                    spinner.spin();
                };
                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.STATS_PLANTFORM_YANDI,
                    params: message
                }).success(calSuccess).error(calError);
            }


            $scope.PlantformLTV = function () {
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
                message.appId = $scope.appid;
                message.allianceId = $scope.filter.channel == null ? '' : $scope.filter.channel.allianceId;
                message.channelTag = ($scope.filter.channelTag == null || $scope.filter.channelTag.length == 0) ? '' : $scope.filter.channelTag.join(',');
                message.startD = $(".date-picker-star").val();
                message.endD = $(".date-picker-end").val();
                message.returnDays = suner;

                var calSuccess = function (data, status, headers, config) {
                    var yandidata = data.data;
                    console.log(yandidata);
                    var gridData = [];
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
                    //定义新增数组
                    var resData = [];
                    //表头定义
                    $scope.gridOptions3.columnDefs = [
                        {
                            field: '日期', sort: {
                            direction: 'desc', priority: 0
                        }
                        }
                    ];

                    if (message.appId) {
                        $scope.gridOptions3.columnDefs.push({
                            field: '游戏ID'
                        })
                    }
                    if (message.allianceId) {
                        //$scope.gridOptions.columnDefs.length > 4 ? $scope.gridOptions.columnDefs.splice(2,0,{field:'渠道'}) :
                        $scope.gridOptions3.columnDefs.push({
                            field: '渠道'
                        })
                    }
                    if (message.channelTag) {
                        $scope.gridOptions3.columnDefs.push({
                            field: '子渠道'
                        })
                    }
                    $scope.gridOptions3.columnDefs.push({field: '游戏设备数'});
                    $scope.gridOptions3.columnDefs.push({field: 'LTV'});

                    for (var i = 0; i < tara.length; i++) {
                        var str = tara[i];
                        if (str == 1) str = '次';
                        $scope.gridOptions3.columnDefs.push({field: 'LTV' + str + '日留存'});
                    }
                    //图表数据处理
                    _.each(yandidata, function (item) {
                        var gData = {};
                        gData['日期'] = item.regDate.substring(0, 10);
                        if (!(item.appId == null || item.appId == '')) {
                            gData["游戏ID"] = item.appId;
                        }
                        if (!(item.allianceId == null || item.allianceId == '')) {
                            gData["渠道"] = item.allianceId;
                        }
                        if (!(item.channelTag == null || item.channelTag == '')) {
                            gData["子渠道"] = item.channelTag;
                        }
                        //新增数据储存
                        console.log(tara);
                        if (item.returnDays == 0) {
                            resData.push([item.regDate, item.gameDeviceCount]);
                            gData['游戏设备数'] = item.gameDeviceCount;
                            gData['LTV'] = item.LTV;
                        } else {
                            //存储留存数据
                            for (var i = 0; i < tara.length; i++) {
                                var str = tara[i];
                                if (str == 1) str = '次';
                                if (item.returnDays == tara[i]) {
                                    gData['LTV' + str + '日留存'] = item.LTV;
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
                    });
                    $scope.gridOptions3.data = gridData;
                    spinner.spin();
                };
                var calError = function (data, status, headers, config) {
                    console.log(status);
                    spinner.spin();
                };
                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.STATS_PLANTFORM_LTV,
                    params: message
                }).success(calSuccess).error(calError);
            }
            setTimeout(function () {
                $scope.PlantformYandi();
                $scope.PlantformLTV();
            }, $scope.reqDelay);

        }])


//style controll
$(function () {

});