/**
 * Created by Administrator on 2017/6/28.
 */

/**
 * 全局变量.
 */
var detaillist = [];

/**
 * Controller.
 */
app.controller('statsPlantformday',
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

            var yesterday = app.yesterdayFun();
            $('.date-picker-single').val(yesterday);
            window.mid_token = $scope.message;//全局用

            $scope.export = function () {
                var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
                $scope.gridApi.exporter.csvExport('all', 'all', myElement);
            };

            /**
             *Plantformday这个接口默认调用一次，点击时也调用一次 .
             */
            $scope.Plantformday = function () {
                var spinner = new Spinner();
                var target = $("#spin1").get(0);
                spinner.spin(target);
                $("#spin1").show();

                var today = app.todayFun();//commonjs里的方法，获取当天日期
                var message = $scope.message;//message作为点击时间的参数
                message.appId = $scope.filter.server == null ? '' : $scope.filter.server.appId;
                message.allianceId = $scope.filter.channel == null ? '' : $scope.filter.channel.allianceId;
                var message1 = JSON.parse(JSON.stringify(message));
                //message1作为当前时间的参数,pf_message又多写了一套message，由于双向绑定，这里不能复制
                message.startD = $(".date-picker-single").val();
                message.endD = $(".date-picker-single").val();
                message1.startD = today;
                message1.endD = today;

                $scope.gridOptions.columnDefs = "";
                $scope.gridOptions.columnDefs = [
                    {field: '日期', enableColumnResizing: false},
                    {field: 'dau', enableColumnResizing: false},
                    {field: 'nuu', enableColumnResizing: false},
                    {field: 'payRate', enableColumnResizing: false},
                    {field: 'sale', enableColumnResizing: false},
                    {field: 'arppu', enableColumnResizing: false},
                    {field: 'arpu', enableColumnResizing: false},
                ];
                if (message.appId) {
                    $scope.gridOptions.columnDefs.splice(1, 0, {field: '游戏ID'});
                }
                if (message.allianceId) {
                    $scope.gridOptions.columnDefs.splice(2, 0, {field: '渠道'});
                }

                var dayArray = [];//保存两次的数据
                var calSuccess = function (data, status, headers, config) {
                    var gridData = [];
                    try {
                        dayArray.push(data.data);
                        for (var i = 0; i < dayArray.length; i++) {
                            var dataT = (dayArray[i])[0].dau.date.substr(0, 10) == today ? '今天' : (dayArray[i])[0].dau.date.substr(0, 10);
                            gridData.push({
                                "日期": dataT,
                                "游戏ID": (dayArray[i])[0].dau.appId,
                                "渠道": (dayArray[i])[0].dau.allianceId,
                                "dau": (dayArray[i])[0].dau.dauCount,
                                "nuu": (dayArray[i])[0].nuu.nuuCount,
                                "payRate": (dayArray[i])[0].payRate.payRate,
                                "sale": (dayArray[i])[0].sale.totalAmount,
                                "arppu": (dayArray[i])[0].arppu.arppu,
                                "arpu": (dayArray[i])[0].arpu.arpu
                            });
                        }
                    } catch (err) {

                    }

                    $scope.gridOptions.data = gridData;
                    spinner.spin();
                    $("#spin1").hide();
                };
                var calError = function (data, status, headers, config) {
                    console.log(status);
                    spinner.spin();
                };

                //pfDailyDashboard接口，调用两次，一次是当前时间，一次是点击时间
                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.STATS_pfDailyDashboard,
                    params: message1
                }).success(calSuccess).error(calError);

                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.STATS_pfDailyDashboard,
                    params: message
                }).success(calSuccess).error(calError);

            };

            /**
             *PlantformManyday和上面一样，只是处理数据，和传参数不一样 .
             */
            $scope.PlantformManyday = function () {
                var spinner = new Spinner();
                var target = $("#spin3").get(0);
                $("#spin3").show();
                spinner.spin(target);

                var message = $scope.message;//message作为点击时间的参数
                message.appId = $scope.filter.server == null ? '' : $scope.filter.server.appId;
                message.allianceId = $scope.filter.channel == null ? '' : $scope.filter.channel.allianceId;
                message.startD = $(".date-picker-star").val();
                message.endD = $(".date-picker-end").val();

                $scope.gridOptions1.columnDefs = "";
                $scope.gridOptions1.columnDefs = [
                    {
                        field: '详细',
                        width: 60,
                        cellTemplate: '<div style="width: 100%;text-align: center;"><button  class="btn btn-small btn-primary data-details" >跟踪</button></div> '
                    },
                    {field: '日期', enableColumnResizing: false},
                    {field: 'nuu', enableColumnResizing: false},
                    {field: 'dau', enableColumnResizing: false},
                    {field: 'payRate', enableColumnResizing: false},
                    {field: 'sale', enableColumnResizing: false},
                    {field: 'arppu', enableColumnResizing: false},
                    {field: 'arpu', enableColumnResizing: false},
                    {field: '一阶留存比', enableColumnResizing: false},
                    {field: '次留', enableColumnResizing: false}

                ];
                if (message.appId) {
                    $scope.gridOptions1.columnDefs.splice(2, 0, {field: '游戏ID'});
                }
                if (message.allianceId) {
                    $scope.gridOptions1.columnDefs.splice(3, 0, {field: '渠道'});
                }

                var dayArray = [];//保存两次的数据
                var calSuccess = function (data, status, headers, config) {
                    var gridData = [];
                    try {
                        dayArray = data.data
                        console.log(dayArray);
                        for (var i = 0; i < dayArray.length; i++) {
                            var dataT = dayArray[i].dau.date.substr(0, 10);
                            gridData.push({
                                "日期": dataT,
                                "游戏ID": dayArray[i].dau.appId,
                                "渠道": dayArray[i].dau.allianceId,
                                "nuu": dayArray[i].nuu.nuuCount,
                                "dau": dayArray[i].dau.dauCount,
                                "payRate": dayArray[i].payRate.payRate,
                                "sale": dayArray[i].sale.totalAmount,
                                "arppu": dayArray[i].arppu.arppu,
                                "arpu": dayArray[i].arpu.arpu,
                                "一阶留存比": dayArray[i].firstOrderRR.rate,
                                "次留": dayArray[i].RR.rate

                            });
                            detaillist[dataT] = dayArray[i];
                        }
                    } catch (err) {

                    }
                    $scope.gridOptions1.data = gridData;
                    spinner.spin();
                    $("#spin3").hide();
                };
                var calError = function (data, status, headers, config) {
                    console.log(status);
                    spinner.spin();
                    $("#spin3").hide();
                };
                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.STATS_pfDailyDashboard,
                    params: message
                }).success(calSuccess).error(calError);

            };

            /**
             * pfDailyDetail,查看详情.
             */
            $scope.pfDailyDetail = function (Detailparm) {
                var spinner = new Spinner();
                var target = $("#spin3").get(0);
                $("#spin3").show();
                spinner.spin(target);
                console.log(Detailparm);
                var message = $scope.message;//message作为点击时间的参数
                message.appId = $scope.filter.server == null ? '' : $scope.filter.server.appId;
                message.allianceId = $scope.filter.channel == null ? '' : $scope.filter.channel.allianceId;
                message.startD = Detailparm.startD;
                message.endD = Detailparm.startD;
                message.returnDays = "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30";

                var strhtml = "日期:" + Detailparm.startD + "<span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>" + "NUU:" + Detailparm.nuu;
                var appid = message.appId;
                if (appid) {
                    strhtml = strhtml + "<span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>" + "appid:" + appid;
                }
                if (message.allianceId) {
                    strhtml = strhtml + "<span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>" + "渠道:" + message.allianceId;
                }

                $('.h5title').html(strhtml);
                $scope.gridOptions2.columnDefs = "";
                $scope.gridOptions2.columnDefs = [
                    {field: '类型', width: '10%'},
                    {field: '第0天', width: '10%'},
                    {field: '第1天', width: '10%'},
                    {field: '第2天', width: '10%'},
                    {field: '第3天', width: '10%'},
                    {field: '第4天', width: '10%'},
                    {field: '第5天', width: '10%'},
                    {field: '第6天', width: '10%'},
                    {field: '第7天', width: '10%'},
                    {field: '第8天', width: '10%'},
                    {field: '第9天', width: '10%'},
                    {field: '第10天', width: '10%'},
                    {field: '第11天', width: '10%'},
                    {field: '第12天', width: '10%'},
                    {field: '第13天', width: '10%'},
                    {field: '第14天', width: '10%'},
                    {field: '第15天', width: '10%'},
                    {field: '第16天', width: '10%'},
                    {field: '第17天', width: '10%'},
                    {field: '第18天', width: '10%'},
                    {field: '第19天', width: '10%'},
                    {field: '第20天', width: '10%'},
                    {field: '第21天', width: '10%'},
                    {field: '第22天', width: '10%'},
                    {field: '第23天', width: '10%'},
                    {field: '第24天', width: '10%'},
                    {field: '第25天', width: '10%'},
                    {field: '第26天', width: '10%'},
                    {field: '第27天', width: '10%'},
                    {field: '第28天', width: '10%'},
                    {field: '第29天', width: '10%'},
                    {field: '第30天', width: '10%'}

                ];

                var calSuccess = function (data, status, headers, config) {
                    console.log(data);
                    spinner.spin();
                    var gridData = [];
                    try {
                        dayArray = data.data
                        console.log(dayArray);

                        var temparr = {};
                        for (var i = 0; i < dayArray.LTV.length; i++) {
                            if (i == 0) {
                                var tem = "类型";
                                temparr[tem] = "LTV";
                            } else {
                                var tem = "第" + (i - 1) + "天";
                                temparr[tem] = dayArray.LTV[i - 1].LTV;
                            }
                            if (i == dayArray.LTV.length - 1) {
                                var tem = "第" + i + "天";
                                temparr[tem] = dayArray.LTV[i].LTV;
                            }
                        }
                        gridData.push(temparr);
                        var temparr = {};
                        for (var i = 0; i < dayArray.RR.length; i++) {
                            if (i == 0) {
                                var tem = "类型";
                                temparr[tem] = "留存";
                            } else {
                                var tem = "第" + (i - 1) + "天";
                                temparr[tem] = dayArray.RR[i - 1].rr;
                            }
                            if (i == dayArray.RR.length - 1) {
                                var tem = "第" + i + "天";
                                temparr[tem] = dayArray.RR[i].rr;
                            }
                        }
                        gridData.push(temparr);
                        var temparr = {};
                        for (var i = 0; i < dayArray.sale.length; i++) {
                            if (i == 0) {
                                var tem = "类型";
                                temparr[tem] = "充值金额";
                            } else {
                                var tem = "第" + (i - 1) + "天";
                                temparr[tem] = dayArray.sale[i - 1].amount;
                            }
                            if (i == dayArray.sale.length - 1) {
                                var tem = "第" + i + "天";
                                temparr[tem] = dayArray.sale[i].amount;
                            }
                        }
                        gridData.push(temparr);
                        var temparr = {};
                        for (var i = 0; i < dayArray.payRate.length; i++) {
                            if (i == 0) {
                                var tem = "类型";
                                temparr[tem] = "付费率";
                            } else {
                                var tem = "第" + (i - 1) + "天";
                                temparr[tem] = dayArray.payRate[i - 1].payRate;
                            }
                            if (i == dayArray.sale.length - 1) {
                                var tem = "第" + i + "天";
                                temparr[tem] = dayArray.payRate[i].payRate;
                            }
                        }
                        gridData.push(temparr);
                        var temparr = {};
                        for (var i = 0; i < dayArray.arppu.length; i++) {
                            if (i == 0) {
                                var tem = "类型";
                                temparr[tem] = "ARPPU";
                            } else {
                                var tem = "第" + (i - 1) + "天";
                                temparr[tem] = dayArray.arppu[i - 1].arppu;
                            }
                            if (i == dayArray.arppu.length - 1) {
                                var tem = "第" + i + "天";
                                temparr[tem] = dayArray.arppu[i].arppu;
                            }
                        }
                        gridData.push(temparr);

                        var temparr = {};
                        for (var i = 0; i < dayArray.arpu.length; i++) {
                            if (i == 0) {
                                var tem = "类型";
                                temparr[tem] = "ARPU";
                            } else {
                                var tem = "第" + (i - 1) + "天";
                                temparr[tem] = dayArray.arpu[i - 1].arpu;
                            }
                            if (i == dayArray.arppu.length - 1) {
                                var tem = "第" + i + "天";
                                temparr[tem] = dayArray.arpu[i].arpu;
                            }
                        }
                        gridData.push(temparr);

                        $scope.gridOptions2.data = gridData;
                        spinner.spin();
                        $("#spin3").hide();

                    } catch (err) {

                    }
                };
                var calError = function (data, status, headers, config) {
                    console.log(status);
                    spinner.spin();
                    $("#spin3").hide();
                };
                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.STATS_pfDailyDetail,
                    params: message
                }).success(calSuccess).error(calError);
            }

            /**
             * 点击查看图表DAU.
             */
            var statsPlantDau = echartsService.line('statsPlantDau', '实时对比表');
            //对比切换
            $scope.compareSlc = function (str) {
                $scope.methodCompare = str;
                $scope.PlantformactiveUserCompare();
            }
            $scope.methodCompare = 'uidCountDau';
            $scope.PlantformactiveUserCompare = function (str) {
                var spinner = new Spinner();
                var target = $("#spin_dau").get(0);
                $("#spin_dau").show();
                spinner.spin(target);

                var message = $scope.message;
                var methodCompare = $scope.methodCompare;

                message.appId = $scope.filter.server == null ? null : $scope.filter.server.appId;
                message.allianceId = $scope.filter.channel == null ? null : $scope.filter.channel.allianceId;
                message.channelTag = ($scope.filter.channelTag == null || $scope.filter.channelTag.length == 0) ? null : $scope.filter.channelTag.join(',');
                var message1 = JSON.parse(JSON.stringify(message));
                message1.compareD = app.todayFun();
                message.compareD = $(".date-picker-single").val();


                //charts标题部分
                var appName = ($scope.filter.server == null || $scope.filter.server.appName == undefined) ? '全服务器' : $scope.filter.server.appName;
                var allianceName = ( $scope.filter.channel == null || $scope.filter.channel.allianceName == undefined) ? '全渠道' : $scope.filter.channel.allianceName;
                var appSvrAlicAtr = message.compareD + '-' + appName + '-' + allianceName + '-';//去掉了（message.channelTag），暂未开放

                var arraylegend = [];
                var arrayseries = [];
                var calSuccess = function (data, status, headers, config, e) {
                    if (e == "1") {
                        appSvrAlicAtr = app.todayFun() + '-' + appName + '-' + allianceName + '-';//去掉了（message.channelTag），暂未开放
                    } else {
                        appSvrAlicAtr = message.compareD + '-' + appName + '-' + allianceName + '-';//去掉了（message.channelTag），暂未开放
                    }

                    var legendData = [];
                    var seriesData = [];
                    var plantformActiveCompare = "";
                    plantformActiveCompare = data.dau;

                    //填充图表
                    var e_data = [];
                    _.each(plantformActiveCompare, function (item) {
                        if (methodCompare == 'uidCountDau') {
                            e_data.push([item.time, item.data.result.uidCount]);
                        } else if (methodCompare == 'deviceCountDau') {
                            e_data.push([item.time, item.data.result.deviceCount]);
                        }
                    });

                    if (methodCompare == 'uidCountDau') {
                        statsPlantDau.dispose();
                        statsPlantDau = echartsService.line('statsPlantDau', '活跃用户对比表');
                        legendData.push(appSvrAlicAtr + '活跃用户人数');
                        seriesData.push(
                            {
                                name: appSvrAlicAtr + '活跃用户人数',
                                type: 'line',
                                symbol: 'none',
                                data: e_data
                            }
                        );
                    } else if (methodCompare == 'deviceCountDau') {
                        statsPlantDau.dispose();
                        statsPlantDau = echartsService.line('statsPlantDau', '活跃设备对比表');
                        legendData.push(appSvrAlicAtr + '活跃设备数');
                        seriesData.push(
                            {
                                name: appSvrAlicAtr + '活跃设备数',
                                type: 'line',
                                symbol: 'none',
                                data: e_data
                            }
                        );
                    }

                    //删除已经重复进入的数据
                    for (var i = 0; i < legendData.length - 1; i++) {
                        if (legendData[legendData.length - 1] == legendData[i]) {
                            legendData.splice(legendData.length - 1, 1);
                            seriesData.splice(seriesData.length - 1, 1);
                        }
                    }
                    arraylegend.push(legendData);
                    arrayseries.push(seriesData);
                    var legend = [];
                    var series = [];
                    try {
                        legend.push((arraylegend[0])[0]);
                        legend.push((arraylegend[1])[0]);
                        series.push((arrayseries[0])[0]);
                        series.push((arrayseries[1])[0]);
                    } catch (err) {
                        return false;
                    }
                    statsPlantDau.setOption({
                        //图例
                        legend: {
                            data: legend
                        },
                        //工具条
                        toolbox: {
                            show: true,
                            feature: {saveAsImage: {}}
                        },
                        //缩放
                        dataZoom: {
                            show: true,
                            realtime: true,
                            type: 'inside'
                        },
                        xAxis: {
                            type: 'time'
                        },
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: series
                    });
                    $("#spin_dau").hide();
                    spinner.spin();
                };
                var calError = function (data, status, headers, config, e) {
                    console.log(status);
                    $("#spin_dau").hide();
                    spinner.spin();
                };

                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.STATS_PLANTFORM_ACTIVE_USER_REALTIME,
                    params: message
                }).success(function (a, b, c, d, e) {
                    calSuccess(a, b, c, d, "0");
                }).error(calError);
                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.STATS_PLANTFORM_ACTIVE_USER_REALTIME,
                    params: message1
                }).success(function (a, b, c, d, e) {
                    calSuccess(a, b, c, d, "1");
                }).error(calError);
            }

            /**
             * 点击查看图表NUU.
             */
            $scope.methodCompare1 = 'uidCountNuu';
            //对比切换
            $scope.compareSlc1 = function (str) {
                $scope.methodCompare1 = str;
                $scope.PlantformnewgrowUserCompare();
            }
            var statsPlantNuu = echartsService.line('statsPlantNuu', '新增对比表');
            $scope.PlantformnewgrowUserCompare = function (str) {

                var spinner = new Spinner();
                var target = $("#spin_nuu").get(0);
                $("#spin_nuu").show();
                spinner.spin(target);

                var message = $scope.message;
                var methodCompare = $scope.methodCompare1;

                message.appId = $scope.filter.server == null ? null : $scope.filter.server.appId;
                message.allianceId = $scope.filter.channel == null ? null : $scope.filter.channel.allianceId;
                message.channelTag = ($scope.filter.channelTag == null || $scope.filter.channelTag.length == 0) ? null : $scope.filter.channelTag.join(',');
                var message1 = JSON.parse(JSON.stringify(message));
                message1.compareD = app.todayFun();
                message.compareD = $(".date-picker-single").val();
                message1.startD = app.todayFun();
                message1.endD = app.todayFun();
                message.startD = $(".date-picker-single").val();
                message.endD = $(".date-picker-single").val();

                //charts标题部分
                var appName = ($scope.filter.server == null || $scope.filter.server.appName == undefined) ? '全服务器' : $scope.filter.server.appName;
                var allianceName = ( $scope.filter.channel == null || $scope.filter.channel.allianceName == undefined) ? '全渠道' : $scope.filter.channel.allianceName;
                var appSvrAlicAtr = message.compareD + '-' + appName + '-' + allianceName + '-';//去掉了（message.channelTag），暂未开放

                var arraylegend = [];
                var arrayseries = [];
                var calSuccess = function (data, status, headers, config, e) {
                    if (e == "1") {
                        appSvrAlicAtr = app.todayFun() + '-' + appName + '-' + allianceName + '-';//去掉了（message.channelTag），暂未开放
                    } else {
                        appSvrAlicAtr = message.compareD + '-' + appName + '-' + allianceName + '-';//去掉了（message.channelTag），暂未开放
                    }
                    console.log(appSvrAlicAtr);
                    var legendData = [];
                    var seriesData = [];
                    var plantformActiveCompare = "";
                    plantformActiveCompare = data.reg;

                    //填充图表
                    var e_data = [];
                    _.each(plantformActiveCompare, function (item) {
                        if (methodCompare == 'uidCountNuu') {
                            e_data.push([item.time, item.data.result.gameUidCount]);
                        } else if (methodCompare == 'deviceCountNuu') {
                            e_data.push([item.time, item.data.result.pfDeviceCount]);
                        }
                    });

                    if (methodCompare == 'uidCountNuu') {
                        statsPlantNuu.dispose();
                        statsPlantNuu = echartsService.line('statsPlantNuu', '新增用户对比表');
                        legendData.push(appSvrAlicAtr + '新增用户人数');
                        seriesData.push(
                            {
                                name: appSvrAlicAtr + '新增用户人数',
                                type: 'line',
                                symbol: 'none',
                                data: e_data
                            }
                        );
                    } else if (methodCompare == 'deviceCountNuu') {
                        statsPlantNuu.dispose();
                        statsPlantNuu = echartsService.line('statsPlantNuu', '新增用户对比表');
                        legendData.push(appSvrAlicAtr + '新增设备数');
                        seriesData.push(
                            {
                                name: appSvrAlicAtr + '新增设备数',
                                type: 'line',
                                symbol: 'none',
                                data: e_data
                            }
                        );
                    }

                    //删除已经重复进入的数据
                    for (var i = 0; i < legendData.length - 1; i++) {
                        if (legendData[legendData.length - 1] == legendData[i]) {
                            legendData.splice(legendData.length - 1, 1);
                            seriesData.splice(seriesData.length - 1, 1);
                        }
                    }

                    arraylegend.push(legendData);
                    arrayseries.push(seriesData);
                    var legend = [];
                    var series = [];
                    try {
                        legend.push((arraylegend[0])[0]);
                        legend.push((arraylegend[1])[0]);
                        series.push((arrayseries[0])[0]);
                        series.push((arrayseries[1])[0]);
                    } catch (err) {
                        return false;
                    }

                    statsPlantNuu.setOption({
                        //图例
                        legend: {
                            data: legend
                        },
                        //工具条
                        toolbox: {
                            show: true,
                            feature: {saveAsImage: {}}
                        },
                        //缩放
                        dataZoom: {
                            show: true,
                            realtime: true,
                            type: 'inside'
                        },
                        xAxis: {
                            type: 'time'
                        },
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: series
                    });
                    $("#spin_nuu").hide();
                    spinner.spin();
                };
                var calError = function (data, status, headers, config, e) {
                    console.log(status);
                    $("#spin_nuu").hide();
                    spinner.spin();
                };

                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.STATS_PLANTFORM_NEW_GROW_REALTIME,
                    params: message
                }).success(function (a, b, c, d, e) {
                    calSuccess(a, b, c, d, "0");
                }).error(calError);
                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.STATS_PLANTFORM_NEW_GROW_REALTIME,
                    params: message1
                }).success(function (a, b, c, d, e) {
                    calSuccess(a, b, c, d, "1");
                }).error(calError);
            }

            /**
             * 点击查看图表PAY.
             */
            $scope.methodCompare2 = 'uidCountPay';
            //对比切换
            $scope.compareSlc2 = function (str) {
                $scope.methodCompare2 = str;
                $scope.PlantformnewPayCompare();
            }
            var statsPlantPay = echartsService.line('statsPlantPay', '付费对比表');
            $scope.PlantformnewPayCompare = function (str) {
                var spinner = new Spinner();
                var target = $("#spin_pay").get(0);
                $("#spin_pay").show();
                spinner.spin(target);

                var message = $scope.message;
                var methodCompare = $scope.methodCompare2;

                message.appId = $scope.filter.server == null ? null : $scope.filter.server.appId;
                message.allianceId = $scope.filter.channel == null ? null : $scope.filter.channel.allianceId;
                message.channelTag = ($scope.filter.channelTag == null || $scope.filter.channelTag.length == 0) ? null : $scope.filter.channelTag.join(',');
                var message1 = JSON.parse(JSON.stringify(message));
                message1.compareD = app.todayFun();
                message.compareD = $(".date-picker-single").val();

                //charts标题部分
                var appName = ($scope.filter.server == null || $scope.filter.server.appName == undefined) ? '全服务器' : $scope.filter.server.appName;
                var allianceName = ( $scope.filter.channel == null || $scope.filter.channel.allianceName == undefined) ? '全渠道' : $scope.filter.channel.allianceName;
                var appSvrAlicAtr = message.compareD + '-' + appName + '-' + allianceName + '-';//去掉了（message.channelTag），暂未开放

                var arraylegend = [];
                var arrayseries = [];
                var calSuccess = function (data, status, headers, config, e) {
                    if (e == "1") {
                        appSvrAlicAtr = app.todayFun() + '-' + appName + '-' + allianceName + '-';//去掉了（message.channelTag），暂未开放
                    } else {
                        appSvrAlicAtr = message.compareD + '-' + appName + '-' + allianceName + '-';//去掉了（message.channelTag），暂未开放
                    }
                    console.log(appSvrAlicAtr);
                    var legendData = [];
                    var seriesData = [];
                    var plantformActiveCompare = "";
                    plantformActiveCompare = data.payment;

                    //填充图表
                    var e_data = [];
                    _.each(plantformActiveCompare, function (item) {
                        if (methodCompare == 'uidCountPay') {
                            e_data.push([item.time, item.data.result.payuser]);
                        } else if (methodCompare == 'deviceCountPay') {
                            e_data.push([item.time, item.data.result.payRate]);
                        }
                    });

                    if (methodCompare == 'uidCountPay') {
                        statsPlantPay.dispose();
                        statsPlantPay = echartsService.line('statsPlantPay', '付费对比表');
                        legendData.push(appSvrAlicAtr + '付费人数');
                        seriesData.push(
                            {
                                name: appSvrAlicAtr + '付费人数',
                                type: 'line',
                                symbol: 'none',
                                data: e_data
                            }
                        );
                    } else if (methodCompare == 'deviceCountPay') {
                        statsPlantPay.dispose();
                        statsPlantPay = echartsService.line('statsPlantPay', '付费对比表');
                        legendData.push(appSvrAlicAtr + '付费率');
                        seriesData.push(
                            {
                                name: appSvrAlicAtr + '付费率',
                                type: 'line',
                                symbol: 'none',
                                data: e_data
                            }
                        );
                    }

                    //删除已经重复进入的数据
                    for (var i = 0; i < legendData.length - 1; i++) {
                        if (legendData[legendData.length - 1] == legendData[i]) {
                            legendData.splice(legendData.length - 1, 1);
                            seriesData.splice(seriesData.length - 1, 1);
                        }
                    }

                    arraylegend.push(legendData);
                    arrayseries.push(seriesData);
                    var legend = [];
                    var series = [];
                    try {
                        legend.push((arraylegend[0])[0]);
                        legend.push((arraylegend[1])[0]);
                        series.push((arrayseries[0])[0]);
                        series.push((arrayseries[1])[0]);
                    } catch (err) {
                        return false;
                    }

                    statsPlantPay.setOption({
                        //图例
                        legend: {
                            data: legend
                        },
                        //工具条
                        toolbox: {
                            show: true,
                            feature: {saveAsImage: {}}
                        },
                        //缩放
                        dataZoom: {
                            show: true,
                            realtime: true,
                            type: 'inside'
                        },
                        xAxis: {
                            type: 'time'
                        },
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: series
                    });
                    $("#spin_pay").hide();
                    spinner.spin();
                };
                var calError = function (data, status, headers, config, e) {
                    console.log(status);
                    $("#spin_pay").hide();
                    spinner.spin();
                };

                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.STATS_PLANTFORM_USER_PAY_REALTIME,
                    params: message
                }).success(function (a, b, c, d, e) {
                    calSuccess(a, b, c, d, "0");
                }).error(calError);
                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.STATS_PLANTFORM_USER_PAY_REALTIME,
                    params: message1
                }).success(function (a, b, c, d, e) {
                    calSuccess(a, b, c, d, "1");
                }).error(calError);
            }

            /**
             * 点击查看图表付费金额.
             */
            var statsPlanttotalAmount = echartsService.line('statsPlanttotalAmount', '付费金额对比表');
            $scope.PlantformtotalAmount = function (str) {
                var spinner = new Spinner();
                var target = $("#spin_totalAmount").get(0);
                $("#spin_totalAmount").show();
                spinner.spin(target);

                var message = $scope.message;
                message.appId = $scope.filter.server == null ? null : $scope.filter.server.appId;
                message.allianceId = $scope.filter.channel == null ? null : $scope.filter.channel.allianceId;
                message.channelTag = ($scope.filter.channelTag == null || $scope.filter.channelTag.length == 0) ? null : $scope.filter.channelTag.join(',');
                var message1 = JSON.parse(JSON.stringify(message));
                message1.compareD = app.todayFun();
                message.compareD = $(".date-picker-single").val();

                //charts标题部分
                var appName = ($scope.filter.server == null || $scope.filter.server.appName == undefined) ? '全服务器' : $scope.filter.server.appName;
                var allianceName = ( $scope.filter.channel == null || $scope.filter.channel.allianceName == undefined) ? '全渠道' : $scope.filter.channel.allianceName;
                var appSvrAlicAtr = message.compareD + '-' + appName + '-' + allianceName + '-';//去掉了（message.channelTag），暂未开放

                var arraylegend = [];
                var arrayseries = [];
                var calSuccess = function (data, status, headers, config, e) {
                    if (e == "1") {
                        appSvrAlicAtr = app.todayFun() + '-' + appName + '-' + allianceName + '-';//去掉了（message.channelTag），暂未开放
                    } else {
                        appSvrAlicAtr = message.compareD + '-' + appName + '-' + allianceName + '-';//去掉了（message.channelTag），暂未开放
                    }
                    console.log(appSvrAlicAtr);
                    var legendData = [];
                    var seriesData = [];
                    var plantformActiveCompare = "";
                    plantformActiveCompare = data.payment;

                    //填充图表
                    var e_data = [];
                    _.each(plantformActiveCompare, function (item) {
                        e_data.push([item.time, item.data.result.totalAmount]);
                    });


                    statsPlanttotalAmount.dispose();
                    statsPlanttotalAmount = echartsService.line('statsPlanttotalAmount', '付费金额对比表');
                    legendData.push(appSvrAlicAtr + '付费金额');
                    seriesData.push(
                        {
                            name: appSvrAlicAtr + '付费金额',
                            type: 'line',
                            symbol: 'none',
                            data: e_data
                        }
                    );


                    //删除已经重复进入的数据
                    for (var i = 0; i < legendData.length - 1; i++) {
                        if (legendData[legendData.length - 1] == legendData[i]) {
                            legendData.splice(legendData.length - 1, 1);
                            seriesData.splice(seriesData.length - 1, 1);
                        }
                    }

                    arraylegend.push(legendData);
                    arrayseries.push(seriesData);
                    var legend = [];
                    var series = [];
                    try {
                        legend.push((arraylegend[0])[0]);
                        legend.push((arraylegend[1])[0]);
                        series.push((arrayseries[0])[0]);
                        series.push((arrayseries[1])[0]);
                    } catch (err) {
                        return false;
                    }

                    statsPlanttotalAmount.setOption({
                        //图例
                        legend: {
                            data: legend
                        },
                        //工具条
                        toolbox: {
                            show: true,
                            feature: {saveAsImage: {}}
                        },
                        //缩放
                        dataZoom: {
                            show: true,
                            realtime: true,
                            type: 'inside'
                        },
                        xAxis: {
                            type: 'time'
                        },
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: series
                    });
                    $("#spin_pay").hide();
                    spinner.spin();
                };
                var calError = function (data, status, headers, config, e) {
                    console.log(status);
                    $("#spin_pay").hide();
                    spinner.spin();
                };

                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.STATS_PLANTFORM_USER_PAY_REALTIME,
                    params: message
                }).success(function (a, b, c, d, e) {
                    calSuccess(a, b, c, d, "0");
                }).error(calError);
                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.STATS_PLANTFORM_USER_PAY_REALTIME,
                    params: message1
                }).success(function (a, b, c, d, e) {
                    calSuccess(a, b, c, d, "1");
                }).error(calError);
            }

        }])


