app.controller('authGroupAdd', 
        ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 
         function($scope, $http, $location, $cookieStore, echartsService){  
        	
        	$scope.checkboxHandler = function(menuId){
        		
        	}    	
        	$scope.checkboxSubmit = function(menuId){
        		var checkedboxVals = [];
        		_.each($("input[name=checkboxAuth]:checked"), function(checkedItem){
        			checkedboxVals.push($(checkedItem).val());
        		});
        		var groupNameVal = $('input[name=groupName]').val();
        		if (_.isNull(groupNameVal) || groupNameVal.length < 1) {
        			alert('权限组名字不能为空');
        			return;
        		}
        		
        		submitGoupAdd(groupNameVal, checkedboxVals);
        		
            	function submitGoupAdd(groupNameVal, checkedboxVals){
//                    var message = {
//                    	groupName: groupNameVal,
//                    	groupGame: '',
//                    	groupStatus: $('input[name=radioStatus]:checked').val()||0,
//                    	menuIds: checkedboxVals.join(','),
//                    };
//                    
                    var message = $scope.message;
                    message.groupName = groupNameVal;
                    message.groupGame = '';
                    message.groupStatus = $('input[name=radioStatus]:checked').val()||0;
                    message.menuIds = checkedboxVals.join(',');
                    
                    console.log(message);
                    var calSuccess = function(data, status, headers, config) {
                    	console.log(data);
                    	$scope.changeLocation('./groupList.jsp?mid='+message.mid+"&token="+message.token, true);
                    };
                    var calError = function(data, status, headers, config) {
                        console.log(status)
                    };                     
                    $http({
                        method : 'POST' ,
                        url : '/gmtool' + requires.AUTH_GROUP_ADD,
                        params : message
                    }).success( calSuccess ).error( calError );  
                    
            	}
        	}
        	

        
}]);