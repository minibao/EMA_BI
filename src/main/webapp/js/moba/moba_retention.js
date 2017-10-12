app.controller('mobaRetention', 
        ['$scope', '$http', '$location', '$cookieStore', 'echartsService', '$sessionStorage',
        function($scope, $http, $location, $cookieStore, echartsService,$sessionStorage){
            $scope.ciyuan = {server: {}, alliance:{}};
            //显示/隐藏 表格   
            $scope.hideGrid = $sessionStorage.excelShow;
            $scope.$watch('hideGrid',function(){
                $sessionStorage.excelShow = $scope.hideGrid;
            })
            //sever alliance 字典
            var serAlicDic = $scope.ciyuanSerAlicDic;
            var mobaRetentionChart = echartsService.line('mobaRetentionChart', '留存统计');
            //留存字典
            $scope.retentionFilter = [{dictValue: 1, dictName: '次日'},
                                      {dictValue: 2, dictName: '2日'},
                                      {dictValue: 3, dictName: '3日'},
                                      {dictValue: 4, dictName: '4日'},
                                      {dictValue: 5, dictName: '5日'},
                                      {dictValue: 6, dictName: '6日'},
                                      {dictValue: 7, dictName: '7日'},
                                      {dictValue: 15, dictName: '15日'},
                                      {dictValue: 30, dictName: '30日'}];
            $scope.filter = {reday: [{dictValue: 1, dictName: '次日'}]};
            
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
                message.server = ($scope.ciyuan.server == null || $scope.ciyuan.server.length == undefined) ? '': $scope.ciyuan.server;
                message.channel =  ($scope.ciyuan.alliance==null || $scope.ciyuan.alliance.length== undefined) ? '': $scope.ciyuan.alliance.join(',');
                message.startD = $(".date-picker-star").val() + '+00:00:00';
                message.endD = $(".date-picker-end").val() + '+23:59:59';	
                message.returnDays = sun;
                var calSuccess = function(data, status, headers, config) {
                    var retentions = data.data;
                    var gridData = [];
                    var lengedData = [];
                    var seriesData = [];
                    var echartData = new Array();  //创建二维数组
                    for(var k=0;k<10;k++){    
                        echartData[k] = new Array(); 
                        for(var j = 0;j < 1;j++){   
                            echartData[k][j] = "";   
                        }
                    }
                    //储存遍历点
                    var tara =  sun.split(',');
                    tara.splice(0,1);
                    //定义比较对象
                    var compGData = {};
                    //定义新增数组
                    var resData = []; 
                    //表头定义
                    $scope.gridOptions.columnDefs = [
                        {field:'日期',width:'10%',sort: {
                            direction: 'desc', priority: 0 
                        }},
                        {field:'新增人数',width:'10%'}
                    ];
                    if(message.server){
                        $scope.gridOptions.columnDefs.splice(1,0, {field: '服务器',width:'10%'})
                    };
                    if(message.channel){
                        $scope.gridOptions.columnDefs.length > 2 ? $scope.gridOptions.columnDefs.splice(2,0,{field: '渠道',width:'10%'}) :
                        $scope.gridOptions.columnDefs.splice(1,0,{field: '渠道',width:'10%'});
                    };
                    for(var i = 0;i < tara.length;i++){
                        var str = tara[i];
                        if(str == 1) str = '次';
                       $scope.gridOptions.columnDefs.push({ field:''+str+'日留存',width:'15%',visible:false},
                        { field:''+str+'日留存率',width:'15%'});
                    }
                    //下载表名    
                    $scope.gridOptions.exporterCsvFilename = message.startD + '至' + message.endD + '留存统计表'
                    //图表数据处理  
                    _.each(retentions, function(item) {
                        var gData = {};
                        gData['日期']  = item.regDate;
                        if(message.server){
                                for(var i = 0;i < serAlicDic.service[0].length;i++){
                                   (function(i){
                                        if(serAlicDic.service[0][i] == item.server){
                                             gData['服务器']  = serAlicDic.service[1][i];
                                        }
                                    })(i);
                                }
                            };
                            if(message.channel){
                                for(var i = 0;i < serAlicDic.alliance[0].length;i++){
                                   (function(i){
                                        if(serAlicDic.alliance[0][i] == item.alliance){
                                             gData['渠道']  = serAlicDic.alliance[1][i];
                                        }
                                    })(i);
                                }
                            }; 
                        //新增数据储存
                        if(item.returnDay == 0){
                            resData.push([item.regDate,item.uidCount]);
                            gData['新增人数'] = item.uidCount;
                        }else{
                            //存储留存数据
                            for(var i = 0;i < tara.length;i++){
                                var str = tara[i];
                                if(str == 1) str = '次';
                                if(item.returnDay == tara[i]){
                                    gData[''+ str +'日留存']  = item.uidCount;
                                    gData[''+ str +'日留存率']  = item.uidCount;  //下方算法重置
                                }
                            }; 
                        }
                        //这么做的依据是json数据时间按照顺序排列 
                            if(compGData['日期'] == gData['日期']){
                                delete gData['日期'];
                                $.extend(gridData[gridData.length -1], gData);
                            }else{
                                compGData = gData;
                                gridData.push(gData);
                            } 
                    });
                    _.each(gridData,function(item){
                        (function(item){
                            for (var i = 0; i < resData.length; i++) {
                                if(resData[i][0] == item['日期']){
                                    (function(i){
                                        for(var j = 0;j < tara.length;j++){
                                            var str = tara[j];
                                            if(str == 1) str = '次';
                                            if(item[''+ str +'日留存率']){
                                                item[''+ str +'日留存率']  = (item[''+ str +'日留存率']/resData[i][1]).toFixed(4);
                                                //echarts 数据
                                                echartData[j].push([item['日期'],item[''+ str +'日留存率']]);
                                            } 
                                        }
                                    })(i)
                                }  
                            };
                        })(item)
                    })     
                    $scope.gridOptions.data = gridData;
                    //echarts data
                    for(var i = 0;i < tara.length;i++){
                        var string = tara[i]
                        if(string == 1) string = '次'
                        var str = string + '日留存率';
                        lengedData.push(str);
                        seriesData.push({
                            name:str,
                            type:'line',
                            data:echartData[i]
                        })
 
                    }; 
                    if (mobaRetentionChart == null){
                        mobaRetentionChart = echartsService.line('mobaRetentionChart', '留存统计');
                    }else{
                        mobaRetentionChart.dispose();
                        mobaRetentionChart = echartsService.line('mobaRetentionChart', '留存统计');
                    }
                    //单渠道 显示图表
                    if(message.channel.split(',').length < 2){
                        mobaRetentionChart.setOption({
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
                                { type: 'value' }
                            ],
                            series: seriesData
                        }); 
                    }else{
                        //初始化表格
                        if(mobaRetentionChart) {
                            mobaRetentionChart.dispose();
                            mobaRetentionChart = echartsService.line('mobaRetentionChart', '留存统计');
                        }
                    }
                    spinner.spin();
                };
                var calError = function(data, status, headers, config) {
                    console.log(status)
                    spinner.spin();
                };
                
                $http({
                    method : 'GET',
                    url : '/gmtool' + requires.MOBA_GET_RETENTION,
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