$(function () {
    events.changebtnDM();
    events.initPage();
});


//点击详细事件
$(document).on("click", ".data-details", function () {
    var orderid = $(this).parent().parent().next().children().html();
    console.log(111111111111111);
    console.log(detaillist);
    var showdata = detaillist[orderid];
    console.log(showdata);
    var ob = {};
    try {
        ob.appId = showdata.dau.appId;
        ob.allianceId = showdata.dau.allianceId;
        ob.startD = orderid;
        ob.endD = orderid;
        ob.nuu = showdata.nuu.nuuCount
    } catch (err) {

    }
    //调用angular里面的pfDailyDetail()方法。
    var appElement = document.querySelector('[ng-controller=statsPlantformday]');
    var $scope = angular.element(appElement).scope();
    $scope.pfDailyDetail(ob);
})

var events = {
    //切换日统计、月统计
    changebtnDM: function () {
        $('.pf-btn').click(function () {
            $('.pf-btn').siblings().removeClass('active');
            $(this).addClass('active');
            if ($(this).html() == "实时统计") {
                $('#daycount').css("opacity", "1");
                $('#daycount').css("z-index", "9");
                $('#monthcount').css("opacity", "0");
                $('#monthcount').css("z-index", "8");
            } else if ($(this).html() == "日统计") {
                $('#daycount').css("opacity", "0");
                $('#monthcount').css("opacity", "1");
                $('#daycount').css("z-index", "8");
                $('#monthcount').css("z-index", "9");
            } else if ($(this).html() == "月统计") {
                console.log(window.mid_token);
                window.location.href = "statsPlantformMonth.jsp?mid=" + window.mid_token.mid + "&token=" + window.mid_token.token;
            }

        })
    },
    initPage: function () {

    }
}