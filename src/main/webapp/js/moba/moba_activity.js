app.controller('mobaActivityCtrl', 
        ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants','$sessionStorage',
        function($scope, $http, $location, $cookieStore, echartsService, uiGridConstants,$sessionStorage){	
            $scope.ciyuan = {channel: {}, alliance: {} };
            var serAlicDic = $scope.ciyuanSerAlicDic;
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
            //默认新手登录活动
            $scope.activityCode = 'NoviceLandingGetReward';
            $scope.activity = function(str) {
                //活动重置
                $scope.activityCode = str || $scope.activityCode;  
                var message = $scope.message;
                message.server = ($scope.ciyuan.server == null || $scope.ciyuan.server.length == undefined) ? '': $scope.ciyuan.server;
                message.channel =  ($scope.ciyuan.alliance==null || $scope.ciyuan.alliance.length== undefined) ? '': $scope.ciyuan.alliance.join(',');
                message.startD = $(".date-picker-star").val() + '+ 00:00:00';
                message.endD = $(".date-picker-end").val() + '+ 23:59:59';
                message.activityCode = $scope.activityCode;
                //表头
                $scope.gridOptions.columnDefs = [
                    {field: '日期',sort: {
                        direction: 'desc', priority: 1 
                    }},
                    {field: '活动子类型'},
                    {field: '获得奖励次数'}
                ];   
                var calSuccess = function(data, status, headers, config) {
                    if(data.result == 0){
                        var resData = data.data;
                    }else{
                        layMsg('服务器连接失败，请重试！');
                        return false;
                    }
                    if(message.server){
                         $scope.gridOptions.columnDefs.splice(1,0,{field: '服务器'});
                    };
                    if(message.channel){
                        $scope.gridOptions.columnDefs.length > 5 ? $scope.gridOptions.columnDefs.splice(2,0,{field: '渠道'}) :
                        $scope.gridOptions.columnDefs.splice(1,0,{field: '渠道'});
                    } 
                    $scope.gridOptions.exporterCsvFilename = message.startD + '至' + message.endD + $scope.activityCode +'活动统计表' + '.csv';
                    var gridData = [];
                    _.each(resData, function(item) {
                        var gData = {
                             "日期": item.time,
                             "活动子类型": item.days ? item.days : item.type,
                             "获得奖励次数": item.count
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
                };
                
                var calError = function(data, status, headers, config) {
                    console.log(status);
                    spinner.spin();
                };

            	$http({
                    method : 'GET',
                    url : '/gmtool' + requires.MOBA_GET_ACTIVITY,
                    params : message
                }).success( calSuccess ).error( calError );  
                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
        }
}]);

//style controll 
$(function(){

});