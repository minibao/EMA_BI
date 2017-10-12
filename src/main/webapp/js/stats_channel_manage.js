app.controller('statsChannelManage', 
        ['$scope', '$http', '$location', '$cookieStore', 'uiGridConstants',
        function($scope, $http, $location, $cookieStore,uiGridConstants){   
            $scope.filter = {channel: '', server: '', time: ''};
            //初始化表格
              $scope.gridOptions = {
                columnDefs: [],
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
              var spinner = new Spinner();
              var target = $("#spin").get(0);
              spinner.spin(target);
              var message = $scope.message;
              var preTableShow = function(data, status, headers, config){
            	  
                  var dataInfo = data;
                  var gridData =[];
                   _.each(dataInfo, function(item) {
                       gridData.push({
                          "ID": item.id,
                          "子渠道名": item.channeltagName,
                          "子渠道值": item.channeltagValue,
                          "修改时间": item.lastTimeStr
                      });
                      $scope.gridOptions.data = gridData;
                   })
              };
              var errorTis = function(data, status, headers, config){
                console.log(status);
                spinner.spin();
              }
              setTimeout(function(){
            	  $http({
                      method : 'GET',
                      url : '/gmtool' + requires.STATS_FIND_MANAGE,
                      params : message
                  }).success( preTableShow ).error(errorTis);
              },$scope.reqDelay )
        	  
        	  
            $scope.method = $('#methodSelect').val();
            $scope.channelManage = function() {
                console.log($scope.filter);
                if($scope.method == 0){
                    var message = $scope.message;
                    var channeltagNameArr = [];
                    for(var i = 0;i < $('.multi-select option:selected').length;i++){
                        channeltagNameArr.push($('.multi-select option:selected')[i].innerHTML);
                    }
                    message.channeltagValue  = ($scope.filter.channelTag==null || $scope.filter.channelTag.length==0)?null:$scope.filter.channelTag.join(',');
                    message.channeltagName = channeltagNameArr.join(',');
                    message.lastTime  =  $(".date-picker-single").val()  
                }else if($scope.method == 1){ 
                    var message = $scope.message;
                    var channeltagValueArr = [];
                    var channeltagNameArr = [];
                    for(var i = 0;i < $('.channel-num input').length; i++){
                        channeltagValueArr.push($('.channel-num input')[i].value);
                    }
                    for(var i = 0;i < $('.channel-name input').length;i++){
                        channeltagNameArr.push($('.channel-name input')[i].value);
                    }
                    message.channeltagName = channeltagNameArr.join(',');
                    message.channeltagValue = channeltagValueArr.join(',');
                    message.lastTime  =  $(".date-picker-single").val() 
                }
                
                var calSuccess = function(data, status, headers, config) {
                    var resTips = data.result;
                    if(resTips == 0){
                        $('.layMsgSuccess').show();
                        setTimeout(function(){
                            window.location.reload();
                        },2000)
                        
                    }else if(resTips == 1){
                        $('.layMsgError').show();
                        setTimeout(function(){
                            $('.layMsgError').hide();
                        },2000)
                    }
                    pinner.spin(); 
                };
                
                var calError = function(data, status, headers, config) {
                    console.log(status);
                    spinner.spin();
                };
                
                $http({
                    method : 'GET',
                    url : '/gmtool' + requires.STATS_MANAGE,
                    params : message
                }).success( calSuccess ).error( calError );  
            
        }
}]);
