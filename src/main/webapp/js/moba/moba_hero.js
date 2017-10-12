    app.controller('mobaHero', 
        ['$scope', '$http', '$location', '$cookieStore', 'echartsService','uiGridConstants',
        function($scope, $http, $location, $cookieStore, echartsService){      
            $scope.ciyuan = {channel: {}, alliance: {} };          
            //拉取英雄字典
            var heroDicArrage = [];
            var serAlicDic = $scope.ciyuanSerAlicDic;
            function getHeroDic(){
                var resArr = [[],[]]; //创建一个存储用二维数组  id , 中文名
                (function(){
                    var message = $scope.message;
                    var calSuccess = function(data, status, headers, config){ 
                    if(data.result == 0){
                        var heroDic = data.data.heroList;
                    }else{
                        console.log('拉取英雄字典失败，请刷新后重试:');
                        return false;
                    }
                    _.each(heroDic,function(item){
                        resArr[0].push(item.code);   //放置ID
                        resArr[1].push(item.name);
                    })
                    };
                    var calError = function(data, status, headers, config){
                        console.log('拉取英雄字典失败，请刷新后重试:' + status);
                    }
                    $http({
                        method : 'GET',
                        url : '/gmtool' + requires.MOBA_GET_HERO_DIC,
                        params : message
                    }).success( calSuccess ).error( calError );
                })();
                return resArr;
            };
            heroDicArrage = getHeroDic();
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

            $scope.hero = function(){
                var message = $scope.message;
                message.server = ($scope.ciyuan.server == null || $scope.ciyuan.server.length == undefined) ? '': $scope.ciyuan.server;
                message.channel =  ($scope.ciyuan.alliance==null || $scope.ciyuan.alliance.length== undefined) ? '': $scope.ciyuan.alliance.join(',');
                message.startD = $(".date-picker-star").val() + '+00:00:00';
                message.endD = $(".date-picker-end").val() + '+23:59:59';
                message.buyType = $('#buyType').val();
                //初始化表格表头
                $scope.gridOptions.columnDefs = [
                    {field: '日期',sort: {
                            direction: 'desc', priority: 1 
                        }},
                    {field:'英雄名称',grouping:{groupPriority:0},sort: {
                            direction: 'desc', priority: 0 
                        }},
                    {field:'英雄销售数量'}
                ];
                if(message.server){
                    $scope.gridOptions.columnDefs.splice(1,0, {field: '服务器'})
                };
                if(message.channel){
                    $scope.gridOptions.columnDefs.length > 3 ? $scope.gridOptions.columnDefs.splice(2,0,{field: '渠道'}) :
                    $scope.gridOptions.columnDefs.splice(1,0,{field: '渠道'});
                };
                if(message.buyType != ''){
                    $scope.gridOptions.columnDefs.splice($scope.gridOptions.columnDefs.length,0,{field: '购买类型'});
                     $scope.gridOptions.columnDefs.splice($scope.gridOptions.columnDefs.length,0, {field: '购买费用'})
                };                
                var calSuccess = function(data, status, headers, config) {
                    if(data.result == 0){
                        var heroData = data.data;
                    }else{
                        console.log('调取接口失败，请确认服务器状态');
                        return false;
                    }
                    var gridData = [];
                    var buyTypeDic = ['钻石','','','金币']
                    //下载表名
                    $scope.gridOptions.exporterCsvFilename = message.startD + '至' + message.endD + '英雄销售数据统计表.csv';
                    _.each(heroData, function(item){
                        //给grid的数据
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
                        for(var i = 0;i < heroDicArrage[0].length;i++){
                            (function(i){
                               if(heroDicArrage[0][i] == item.heroId){
                                gData['英雄名称'] = heroDicArrage[1][i];
                                }
                            })(i);   
                        };
                        gData['英雄销售数量'] = item.allHeroNum;
                        if(message.buyType != ''){
                            gData['购买类型'] = buyTypeDic[item.buyType-1];
                            gData['购买费用'] = item.realNeed;    
                        }
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
                    url : '/gmtool' + requires.MOBA_SALES_HERO,
                    params : message
                }).success( calSuccess ).error( calError );
                
                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
            };
            setTimeout(function() {
                $scope.hero();
            }, $scope.reqDelay);
    }]);


//style controll 
$(function(){

});