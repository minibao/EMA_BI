app.controller('statsGmtoolBannerActSet', 
        ['$scope', '$http', '$location', '$cookieStore',
         function($scope, $http, $location, $cookieStore) {
            $scope.bannerTitle = '';
            $scope.infoTips = 0;
            $scope.goodTips = 0;
            $scope.errTips = 0;
            $scope.sentBannerActSet = function(){
                var message = $scope.message;
                 message.id = $scope.bannerTitle;
                 message.priority = $('#bannerPriority').val();
                 message.num = $('#bannerNum').val();
                 message.interval = $('#bannerTimechecked input[ name="bannerInterval"]:checked').val();
                 message.content = $('#editor-text').val();
                 if( message.num == '') message.num = 1;

                 var calSuccess = function(data, status, headers, config){
                    try{
                        var dataCode = data.data.code;
                    }catch(err){
                        console.log('参数错误');
                    }
                    if(dataCode == 0){
                        $scope.infoTips = 1;
                        $scope.goodTips = 1;
                        setTimeout(function(){
                           location.reload();
                        },2000);
                    }else if(dataCode == 20012){
                        $scope.infoTips = 1;
                        $scope.errTips = 1;
                        setTimeout(function(){
                        	location.reload();
                        },2000);
                    }
                 };
                 var calError = function(data, status, headers, config){
                    console.log(status);
                 };
                 $http({
                        method : 'GET',
                        url : '/gmtool' + requires.STATS_GAME_MANAGE_ANNOUNCE_ADD,
                        params : message
                    }).success( calSuccess ).error( calError );  
            }
                      

}]);

