app.controller('statsRetention', 
        ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants','$sessionStorage',
        function($scope, $http, $location, $cookieStore, echartsService,uiGridConstants,$sessionStorage){  
            $scope.hideGrid = $sessionStorage.excelShow;
            $scope.$watch('hideGrid',function(){
                $sessionStorage.excelShow = $scope.hideGrid;
            });
            var statsRetentionChart = echartsService.line('statsRetentionChart', '留存统计');;
            $scope.filter = {channel: '', server: '', time: ''};
            
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
                var message = $scope.message;
                message.containerName =  $scope.filter.server == null?  '': $scope.filter.server.containerValue;
                message.channel = $scope.filter.channel==null ? '': $scope.filter.channel.chnValue;
                message.channelTag = ($scope.filter.channelTag==null || $scope.filter.channelTag.length==0) ? '' : $scope.filter.channelTag.join(',');
                message.startD = $(".date-picker-star").val();
                message.endD = $(".date-picker-end").val();
                //图表 图例
                var lengedData = [];
                //渠道转为数组
                var tara = []
                if(message.channelTag){
                    tara = message.channelTag.split(','); //字符串转数组
                };
                //表头
                $scope.gridOptions.columnDefs = [{field: '留存人数'},{field: '游戏次数'},{field: '游戏时长'}];  
                if(message.containerName){
                    $scope.gridOptions.columnDefs.push({field: '服务器'});
                    lengedData.push($scope.filter.server.containerName);
                }else{
                     lengedData.push('全服务器');
                };
                if(message.channel){
                    $scope.gridOptions.columnDefs.splice(1,0,{field: '渠道'});
                    lengedData.push($scope.filter.channel.chnName);
                }else{
                     lengedData.push('全渠道');
                };
                if(message.channelTag){
                    $scope.gridOptions.columnDefs.splice(2,0,{field: '子渠道'});
                    tara.length == 1 ? lengedData.push($scope.filter.channelTag.channeltagName) : lengedData; 
                }else{
                     lengedData.push('全子渠道');
                };
                //重绘图表
                if (statsRetentionChart == null) {
                    statsRetentionChart = echartsService.line('statsRetentionChart', '留存统计');
                }else{
                    statsRetentionChart.dispose();
                    statsRetentionChart = echartsService.line('statsRetentionChart', '留存统计');
                }
                var calSuccess = function(data, status, headers, config) {
                    var dailynew = data.dailynew;
                    var gridData = [];
                    var _retNum = [];   //留存人数
                    var _gameCnt = [];  //游戏次数
                    var _gameTime = [];  //游戏时长
                    //下载表头
                    $scope.gridOptions.exporterCsvFilename = message.startD + '至' + message.endD + '留存统计表' + '.csv';
                    //grid数据
                    _.each(dailynew, function(item) {
                        var gData = {
                            '留存人数': item.newRole,
                            '游戏次数': item.gameCnt,
                            '游戏时长' : item.gameTime
                        };
                        if(message.containerName){
                            gData['服务器'] = item.containerName;
                        };
                        if(message.channel){
                            gData['渠道'] = item.channel;
                        };
                        if(message.channelTag){
                            gData['子渠道'] = item.channelTag;
                        };
                        gridData.push(gData);              
                        //echarts data
                        if(tara.length <= 1){
                            _retNum.push([item.dateInfo,item.newRole]);
                            _gameCnt.push([item.dateInfo,item.gameCnt]);
                            _gameTime.push([item.dateInfo,item.gameTime]);
                        }
                    });
                    $scope.gridOptions.data = gridData;
                    //绘制图表   
                    if(tara.length <= 1){
                        var str = lengedData.join('-');
                        statsRetentionChart.setOption({ 
                            legend: { 
                                selected:{
                                    [str + '游戏时长']:false,
                                    [str + '游戏次数']:false
                                },
                                data: [str + '留存人数',str + '游戏时长',str + '游戏次数']
                            },
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
                                {   
                                    type: 'value'
                                },
                                {
                                    name: str + '游戏时长',
                                    nameLocation: 'end',
                                    type: 'value',
                                    show : false,
                                },
                                {
                                    name: str + '游戏次数',
                                    nameLocation: 'end',
                                    type: 'value',
                                    position: 'right',
                                    offset: 75,
                                    show : false,
                                }
                            ],
                            series: [
                            {
                                name: str + '留存人数',
                                type:'line',
                                data:_retNum
                            },
                            {
                                name: str + '游戏时长',
                                type:'line',
                                data:_gameCnt
                            },
                            {
                                name: str + '游戏次数',
                                type:'line',
                                data:_gameTime
                            }]
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
                    url : '/gmtool' + requires.STATS_NEWROLE_DAYGAMETIME,
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