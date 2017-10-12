app.controller('mobaPackageCtrl', 
        ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants','$sessionStorage',
        function($scope, $http, $location, $cookieStore, echartsService, uiGridConstants,$sessionStorage){	
            $scope.ciyuan = {channel: {}, alliance: {} };
            //拉取礼包字典
            function getPackageDic(){
                 var resArr = [[],[]]; //创建一个存储用二维数组  id , 中文名
                (function(){
                    var message = $scope.message;
                    message.typeCode = 'package';
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
            var serAlicDic = $scope.ciyuanSerAlicDic;
            var packagesDic = getPackageDic();
            console.log(packagesDic);
            $scope.gridOptions = {
                treeRowHeaderAlwaysVisible: false,
                enableRowSelection: false,
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
            $scope.package = function() {
                var message = $scope.message;
                message.server = ($scope.ciyuan.server == null || $scope.ciyuan.server.length == undefined) ? '': $scope.ciyuan.server;
                message.channel =  ($scope.ciyuan.alliance==null || $scope.ciyuan.alliance.length== undefined) ? '': $scope.ciyuan.alliance.join(',');
                message.startD = $(".date-picker-star").val() + '+ 00:00:00';
                message.endD = $(".date-picker-end").val() + '+ 23:59:59';
                var calSuccess = function(data, status, headers, config) {
                    var packages = data.data;
                    var gridData = [];
                    $scope.gridOptions.columnDefs = [
                        {field: '日期',sort: {
                            direction: 'desc', priority: 1 
                        }},
                        {field: '礼包名称',grouping:{groupPriority:0},
                            sort: {
                                direction: 'desc', priority: 0 
                        }},
                        {field: '销售数量', aggregationType: uiGridConstants.aggregationTypes.avg, aggregationHideLabel: true},
                        {field: '销售单价', aggregationType: uiGridConstants.aggregationTypes.avg, aggregationHideLabel: true},
                        {field: '销售额', aggregationType: uiGridConstants.aggregationTypes.avg, aggregationHideLabel: true}
                    ];
                    if(message.server){
                         $scope.gridOptions.columnDefs.splice(1,0,{field: '服务器'});
                    };
                    if(message.channel){
                        $scope.gridOptions.columnDefs.length > 5 ? $scope.gridOptions.columnDefs.splice(2,0,{field: '渠道'}) :
                        $scope.gridOptions.columnDefs.splice(1,0,{field: '渠道'});
                    } 
                    $scope.gridOptions.exporterCsvFilename = message.startD + '至' + message.endD + '礼包销售数据' + '.csv';
                    
                    _.each(packages, function(item) {
                        var gData = {
                             "日期": item.time,
                             "销售数量": item.buyItemCountAll,
                             "销售单价": new Number(item.realNeedAll/item.buyItemCountAll).toFixed(4),
                             "销售额": item.realNeedAll
                        };
                            //礼包名称翻译
                        for(var i = 0;i < packagesDic[0].length;i++){
                            if(packagesDic[0][i] == item.buyItemId){
                                 gData['礼包名称']  = packagesDic[1][i];
                            }
                        };
                        if(message.server){
                            for(var i = 0;i < serAlicDic.service[0].length;i++){
                                if(serAlicDic.service[0][i] == item.buyItemId){
                                     gData['服务器']  = serAlicDic.service[1][i];
                                }
                            }
                        };
                        if(message.channel){
                            for(var i = 0;i < serAlicDic.alliance[0].length;i++){
                                if(serAlicDic.alliance[0][i] == item.alliance){
                                     gData['渠道']  = serAlicDic.alliance[1][i];
                                }
                            }
                        };
            	       gridData.push(gData);
                    });
                    $scope.gridOptions.data = gridData;
                    spinner.spin();
                };
                
                var calError = function(data, status, headers, config) {
                    console.log(status);
                    spinner.spin();
                };

            	$http({
                    method : 'GET',
                    url : '/gmtool' + requires.MOBA_GET_PACKAGE,
                    params : message
                }).success( calSuccess ).error( calError );  

                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
            };
            setTimeout(function() {
                $scope.package();
            }, $scope.reqDelay);
}]);

//style controll 
$(function(){

});