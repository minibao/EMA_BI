app.controller('statsPlantformRetention', 
        ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 
        function($scope, $http, $location, $cookieStore, echartsService){  
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
            $scope.ngtype = 'PfDevice';
            $scope.gridOptions = {
                treeRowHeaderAlwaysVisible: false,
                enableRowSelection: false,
                enableGridMenu: true,
                enableSelectAll: true,
                exporterMenuPdf: false,
                exporterOlderExcelCompatibility: true,
                onRegisterApi: function(gridApi) { 
                    $scope.gridApi = gridApi;
                }
            };
            $scope.appid = '20012';
            for (var i=0; i < $scope.sysPlantformContainerInfo.length; i++) {
                if ($scope.sysPlantformContainerInfo[i].appId == $scope.appid) {
                    $scope.filter.server = $scope.sysPlantformContainerInfo[i];
                    break;
                }
            }
            $scope.export = function() {
                var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
                $scope.gridApi.exporter.csvExport( 'all', 'all', myElement );
            };

            //日期数组
            var dateArr = ['','次日','二日','三日','四日','五日','六日','七日','十五日','三十日']

            $scope.PlantformRetention = function(str){
                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target); 
                if(str == 'ajax') $scope.resultData = null;
                var suner = (function (){
                    var arr = $scope.filter.reday;
                    if (arr.length == 0)
                        return 1;
                    var tol = [];
                    for(var i = 0;i < arr.length;i++){
                        tol.push(arr[i].dictValue);    
                    };
                    return tol.join(','); 
                })();
                var message = $scope.message;
                message.appId = $scope.appid;
                message.allianceId = $scope.filter.channel==null?null:$scope.filter.channel.allianceId;
                message.channelTag = ($scope.filter.channelTag==null || $scope.filter.channelTag.length==0)?null:$scope.filter.channelTag.join(',');
                message.startD = $(".date-picker-star").val();
                message.endD = $(".date-picker-end").val(); 
                message.returnDays = suner;
                $scope.gridOptions.columnDefs = [{
                        field:'日期',
                        width: '10%',
                        sort: {
                            direction: 'desc', priority: 0 
                        }
                   }];
                if(message.appId){
                   $scope.gridOptions.columnDefs.push({
                        field:'游戏ID',
                        width: '10%'
                   }) 
                };
                if(message.allianceId){
                  $scope.gridOptions.columnDefs.push({
                        field:'渠道',
                        width: '10%'
                   })   
              };
              if(message.channelTag){
                $scope.gridOptions.columnDefs.push({
                        field:'子渠道',
                        width: '10%'
                   })
              };
                for(var i = 0;i <  $scope.filter.reday.length;i++){
                    if($scope.ngtype == 'PfDevice'){
                        (function(i){
                        var dictValue = $scope.filter.reday[i].dictValue;
                        if(dictValue == 15) dictValue = 8;
                        if(dictValue == 30) dictValue = 9;
                        $scope.gridOptions.columnDefs.push({
                            field:'' +  dateArr[dictValue]+'平台设备留存',
                            width: '10%',
                            visible: false
                            },
                            {
                            field:''+ dateArr[dictValue] +'平台设备留存率',
                            width: '10%'  
                            }
                        )
                    })(i)
                    }else if($scope.ngtype == 'PfUid'){
                        (function(i){
                        var dictValue = $scope.filter.reday[i].dictValue;
                        if(dictValue == 15) dictValue = 8;
                        if(dictValue == 30) dictValue = 9;
                        $scope.gridOptions.columnDefs.push(
                        {
                            field:''+ dateArr[dictValue] +'平台账号留存',
                            width: '10%',
                            visible: false 
                        },
                        {
                            field:''+ dateArr[dictValue] +'平台账号留存率',
                            width: '10%'   
                        }
                        )
                    })(i)
                    }else if($scope.ngtype == 'GameDevice'){
                        (function(i){
                        var dictValue = $scope.filter.reday[i].dictValue;
                        if(dictValue == 15) dictValue = 8;
                        if(dictValue == 30) dictValue = 9;
                        $scope.gridOptions.columnDefs.push(
                        {
                            field:''+ dateArr[dictValue] +'游戏设备留存',
                            width: '10%',
                            visible: false  
                        },
                        {
                            field:''+ dateArr[dictValue] +'游戏设备留存率',
                            width: '10%'   
                        }
                        )
                    })(i)
                    }else if($scope.ngtype == 'GameUid'){
                        (function(i){
                        var dictValue = $scope.filter.reday[i].dictValue;
                        if(dictValue == 15) dictValue = 8;
                        if(dictValue == 30) dictValue = 9;
                        $scope.gridOptions.columnDefs.push(
                        {
                            field:''+ dateArr[dictValue] +'游戏账号留存',
                            width: '10%' ,
                            visible: false 
                        },
                        {
                            field:''+ dateArr[dictValue] +'游戏账号留存率',
                            width: '10%'   
                        }
                        )
                    })(i)
                    };
                };
                var calSuccess = function(data, status, headers, config) {
                    var retentions = {};                    
                    var gridData = [];
                    var fileName = [];                   
                    fileName.push(message.startD + '至' + message.endD + '平台留存统计表');
                    $scope.gridOptions.exporterCsvFilename = fileName + '.csv';
                    if($scope.resultData){
                        retentions = $scope.resultData;
                    }else{
                        retentions = data.data;
                        $scope.resultData = data.data;
                    }
                    _.each(retentions, function(item) {
                        //excel表格
                        var _time = item.regDate.substring(0,10);
                        var gdata = {"日期": _time};
                        if(!(item.appId == null || item.appId == '')){
                             gdata["游戏ID"] = item.appId
                        };
                        if(!(item.allianceId == null || item.allianceId == '')){
                            gdata["渠道"] = item.allianceId
                        };
                        if(!(item.channelTag == null || item.channelTag == '')){
                            gdata["子渠道"] = item.channelTag
                        }; 
                        (function(item){
                            for(var i = 1;i < 10;i++){
                                var _index = 0;
                                _index = i;
                                if(i == 8) _index = 15;
                                if(i == 9) _index = 30;
                                if($scope.ngtype == 'PfDevice'){
                                    var PfDeviceReNum = eval("item.PfDeviceReNum" + _index);
                                    var PfDeviceRePercent = eval("item.PfDeviceRePercent" + _index);
                                    if(PfDeviceReNum != undefined){
                                        gdata[(dateArr[i]+'平台设备留存')] =  PfDeviceReNum;
                                        gdata[(dateArr[i]+'平台设备留存率')] =  PfDeviceRePercent;  
                                    }
                                }else if($scope.ngtype == 'PfUid'){
                                    var PfUidReNum = eval("item.PfUidReNum" + _index);
                                    var PfUidRePercent =  eval("item.PfUidRePercent" + _index);
                                    if( PfUidReNum != undefined){
                                        gdata[(dateArr[i]+'平台账号留存')] =  PfUidReNum; 
                                        gdata[(dateArr[i]+'平台账号留存率')] =  PfUidRePercent;  
                                    }
                                }else if($scope.ngtype == 'GameDevice'){
                                    var GameDeviceReNum = eval("item.GameDeviceReNum" + _index);
                                    var GameDeviceRePercent = eval("item.GameDeviceRePercent" + _index);
                                    if(GameDeviceReNum != undefined){
                                       gdata[(dateArr[i]+'游戏设备留存')] =  GameDeviceReNum; 
                                        gdata[(dateArr[i]+'游戏设备留存率')] =  GameDeviceRePercent; 
                                    }
                                }else if($scope.ngtype == 'GameUid'){
                                    var GameUidReNum = eval("item.GameUidReNum" + _index);
                                    var GameUidRePercent = eval("item.GameUidRePercent" + _index);
                                    if(GameUidReNum != undefined){
                                        gdata[(dateArr[i]+'游戏账号留存')] =  GameUidReNum; 
                                        gdata[(dateArr[i]+'游戏账号留存率')] =  GameUidRePercent; 
                                    }
                                }
                            }
                        })(item);  
                        gridData.push(gdata);
                    });
                    $scope.gridOptions.data = gridData;
                    spinner.spin();
                };
                var calError = function(data, status, headers, config) {
                    console.log(status)
                    spinner.spin();
                };
                if($scope.resultData){
                    calSuccess();
                }else{
                   $http({
                    method : 'GET' ,
                    url : '/gmtool' + requires.STATS_PLANTFORM_RETENTION,
                    params : message
                    }).success( calSuccess ).error( calError );  
                } 
            };
            //选择显示
            $scope.showType = function(str){
                $scope.ngtype = str;
                $scope.PlantformRetention();
            }
            //实时对比
            var statsPlantFormRetCompareChart =  echartsService.line('statsPlantFormRetCompare', '平台留存对比表');
            //echarts 数据
            var legendData = [];
            var seriesData = [];
            //默认选择游戏设备
            $scope.methodCompare = 'gameDeviceCount'; 
            $scope.PlantformRetCompare = function(str){
                var spinner = new Spinner();
                var target = $("#spin_cop").get(0);
                spinner.spin(target);
                if(str == 'ajax') $scope.retCmp = null;

                var methodCompare = $scope.methodCompare;
                var message = $scope.message;
                message.appId = $scope.appid;
                message.allianceId = $scope.filter.channel==null?'':$scope.filter.channel.allianceId;
                message.channelTag = ($scope.filter.channelTag==null || $scope.filter.channelTag.length==0)?'':$scope.filter.channelTag.join(',');
                message.compareD = $(".date-picker-single").val();
                var appName = ($scope.filter.server == null || $scope.filter.server.appName == undefined) ? '全服务器': $scope.filter.server.appName;
                var allianceName = ( $scope.filter.channel == null || $scope.filter.channel.allianceName == undefined)? '全渠道' : $scope.filter.channel.allianceName;
                var appSvrAlicAtr = message.compareD +'-' + appName + '-' + allianceName + '-' + message.channelTag + '-';
                var calSuccess = function(data, status, headers, config){
                    if($scope.retCmp){
                        var retCmp = $scope.retCmp;
                    }else{
                        var retCmp = data.payment;
                        $scope.retCmp = data.payment;
                    }
                    var e_data = [];
                    _.each(retCmp,function(item){
                        switch(methodCompare){
                            case 'gameDeviceCount':
                                e_data.push([item.time,item.data.result.visitGameDeviceCount]);
                            break;
                            case 'gameUidCount':
                                e_data.push([item.time,item.data.result.visitGameUidCount]);
                            break;
                            case 'pfDeviceCount':
                                e_data.push([item.time,item.data.result.visitPfDeviceCount]);
                            break;
                            case 'pfUidCount':
                                e_data.push([item.time,item.data.result.visitPfUidCount]);
                            break;
                            default:
                                console.log('传入参数有误，请确认参数正确后重试')
                            break;
                        }
                    });
                    switch(methodCompare){
                        case 'gameDeviceCount':
                            statsPlantFormRetCompareChart.dispose();
                            statsPlantFormRetCompareChart =  echartsService.line('statsPlantFormRetCompare', '平台留存对比表'); 
                            legendData.push(appSvrAlicAtr + '留存游戏设备数');
                            seriesData.push({
                                name:appSvrAlicAtr + '留存游戏设备数',
                                type:'line',
                                symbol:'none',
                                data: e_data
                            })
                        break;
                        case 'gameUidCount':
                            statsPlantFormRetCompareChart.dispose();
                            statsPlantFormRetCompareChart =  echartsService.line('statsPlantFormRetCompare', '平台留存对比表'); 
                            legendData.push(appSvrAlicAtr + '留存游戏账号数');
                            seriesData.push({
                                name:appSvrAlicAtr + '留存游戏账号数',
                                type:'line',
                                symbol:'none',
                                data: e_data
                            });
                        break;
                        case 'pfDeviceCount':
                            statsPlantFormRetCompareChart.dispose();
                            statsPlantFormRetCompareChart =  echartsService.line('statsPlantFormRetCompare', '平台留存对比表'); 
                            legendData.push(appSvrAlicAtr + '留存平台设备数');
                            seriesData.push({
                                name:appSvrAlicAtr + '留存平台设备数',
                                type:'line',
                                symbol:'none',
                                data: e_data
                            });
                        break;
                        case 'pfUidCount':
                            statsPlantFormRetCompareChart.dispose();
                            statsPlantFormRetCompareChart =  echartsService.line('statsPlantFormRetCompare', '平台留存对比表'); 
                            legendData.push(appSvrAlicAtr + '留存平台账号数');
                            seriesData.push({
                                name:appSvrAlicAtr + '留存平台账号数',
                                type:'line',
                                symbol:'none',
                                data: e_data
                            });
                        break;
                        default:
                            console.log('传入参数有误，请确认参数正确后重试')
                        break;
                    };
                    //删除已经重复进入的数据
                    for(var i = 0;i < legendData.length -1;i++){
                        if(legendData[legendData.length - 1] == legendData[i]){
                            legendData.splice(legendData.length - 1,1);
                            seriesData.splice(seriesData.length - 1,1);
                        }
                    };
                    statsPlantFormRetCompareChart.setOption({
                            //图例
                            legend: {
                                data: legendData
                            },
                            //工具条
                            toolbox: {
                                show: true,
                                feature: { saveAsImage: {} }
                            },
                            //缩放
                            dataZoom : {
                                show : true,
                                realtime : true,
                                type:'inside'
                            },
                            xAxis: {
                                type: 'time'
                            },
                            yAxis: [
                                {
                                    type: 'value'
                                }                       
                            ],
                            series: seriesData
                        });
                    
                    spinner.spin();
                };
                var calError = function(data, status, headers, config) {
                    console.log(status);
                    spinner.spin();
                };
                if($scope.retCmp){
                    calSuccess();
                }else{
                    $http({
                        method : 'GET',
                        url : '/gmtool' + requires.STATS_PLANTFORM_RETRNTION_COMP,
                        params : message
                    }).success( calSuccess ).error( calError );
                }   
            };
            //切换显示
            $scope.compareSlc = function(str){
                $scope.methodCompare = str;
                $scope.PlantformRetCompare();

            }
            setTimeout(function() {
                $scope.PlantformRetCompare();
                $scope.PlantformRetention();
            }, $scope.reqDelay);
}]);

//style controll 
$(function(){

});