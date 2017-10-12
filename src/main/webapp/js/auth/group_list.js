app.controller('authGroupList', 
        ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 
         function($scope, $http, $location, $cookieStore, echartsService){  
        	console.log($scope.message)
        	$scope.sysRoleList = [];
        	var groupList = function(){
        		var calSuccess = function(data, status, headers, config) {
                	$scope.sysRoleList = data.sysRoleList || [];
                };
            	var calError = function(data, status, headers, config) {
                    console.log(status)
                }; 
               var message = $scope.message;
               
                $http({
                    method : 'GET' ,
                    url : '/gmtool' + requires.AUTH_GROUP_LIST,
                    params : message
                }).success( calSuccess ).error( calError ); 
        	}
        	groupList();  
        	
        	
        	$scope.groupDeleteSubmit = function(groupId){
        		if (!confirm("确定要删除此条记录？")){
        			return
        		}
                var message = $scope.message;
                message.id = groupId;
        		var calSuccess = function(data, status, headers, config) {
                	console.log(data);
                	$scope.changeLocation('./groupList.jsp?mid='+message.mid+"&token="+message.token, true);
                };
                var calError = function(data, status, headers, config) {
                    console.log(status)
                };
                $http({
                    method : 'POST' ,
                    url : '/gmtool' + requires.AUTH_GROUP_DELETE,
                    params : message
                }).success( calSuccess ).error( calError );
        	}
        	
        }]);