app.controller('authAdminList', 
        ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 
         function($scope, $http, $location, $cookieStore, echartsService){  
        	$scope.memberList = [];
        	var memberList = function(){
        		var calSuccess = function(data, status, headers, config) {
                	$scope.memberList = data.members || [];
                };
            	var calError = function(data, status, headers, config) {
                    console.log(status)
                }; 
               var message = $scope.message;
               
                $http({
                    method : 'GET' ,
                    url : '/gmtool' + requires.AUTH_ADMIN_LIST,
                    params : message
                }).success( calSuccess ).error( calError ); 
        	}
        	memberList();
        	
        	
        	$scope.adminDeleteSubmit = function(uid) {
        		var calSuccess = function(data, status, headers, config) {
        			console.log(data);
        			$scope.changeLocation('./adminList.jsp?mid='+message.mid+"&token="+message.token, true);
                };
            	var calError = function(data, status, headers, config) {
                    console.log(status)
                }; 
               var message = $scope.message;
               message.uid = uid;
                $http({
                    method : 'POST' ,
                    url : '/gmtool' + requires.AUTH_ADMIN_DELETE,
                    params : message
                }).success( calSuccess ).error( calError );         		
        	}
        	
}]);