    app.controller('battleAverage', 
        ['$scope', '$http', '$location', '$cookieStore', 'echartsService','uiGridConstants','$sessionStorage',
        function($scope, $http, $location, $cookieStore, echartsService,$sessionStorage){      
            $scope.ciyuan = {channel: {}, alliance: {} };          
            //拉取英雄字典
            var gameMapDic = [];
            var serAlicDic = $scope.ciyuanSerAlicDic;
            function getMapDic(){
                var resArr = []; //创建一个存储用二维数组  id , 中文名
                (function(){
                    var message = $scope.message;
                    var calSuccess = function(data, status, headers, config){ 
                    if(data.result == 0){
                        var mapDic = data.data.mapList;
                    }else{
                        console.log('拉取地图字典失败，请刷新后重试:');
                        return false;
                    }
                    _.each(mapDic,function(item){
                        resArr.push({'mapValue':item.code,'mapName':item.name});
                    })
                    };
                    var calError = function(data, status, headers, config){
                        console.log('拉取地图字典失败，请刷新后重试:' + status);
                    }
                    $http({
                        method : 'GET',
                        url : '/gmtool' + requires.MABA_GET_MAP_DIC,
                        params : message
                    }).success( calSuccess ).error( calError );
                })();
                return resArr;
            };
            $scope.gameMapDic = getMapDic();
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

            $scope.battleAverage = function(){
                var message = $scope.message;
                message.server = ($scope.ciyuan.server == null || $scope.ciyuan.server.length == undefined) ? '': $scope.ciyuan.server;
                message.channel =  ($scope.ciyuan.alliance==null || $scope.ciyuan.alliance.length== undefined) ? '': $scope.ciyuan.alliance.join(',');
                message.startD = $(".date-picker-star").val() + '+00:00:00';
                message.endD = $(".date-picker-end").val() + '+23:59:59';
                message.mapId = $('#mapId').val();
                //初始化表格表头
                $scope.gridOptions.columnDefs = [
                    {field: '日期',width:'10%',sort: {
                            direction: 'desc', priority: 0 
                        }},                   
                    {field: '场次',width:'10%'},
                    {field: '场均补兵数',width:'10%'},
                    {field: '场均击杀小龙',width:'10%'},
                    {field: '场均击杀大龙',width:'10%'},
                    {field: '场均击杀',width:'10%'},
                    {field: '场均助攻数',width:'10%'},
                    {field: '场均被击杀',width:'10%'},
                    {field: '场均英雄等级',width:'10%'},
                    {field: '场均造成伤害',width:'10%'},
                    {field: '场均承受伤害',width:'10%'},
                    {field: '场均获得金币',width:'10%'},
                    {field: '场均使用金币',width:'10%'},
                    {field: '场均回城',width:'10%'},
                    {field: '场均击杀红BUFF',width:'12%'},
                    {field: '场均击杀蓝BUFF',width:'12%'},
                    {field: '场均插眼',width:'10%'},
                    {field: '场均回血',width:'10%'},
                    {field: '场均游戏时长（分）',width:'12%'}
                ];
                if(message.server){
                    $scope.gridOptions.columnDefs.splice(1,0, {field: '服务器',width:'10%'})
                };
                if(message.channel){
                    $scope.gridOptions.columnDefs.length > 18 ? $scope.gridOptions.columnDefs.splice(2,0,{field: '渠道',width:'10%'}) :
                    $scope.gridOptions.columnDefs.splice(1,0,{field: '渠道'});
                };              
                var calSuccess = function(data, status, headers, config) {
                    if(data.result == 0){
                        var battleInfo = data.data;
                    }else{
                        console.log('调取接口失败，请确认服务器状态');
                        return false;
                    }
                    var gridData = [];
                    //下载表名
                    $scope.gridOptions.exporterCsvFilename = message.startD + '至' + message.endD + '场内数据统计表.csv';
                    _.each(battleInfo, function(item){
                        //给grid的数据
                        var gData = {
                            '日期' : item.time,
                            '场次':item.count,
                            '场均补兵数' : item.totalKillSoldierCount,
                            '场均击杀小龙' : item.smalldrogonBeKilled,
                            '场均击杀大龙' : item.bigdrogonBeKilled,
                            '场均击杀' : item.killCount,
                            '场均助攻数' : item.assistCount,
                            '场均被击杀' : item.beKilledCount,
                            '场均英雄等级' : item.herolv,
                            '场均造成伤害' : item.damageTotal,
                            '场均承受伤害' : item.beHurtTotal,
                            '场均获得金币' : item.totalMoney,
                            '场均使用金币' : item.totalUse,
                            '场均回城': item.backhome,
                            '场均击杀红BUFF' : item.redbufferBeKilled,
                            '场均击杀蓝BUFF' : item.bulebufferBeKilled,
                            '场均插眼' : item.eyeBorn,
                            '场均回血' : item.useHppotion,
                            '场均游戏时长（分）': new Number(item.alltime/60).toFixed(2) 
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
                    $scope.gridOptions.data = gridData;
                    spinner.spin();
                }
                var calError = function(data, status, headers, config) {
                    console.log(status);
                    spinner.spin();
                };
                
                $http({
                    method : 'GET',
                    url : '/gmtool' + requires.MABA_GET_BATTLE_AVE,
                    params : message
                }).success( calSuccess ).error( calError );
                
                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
            };
            setTimeout(function() {
                $scope.battleAverage();
            }, $scope.reqDelay);
    }]);


//style controll 
$(function(){

});