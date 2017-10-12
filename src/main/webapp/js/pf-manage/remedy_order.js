app.controller('remedyOrderCtrl', 
        ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants',
        function($scope, $http, $location, $cookieStore, echartsService, uiGridConstants){
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
            //拉取全部补单数据
            function alldata(){
                var message = $scope.message;
                message.orderStatus = 4;
                //表头
                $scope.gridOptions.columnDefs = [
                        {field: 'App Id',width:'6%'},
                        {field: 'Uid',width:'10%'},
                        {field: 'Alliance Id',width:'6%'},
                        {field: 'Alliance Uid',width:'6%'},
                        {field: 'Pord Id',width:'5%'},
                        {field: 'Price',width:'5%'},
                        {field: 'Order Status',width:'6%'},
                        {field: 'Creat Ts',width:'15%'},
                        {field: 'Order Id',width:'30%'}
                    ];
                var calSuccess = function(data, status, headers, config){
                    if(data.result == 0){
                        var resData = data.data;
                    }else{
                        layMsg('服务器查询失败！');
                        return false;
                    };
                    var btnDel = '<button class="btn btn-small btn-primary data-details">详情</button>'
                    _.ench(resData,function(item){
                        var gData = {
                            'App Id' : item.app_id,
                            'Uid' : item.uid,
                            'Alliance Id' : item.alliance_id,
                            'Alliance Uid' : item.alliance_uid,
                            'Pord Id' : item.prod_id,
                            'Price' : item.price,
                            'Order Status' : item.order_status,
                            'Creat Ts' : item.create_ts,
                            'Order Id' : item.order_id,
                            '详情': btnDel
                        }
                    });
                   //绑定事件
                   $('.data-details').on('click',function(){
                         
                   }) 
                   spinner.spin(); 
                };
                var calError = function(data, status, headers, config){
                    console.log(status);
                    spinner.spin();
                };
                $http({
                    method : 'GET',
                    url : '/gmtool' + requires.PF_MANAGE_ORDER_MISS,
                    params : message
                }).success( calSuccess ).error( calError );
                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target); 
            }

            //单项订单查询  
            $scope.orderSearch = function(){
                var message = $scope.message;
                message.email = $scope.iptEmail;
                //判断输入非空
                if(message.email == undefined){
                    layMsg('输入信息不能全为空！');
                    return false;
                }
                //重置信息显示
                $scope.reSuccess = '';
                $scope.upDataOpen = false; 
                var calSuccess = function(data, status, headers, config) {
                    spinner.spin();
                    //判断返回数据
                    if(data.result == 0){
                        if(data.data.length == 0){

                            return false;
                        }else{
                            var resData = data.data[0];
                        }
                    }else{
                        
                        return false;
                    }
                    //数据铺陈

                    
                };
                var calError = function(data, status, headers, config) {
                    console.log(status);
                    spinner.spin();
                };
                $http({
                    method : 'GET',
                    url : '/gmtool' + requires.PF_MANAGE_ORDER_MISS,
                    params : message
                }).success( calSuccess ).error( calError );
                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);      
            };
            //弹出修改框

}]);

//style controll 
$(function(){

});