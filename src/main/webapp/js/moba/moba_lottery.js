app.controller('mobaLotteryCtrl', 
        ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants','$sessionStorage',
        function($scope, $http, $location, $cookieStore, echartsService, uiGridConstants,$sessionStorage){	
            $scope.ciyuan = {channel: {}, alliance: {} };
            var serAlicDic = $scope.ciyuanSerAlicDic;
            //拉取祈愿字典
            function getLotteryDic(){
                 var resArr = [[],[]]; //创建一个存储用二维数组  id , 中文名
                (function(){
                    var message = $scope.message;
                    message.typeCode = 'lottery';
                    var calSuccess = function(data, status, headers, config){ 
                    if(data.result == 0){
                        var packageDic = data.data.mapList;
                    }else{
                        console.log('拉取礼包字典失败，请刷新后重试:');
                        return false;
                    }
                    _.each(packageDic,function(item){
                        resArr[0].push(item.code);   //放置ID
                        resArr[1].push(item.name);
                    })
                    };
                    var calError = function(data, status, headers, config){
                        console.log('拉取礼包字典失败，请刷新后重试:' + status);
                    }
                    $http({
                        method : 'GET',
                        url : '/gmtool' + requires.MOBA_GET_GOODS_DIC,
                        params : message
                    }).success( calSuccess ).error( calError );
                })();
                return resArr;
            }
            var lotteryDic = getLotteryDic();
             //初始化表格
            $scope.gridNum = {
                treeRowHeaderAlwaysVisible: false,
                enableRowSelection: false,
                enableGridMenu: true,
                enableSelectAll: true,
                exporterMenuPdf: false,
                exporterOlderExcelCompatibility: true,
                onRegisterApi: function(gridApi) {
                    $scope.gridNum = gridApi;
                }
            };
            $scope.gridReward = {
                treeRowHeaderAlwaysVisible: false,
                enableRowSelection: false,
                enableGridMenu: true,
                enableSelectAll: true,
                exporterMenuPdf: false,
                exporterOlderExcelCompatibility: true,
                onRegisterApi: function(gridApi) { 
                    $scope.gridReward = gridApi;
                }
            };
            $scope.export = function() {
               var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
                $scope.gridNum.exporter.csvExport( 'all', 'all', myElement );
                $scope.gridReward.exporter.csvExport( 'all', 'all', myElement );
            };
            $scope.lottery = function(message) {
                message.reason = 40;
                 $scope.gridNum.columnDefs = [
                    {field: '日期',sort: {
                        direction: 'desc', priority: 1 
                    }},
                    {field: '祈愿次数'},
                    {field: '祈愿消费', aggregationType: uiGridConstants.aggregationTypes.avg, aggregationHideLabel: true}
                ];
                var calSuccess = function(data, status, headers, config) {
                    var lotteryData = data.data;
                    var gridData = [];
                    if(message.server){
                         $scope.gridNum.columnDefs.splice(1,0,{field: '服务器'});
                    };
                    if(message.channel){
                        $scope.gridNum.columnDefs.length > 5 ? $scope.gridNum.columnDefs.splice(2,0,{field: '渠道'}) :
                        $scope.gridNum.columnDefs.splice(1,0,{field: '渠道'});
                    } 
                    $scope.gridNum.exporterCsvFilename = message.startD + '至' + message.endD + '祈愿消费数据' + '.csv';
                    
                    _.each(lotteryData, function(item) {
                        var gData = {
                             "日期": item.time,
                             "祈愿次数": item.count,
                             '祈愿消费' : item.totalcost
                        };
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
                        gridData.push(gData);
                    });
                    $scope.gridNum.data = gridData;
                    spinner.spin();
                };
                
                var calError = function(data, status, headers, config) {
                    console.log(status);
                    spinner.spin();
                };

            	$http({
                    method : 'GET',
                    url : '/gmtool' + requires.MOBA_GET_DIAMOND_COST,
                    params : message
                }).success( calSuccess ).error( calError );  

                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
        };
        $scope.acquire = function(message){
            $scope.gridReward.columnDefs = [
                 {field: '日期',sort: {
                    direction: 'desc', priority: 1 
                }},
                {field: '奖品名称',grouping:{groupPriority:0},
                    sort: {
                        direction: 'desc', priority: 0 
                }},
                {field: '奖品数量', aggregationType: uiGridConstants.aggregationTypes.avg, aggregationHideLabel: true}
            ] 
            var calSuccess = function(data, status, headers, config){
                var acquireData = data.data;
                var gridData = [];
                if(message.server){
                     $scope.gridReward.columnDefs.splice(1,0,{field: '服务器'});
                };
                if(message.channel){
                    $scope.gridReward.columnDefs.length > 5 ? $scope.gridReward.columnDefs.splice(2,0,{field: '渠道'}) :
                    $scope.gridReward.columnDefs.splice(1,0,{field: '渠道'});
                } 
                $scope.gridReward.exporterCsvFilename = message.startD + '至' + message.endD + '祈愿获得数据' + '.csv';
                _.each(acquireData,function(item){
                    var gData = {
                             "日期": item.time,
                             '奖品数量' : item.itemNum
                        };
                    for(var i = 0;i < lotteryDic[0].length;i++){
                        (function(i){
                            if(lotteryDic[0][i] == item.itemId){
                                gData['奖品名称']  = lotteryDic[1][i];   
                            }
                        })(i)
                    };    
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
                    gridData.push(gData);
                })
                $scope.gridReward.data = gridData;
            };
            var calError = function(data, status, headers, config){
                console.log(status);
            };
            $http({
                method : 'GET',
                url : '/gmtool' + requires.MOBA_GET_LOTTERY,
                params : message
            }).success( calSuccess ).error( calError );  
        };
        $scope.calfnc = function(){
            var message = $scope.message;
            message.server = ($scope.ciyuan.server == null || $scope.ciyuan.server.length == undefined) ? '': $scope.ciyuan.server;
            message.channel =  ($scope.ciyuan.alliance==null || $scope.ciyuan.alliance.length== undefined) ? '': $scope.ciyuan.alliance.join(',');
            message.startD = $(".date-picker-star").val() + '+ 00:00:00';
            message.endD = $(".date-picker-end").val() + '+ 23:59:59';
            $scope.lottery(message);
            $scope.acquire(message);
        };
         setTimeout(function() {
            $scope.calfnc();
        }, $scope.reqDelay);
}]);

//style controll 
$(function(){

});