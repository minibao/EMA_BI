app.controller('autLogMy', 
        ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 
         function($scope, $http, $location, $cookieStore, echartsService){ 
            $scope.gridOptions = {
                treeRowHeaderAlwaysVisible: false,
                enableRowSelection: false,
                showColumnFooter: true,
                enableGridMenu: true,
                enableRowHeaderSelection: false,
                enableSelectAll: true,
                exporterMenuPdf: false,
                exporterOlderExcelCompatibility: true,
                onRegisterApi: function(gridApi) { 
                    $scope.gridApi = gridApi;
                }
            };
            $scope.gridOptions.rowHeight = 60;
            $scope.export = function() {
                var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
                $scope.gridApi.exporter.csvExport( 'all', 'all', myElement );
            };
            var logHist = function(){
                var message = $scope.message;
                //生成表头
                $scope.gridOptions.columnDefs = [
                    {field: '管理员',sort: {
                        direction: 'desc', priority: 0 },width:'4%'},
                    {field: 'ip地址',width:'8%'},
                    {field: '请求路径',width:'10%'},
                    {field: '参数'},
                    {field: '时间',width:'12%'}
                ];
                var calSuccess = function(data, status, headers, config) {
                    if(data.result == 0){
                        var logHist = data.logHist;
                    }else{
                        layMsg('服务器连接失败，请重试');
                        return false;
                    }
                    var gridData = [];
                    _.each(logHist,function(item){
                        //组织参数 params 数据
                        var paramsStr = '';
                        if(item.params instanceof Array){
                           (function(item){
                            for(var i = 0;i < item.params.length;i++){
                                paramsStr = paramsStr +'[' + (item.params[i].key + ':' + item.params[i].value[0]) + ']'; 
                            }
                            })(item) 
                        }
                        gridData.push({
                            '管理员' : item.authRoleId,
                            'ip地址' : item.ipAddr,
                            '请求路径' : item.path,
                            '参数' : paramsStr,
                            '时间' : item.time
                        });
                    });
                    $scope.gridOptions.data = gridData;
                    spinner.spin();
                };
                var calError = function(data, status, headers, config) {
                    console.log(status)
                    spinner.spin();
                }; 
                $http({
                    method : 'GET' ,
                    url : '/gmtool' + requires.AUTH_LOG_MY,
                    params : message
                }).success( calSuccess ).error( calError );
                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target); 
            }
            logHist();       	

} ]);