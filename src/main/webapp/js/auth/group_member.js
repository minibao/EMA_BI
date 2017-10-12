app.controller('authGroupMember', 
        ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 
         function($scope, $http, $location, $cookieStore, echartsService){ 
        	var searchObject = $location.search();
        	var groupId = searchObject.groupId;
        	if (!groupId) {
        		$scope.changeLocation('./groupList.jsp?mid='+message.mid, true);
        		return;
        	}
        	
        	var groupMembers = function(){
        		var calSuccess = function(data, status, headers, config) {
        			console.log(data)
                	$scope.groupRole = data.role || {};
                	$scope.freeMembers = data.freeMembers || [];
                };
            	var calError = function(data, status, headers, config) {
                    console.log(status)
                }; 
                var message = $scope.message;
                message.id = groupId;
                $http({
                    method : 'GET' ,
                    url : '/gmtool' + requires.AUTH_GROUP_MEMBER,
                    params : message
                }).success( calSuccess ).error( calError ); 
        	}
        	groupMembers(); 
        	
        	$scope.groupMemberSubmit = function(){
        		
        		var message = $scope.message;
                message.id = groupId;
                message.mUids = _.map($scope.groupRole.members, 'uid').join(',');
//        		var message = {
//        			id : groupId,
//        			mUids : _.map($scope.groupRole.members, 'uid').join(',')
//        		}
        		var calSuccess = function(data, status, headers, config) {
        			console.log(data)
        			$scope.changeLocation('./groupList.jsp?mid='+message.mid+"&token="+message.token, true);
                };
            	var calError = function(data, status, headers, config) {
                    console.log(status)
                }; 

                $http({
                    method : 'GET' ,
                    url : '/gmtool' + requires.AUTH_GROUP_MEMBER_EDIT,
                    params : message
                }).success( calSuccess ).error( calError ); 

        	}

        	$scope.moveMember = function(direction){
        		if (direction) {
        			var rightVals = $("select[name=rightSelect]").val()+",";
        			$scope.groupRole.members = _.filter($scope.groupRole.members, function(member){
        				var pass = rightVals.indexOf(member.uid+",") == -1;
        				if (!pass) {
        					var merge = true;
        					_.each($scope.freeMembers, function(_member){
        						if (member.uid == _member.uid){
        							merge = false;
        						}
        					});
        					if (merge) {
        						$scope.freeMembers.push(member);
        					}
        				}
        				return pass;
        			});
        		}else {
        			var leftVals = $("select[name=leftSelect]").val()+",";
        			$scope.freeMembers = _.filter($scope.freeMembers, function(member){
        				var pass = leftVals.indexOf(member.uid+",") == -1;
        				if (!pass) {
        					var merge = true;
        					_.each($scope.groupRole.members, function(_member){
        						if (member.uid == _member.uid){
        							merge = false;
        						}
        					});
        					if (merge) {
        						$scope.groupRole.members.push(member);
        					}
        				}
        				return pass;
        			});
        			
        		}
        	}

}]);