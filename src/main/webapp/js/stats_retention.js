app.controller('statsRetention', 
        ['$scope', '$http', '$location', '$cookieStore', 'echartsService','$sessionStorage', 
        function($scope, $http, $location, $cookieStore, echartsService,$sessionStorage){  
            $scope.hideGrid = $sessionStorage.excelShow;
            $scope.$watch('hideGrid',function(){
                $sessionStorage.excelShow = $scope.hideGrid;
            });
            var statsRetentionChart = echartsService.line('statsRetentionChart', '留存统计');;
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
                onRegisterApi: function(gridApi) { 
                    $scope.gridApi = gridApi;
                }
            };
            
            $scope.export = function() {
                var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
                $scope.gridApi.exporter.csvExport( 'all', 'all', myElement );
            };            
            $scope.retention = function(){
                var sun = (function (){
                    var arr = $scope.filter.reday;
                    if (arr.length == 0)
                        return '0,1';
                    var tol = ['0'];
                    for(var i = 0;i < arr.length;i++){
                        tol.push(arr[i].dictValue);
                    };
                    return tol.join(','); 
                })();

                var message = $scope.message;
                message.containerName =  $scope.filter.server==null?'':$scope.filter.server.containerValue;
                message.channel = $scope.filter.channel==null?'':$scope.filter.channel.chnValue;
                message.channelTag = ($scope.filter.channelTag==null || $scope.filter.channelTag.length==0)?'':$scope.filter.channelTag.join(',');
                message.startD = $(".date-picker-star").val();
                message.endD = $(".date-picker-end").val();	
                message.reday = sun;
                //储存遍历点
                var tara =  sun.split(',');
                tara.splice(0,1);
                //表名
                $scope.gridOptions.exporterCsvFilename = message.startD + '至' + message.endD + '留存统计表' + '.csv';
                //表头
                $scope.gridOptions.columnDefs = [
                    {field: '日期', width: '10%' ,sort: {
                            direction: 'desc', priority: 0 
                        }}
                ];
                if(message.containerName){
                   $scope.gridOptions.columnDefs.push({
                        field: '服务器',
                        width: '10%'
                    }) 
                };
                if(message.channel){
                    $scope.gridOptions.columnDefs.push({
                        field: '渠道',
                        width: '10%'
                    })
                };
                if(message.channelTag){
                    $scope.gridOptions.columnDefs.push({
                        field: '子渠道',
                        width: '10%'
                    })
                };
                $scope.gridOptions.columnDefs.push({
                    field: '当日新增',
                    width: '10%'
                })
                //留存放入
                for(var i = 0;i < tara.length;i++){
                    var str = tara[i];
                    if(str == 1) str = '次';
                    $scope.gridOptions.columnDefs.push({ field:''+str+'日留存数',width:'15%',visible:false},
                    { field:''+str+'日留存率',width:'15%'});
                }
                var calSuccess = function(data, status, headers, config) {
                    var retentions = data.retentions;
                    var gridData = [];
                    var fileName = [];
                    var seriesData = [];
                    var lengedData = [];
                    var newRole = [];
                    var rNum1 = [];   //次日留存 以下类推    
                    var rNum2 = [];
                    var rNum3 = [];
                    var rNum4 = [];
                    var rNum5 = [];
                    var rNum6 = [];
                    var rNum7 = [];
                    var rNum15 = [];
                    var rNum30 = [];
                    //渠道转为数组
                    var tagArr = []
                    if(message.channelTag){
                        var tagArr = message.channelTag.split(','); //字符串转数组
                    };                      
                    _.each(retentions, function(item) {
                        //excel表格
                        var gdata = {"日期": item.dateInfo,'当日新增':item.newRole};
                        if(message.containerName){
                            gdata['服务器'] = item.containerName; 
                        };
                        if(message.channel){
                            gdata['渠道'] = item.channel;
                        };
                        if(message.channelTag){
                            gdata['子渠道'] = item.channelTag;
                        };
                        //循环留存选择
                        (function(item){
                            for(var i = 0;i < tara.length;i++){
                                var str = tara[i];
                                if(str == 1) str = '次';                               
                                var reNum = eval("item.reNum" + tara[i]);
                                var rePercent = eval("item.rePercent" + tara[i]);
                                if(reNum){
                                    gdata[str + '日留存数'] = reNum;
                                    gdata[str + '日留存率'] = rePercent;
                                };
                            }
                        })(item);
                        gridData.push(gdata);
                        //图数据  当不选子渠道或者子渠道为1个时出现图
                        if(tagArr.length < 2){
                        	newRole.push([item.dateInfo, item.newRole]);
                            if(!(item.rePercent1 == undefined || item.rePercent1 == '')){
                                rNum1.push([item.dateInfo, item.rePercent1]);
                            };
                            if(!(item.rePercent2 == undefined || item.rePercent2 == '')){
                                rNum2.push([item.dateInfo, item.rePercent2]);
                            };                            
                            if(!(item.rePercent3 == undefined || item.rePercent3 == '')){
                                rNum3.push([item.dateInfo, item.rePercent3]);
                            };
                            if(!(item.rePercent4 == undefined || item.rePercent4 == '')){
                                rNum4.push([item.dateInfo, item.rePercent4]);
                            };
                            if(!(item.rePercent5 == undefined || item.rePercent5 == '')){
                                rNum5.push([item.dateInfo, item.rePercent5]);
                            };
                            if(!(item.rePercent6 == undefined || item.rePercent6 == '')){
                                rNum6.push([item.dateInfo, item.rePercent6]);
                            };
                            if(!(item.rePercent7 == undefined || item.rePercent7 == '')){
                                rNum7.push([item.dateInfo, item.rePercent7]);
                            };
                            if(!(item.rePercent15 == undefined || item.rePercent15 == '')){
                                rNum15.push([item.dateInfo, item.rePercent15]);
                            };
                            if(!(item.rePercent30 == undefined || item.rePercent30 == '')){
                                rNum30.push([item.dateInfo, item.rePercent15]);
                            };
                        }
                    });
                    lengedData.push('当日新增人数');
                    seriesData.push({
                        name: '当日新增人数',
                        type: 'line',
                        data: newRole
                    })
                    console.log(seriesData);
                    if(rNum1.length > 0){
                        lengedData.push('次日留存率');
                        seriesData.push({
                            name: '次日留存率',
                            type: 'line',
                            data: rNum1,
                            yAxisIndex: 1
                        })
                    };
                    if(rNum2.length > 0){
                        lengedData.push('二日留存率');
                        seriesData.push({
                            name: '二日留存率',
                            type: 'line',
                            data: rNum2,
                            yAxisIndex: 1
                        })
                    };
                    if(rNum3.length >0){
                        lengedData.push('三日留存率');
                        seriesData.push({
                            name: '三日留存率',
                            type: 'line',
                            data: rNum3,
                            yAxisIndex: 1
                        })
                    };
                    if(rNum4.length >0){
                        lengedData.push('四日留存率');
                    	seriesData.push({
                            name: '四日留存率',
                            type: 'line',
                            data: rNum4,
                            yAxisIndex: 1
                        })
                    };
                    if(rNum5.length >0){
                        lengedData.push('五日留存率');
                        seriesData.push({
                            name: '五日留存率',
                            type: 'line',
                            data: rNum5,
                            yAxisIndex: 1
                        })
                    };
                    if(rNum6.length >0){
                        lengedData.push('六日留存率');
                        seriesData.push({
                            name: '六日留存率',
                            type: 'line',
                            data: rNum6,
                            yAxisIndex: 1
                        })
                    };
                    if(rNum7.length >0){
                        lengedData.push('七日留存率');
                        seriesData.push({
                            name: '七日留存率',
                            type: 'line',
                            data: rNum7,
                            yAxisIndex: 1
                        })
                    };
                    if(rNum15.length >0){
                        lengedData.push('十五日留存率');
                        seriesData.push({
                            name: '十五日留存率',
                            type: 'line',
                            data: rNum15,
                            yAxisIndex: 1
                        })
                    };
                    if(rNum30.length >0){
                        lengedData.push('三十日留存率');
                        seriesData.push({
                            name: '三十日留存率',
                            type: 'line',
                            data: rNum30,
                            yAxisIndex: 1
                        })
                    };
                    $scope.gridOptions.data = gridData;

                    if (statsRetentionChart == null){
                        statsRetentionChart = echartsService.line('statsRetentionChart', '留存统计');
                    }else{
                       statsRetentionChart.dispose(); 
                       statsRetentionChart = echartsService.line('statsRetentionChart', '留存统计'); 
                    }
                    //绘制图标   
                    if(tagArr.length <= 1){
                        statsRetentionChart.setOption({
                            legend: { data: lengedData },
                            //显示工具条
                            toolbox: {
                                show: true,
                                feature: { saveAsImage: {} }
                            },
                            //缩放
                            dataZoom: {
                                show: true,
                                realtime: true,
                                type: 'inside'
                            },
                            xAxis: { type: 'time' },
                            yAxis: [
                                { type: 'value' },
                                {
                                    name: '百分比',
                                    nameLocation: 'end',
                                    type: 'value'
                                }
                            ],
                            series: seriesData
                        }); 
                    }
                    else{
                        if(statsRetentionChart) {
                            statsRetentionChart.dispose();
                            statsRetentionChart = echartsService.line('statsRetentionChart', '留存统计');
                        }
                    };
                    spinner.spin();
                };
                var calError = function(data, status, headers, config) {
                    console.log(status)
                    spinner.spin();
                };
                
                $http({
                    method : 'GET',
                    url : '/gmtool' + requires.STATS_RETENTION,
                    params : message
                }).success( calSuccess ).error( calError ); 
                
                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target); 
            };
        setTimeout(function() {
            $scope.retention();
        }, $scope.reqDelay); 
}]);

//style controll 
$(function(){

});