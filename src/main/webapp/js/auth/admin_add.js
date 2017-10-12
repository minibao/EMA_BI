app.controller('authAdminAdd', 
        ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 
         function($scope, $http, $location, $cookieStore, echartsService){  
        	$scope.sysRoleList = [];
        	var initGroupSelect = function(){
        		var calSuccess = function(data, status, headers, config) {
        			$scope.sysRoleList = data.sysRoleList || [];
                };
                var calError = function(data, status, headers, config) {
                    console.log(status)
                };
                $http({
                    method : 'GET' ,
                    url : '/gmtool' + requires.AUTH_GROUP_LIST,
                    params : $scope.message
                }).success( calSuccess ).error( calError );
        	}
        	initGroupSelect();
        	
        	$scope.adminAddSubmit = function(){
                if (!$scope.member) {
                	alert("请输入基本信息");
                	return;
                }
        		var message = $scope.member;
                message.token = $scope.message.token;
                message.mid = $scope.message.mid;

                if ((message.password.length <6 || message.password.length >20 ) || (message.password != message.rptpassword)) {
                	alert("两次密码必须一致，长度在6-20位");
                	return;
                }
                
                var calSuccess = function(data, status, headers, config) {
                	console.log(data);
                	$scope.changeLocation('./adminList.jsp?mid='+message.mid+"&token="+message.token, true);
                };
                var calError = function(data, status, headers, config) {
                    console.log(status)
                };                     
                $http({
                    method : 'POST' ,
                    url : '/gmtool' + requires.AUTH_ADMIN_ADD,
                    params : message
                }).success( calSuccess ).error( calError );
        	}
        
}]);