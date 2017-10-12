    app.controller('mobaDailyTask', 
        ['$scope', '$http', '$location', '$cookieStore', 'echartsService','uiGridConstants','$sessionStorage',
        function($scope, $http, $location, $cookieStore, echartsService,$sessionStorage){      
            $scope.ciyuan = {channel: {}, alliance: {} };          
            //拉取任务字典
            var heroDicArrage = [];
            var serAlicDic = $scope.ciyuanSerAlicDic;
            function getTsakDic(){
                var resArr = []; //创建一个存储用二维数组  id , 中文名
                (function(){
                    var message = $scope.message;
                    message.taskType = '9';
                    var calSuccess = function(data, status, headers, config){ 
                    if(data.result == 0){
                        var taskDic = data.data.taskList;
                    }else{
                        console.log('拉取任务字典失败，请刷新后重试:');
                        return false;
                    }
                    _.each(taskDic,function(item){
                       resArr.push({'taskValue':item.taskCode,'taskName':item.taskName})
                    })
                    };
                    var calError = function(data, status, headers, config){
                        console.log('拉取任务字典失败，请刷新后重试:' + status);
                    }
                    $http({
                        method : 'GET',
                        url : '/gmtool' + requires.MOBA_GET_TSAK_DI,
                        params : message
                    }).success( calSuccess ).error( calError );
                })();
                return resArr;
            };
            $scope.dailyTaskDic = getTsakDic();
            //表格声明
            $scope.gridOptions = {
                columnDefs: $scope.columns,
                treeRowHeaderAlwaysVisible: false,
                enableRowSelection: false,
                showGridFooter: true,
                showColumnFooter: true,
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

            $scope.dailyTask = function(){
                var message = $scope.message;
                message.server = ($scope.ciyuan.server == null || $scope.ciyuan.server.length == undefined) ? '': $scope.ciyuan.server;
                message.channel =  ($scope.ciyuan.alliance==null || $scope.ciyuan.alliance.length== undefined) ? '': $scope.ciyuan.alliance.join(',');
                message.startD = $(".date-picker-star").val() + '+00:00:00';
                message.endD = $(".date-picker-end").val() + '+23:59:59';
                message.taskCode = $('#taskCode').val();
                //初始化表格表头

                $scope.gridOptions.columnDefs = [
                    {field: '日期',width:'10%',sort: {
                            direction: 'desc', priority: 0 
                        }}
                ];
                for(var i = 0;i < $scope.dailyTaskDic.length;i++){
                    $scope.gridOptions.columnDefs.push({field:'' + $scope.dailyTaskDic[i].taskName + '',width:'10%'});
                }
                if(message.server){
                    $scope.gridOptions.columnDefs.splice(1,0, {field: '服务器',width:'8%'})
                };
                if(message.channel){
                    $scope.gridOptions.columnDefs.length > 10 ? $scope.gridOptions.columnDefs.splice(2,0,{field: '渠道',width:'10%'}) :
                    $scope.gridOptions.columnDefs.splice(1,0,{field: '渠道',width:'10%'});
                };               
                var calSuccess = function(data, status, headers, config) {
                    if(data.result == 0){
                        var heroData = data.data;
                    }else{
                        console.log('调取接口失败，请确认服务器状态');
                        return false;
                    }
                    var gridData = [];
                    var tara = {};
                    //下载表名
                    $scope.gridOptions.exporterCsvFilename = message.startD + '至' + message.endD + '每日任务数据统计表.csv';
                    _.each(heroData, function(item){                       
                        var gData = {};
                        gData['日期'] = item.time;
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
                        for(var i = 0;i < $scope.dailyTaskDic.length;i++){
                            (function(i){
                               if($scope.dailyTaskDic[i].taskValue == item.taskId){
                                    gData[''+ $scope.dailyTaskDic[i].taskName +''] = item.allNum;
                                }
                            })(i);   
                        }
                        //这么做的依据是json数据时间按照顺序排列 
                        if(tara['日期'] == gData['日期']){
                            delete gData['日期'];
                            $.extend(gridData[gridData.length -1], gData);
                        }else{
                            tara = gData;
                            gridData.push(gData);
                        }
                    });                                    
                    $scope.gridOptions.data = gridData;
                    spinner.spin();
                }
                var calError = function(data, status, headers, config) {
                    console.log(status);
                    spinner.spin();
                };
                
                $http({
                    method : 'GET',
                    url : '/gmtool' + requires.MOBA_GET_DAILY_TASK,
                    params : message
                }).success( calSuccess ).error( calError );
                
                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
            };
            setTimeout(function() {
                $scope.dailyTask();
            }, $scope.reqDelay);
    }]);


//style controll 
$(function(){

});