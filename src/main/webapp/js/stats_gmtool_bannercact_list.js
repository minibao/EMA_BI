app.controller('statsGmtoolBannerAct', 
        ['$scope', '$http', '$location', '$cookieStore',
         function($scope, $http, $location, $cookieStore) {
        	(function(){
        		var message = $scope.message;
        		var calSuccess = function(data, status, headers, config){
        			try{
        				var bannerList = data.data;
        				var bannerData = data.data.data;			
        			}catch(err){
        				location.reload();
        			}	
        			var tboody = '';
        			if(bannerData == null){
        				var str = '<tr><td>当前跑马灯列表为空！</td><td></td></tr>';
        				$('#tbodyList').html(str);
        				return false;
        			}
        			for(var i = 0;i < bannerData.length;i++){
        				var str = '<tr><td>' + bannerData[i] + '</td><td><button class="btn btn-default" ng-click="delBanner()" name="delBtn" data-index="'+bannerData[i]+'">删除</button></td></tr>' ;
						tboody += str;
        			}
        			$('#tbodyList').html(tboody);

        		};
        		var calError = function(data, status, headers, config){
        			console.log(status);
        		}

        		$http({
                        method : 'GET',
                        url : '/gmtool' + requires.STATS_GAME_MANAGE_ANNOUNCE_GET,
                        params : message
                    }).success( calSuccess ).error( calError );  
        		
        	})();

        	$scope.infoTips = 0;
        	$scope.conformToDelFnc = function(){
        		var message = $scope.message;
        		message.id = $('#conformToDel').attr("date-index");
        		console.log($('#conformToDel'));
        		var calSuccess = function(data, status, headers, config){
        			var codeStr = data.data.code;
        			if(codeStr == '0'){
        				$scope.infoTips = 1;
        				setTimeout(function(){
        					location.reload();
        				},2000)
        			}else{
        				$scope.infoTips = 2;
        				setTimeout(function(){
        					location.reload();
        				},2000)
        			}
        		};
				var calError = function(data, status, headers, config){
					console.log(status);
				};	

				$http({
                        method : 'GET',
                        url : '/gmtool' + requires.STATS_GAME_MANAGE_ANNOUNCE_DEL,
                        params : message
                    }).success( calSuccess ).error( calError ); 
        	}

            


             

}]);

