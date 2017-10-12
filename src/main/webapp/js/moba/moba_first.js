app.controller('mobaFirstCtrl', 
        ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants','$sessionStorage',
        function($scope, $http, $location, $cookieStore, echartsService, uiGridConstants,$sessionStorage){	
            $scope.ciyuan = {channel: {}, alliance: {} };
            //var mobaFirstChart = echartsService.line('mobaFirstChart','首冲统计表');
            $scope.hideGrid = $sessionStorage.excelShow;
            $scope.$watch('hideGrid',function(){
                $sessionStorage.excelShow = $scope.hideGrid;
            })
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
            $scope.gridOptions.columnDefs = [
                {field: '日期',sort: {
                    direction: 'desc', priority: 1 
                }},
                {field: '获得黑岩数量'}
            ];
            $scope.first = function() {
                var message = $scope.message;
                message.server = ($scope.ciyuan.server == null || $scope.ciyuan.server.length == undefined) ? '': $scope.ciyuan.server;
                message.channel =  ($scope.ciyuan.alliance==null || $scope.ciyuan.alliance.length== undefined) ? '': $scope.ciyuan.alliance.join(',');
                message.startD = $(".date-picker-star").val() + '+ 00:00:00';
                message.endD = $(".date-picker-end").val() + '+ 23:59:59';
                var svrName = $('.dropdown-toggle:eq(0)').attr('title');
                var alcName = $('.dropdown-toggle:eq(1)').attr('title'); 
                var calSuccess = function(data, status, headers, config) {
                    var packages = data.data;
                    var gridData = [];
                    if(message.server){
                         $scope.gridOptions.columnDefs.splice(1,0,{field: '服务器'});
                    };
                    if(message.channel){
                        $scope.gridOptions.columnDefs.length > 5 ? $scope.gridOptions.columnDefs.splice(2,0,{field: '渠道'}) :
                        $scope.gridOptions.columnDefs.splice(1,0,{field: '渠道'});
                    } 
                    $scope.gridOptions.exporterCsvFilename = message.startD + '至' + message.endD + '礼包销售数据' + '.csv';

                    var e_data=[];
                    var tagArr = [];
                    if (!(message.channel == null)) {
                        var tagArr = message.channel.split(','); //字符串转数组
                    }
                    _.each(packages, function(item) {
                        if(tagArr.length <= 1) {
                            //e_data.push([item.date,item.allPlayG]);
                            //e_dataTime.push([item.date,(item.allTimeOnline/60).toFixed(2)]);
                            //e_dataCnt.push([item.date,item.allLoginNum]);
                        };
                            var gData = {
                                 "日期": item.date,
                                 "礼包名称": item.allPlayG,
                                 "销售数量": new Number(item.allTimeOnline/60).toFixed(2),
                                 "销售单价": item.allLoginNum,
                                 "销售额": new Number(item.allTimeOnline/(item.allLoginNum*60)).toFixed(2)
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
                    url : '/gmtool' + requires.MOBA_GET_DAU,
                    params : message
                }).success( calSuccess ).error( calError );  

                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
            };
            /*setTimeout(function() {
                $scope.first();
            }, $scope.reqDelay);*/
}]);

//style controll 
$(function(){

});




