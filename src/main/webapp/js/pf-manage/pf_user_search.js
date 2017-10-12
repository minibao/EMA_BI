app.controller('pfUserSearchCtrl', 
        ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants',
        function($scope, $http, $location, $cookieStore, echartsService, uiGridConstants){  
            $scope.reSuccess = ''; 
            $scope.upDataOpen = false;
            $scope.serachUserInfo = function(){
                var message = $scope.message;
                message.email = $scope.iptEmail;
                message.mobile = $scope.iptphone;
                message.deviceId = $scope.iptdevice;
                message.uid = $scope.iptUid;
                //判断输入非空
                if(message.email == undefined && message.mobile == undefined && message.deviceId == undefined
                    && message.uid == undefined){
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
                            $scope.reSuccess = 'resBad';
                            return false;
                        }else{
                            var resData = data.data[0];
                        }
                    }else{
                        $scope.reSuccess = 'conBad'
                        return false;
                    }
                    //数据铺陈
                    $scope.uid = resData.uid;
                    $scope.email = resData.email;
                    $scope.mobile = resData.mobile;
                    $scope.nickname = resData.nickname;
                    $scope.password = resData.password;
                    $scope.status = resData.status;
                    $scope.androidDK = resData.androidPnKey;
                    $scope.iosDK = resData.iosPnKey;
                    //显示表格
                    $scope.reSuccess = 'resGood';
                    
                };
                var calError = function(data, status, headers, config) {
                    console.log(status);
                    spinner.spin();
                };
                $http({
                    method : 'GET',
                    url : '/gmtool' + requires.PF_MANAGE_USER_SEARCH,
                    params : message
                }).success( calSuccess ).error( calError );
                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);      
            };
            //弹出修改框
            $scope.openFixWin = function(str){
                if(str == 'fix') $scope.upDataOpen = true;
                if(str == 'close') $scope.upDataOpen = false;
            }
            //修改信息
            $scope.upDataInfo = function(){
               var message = $scope.message;
                 message.email = $('#newEmail').val();
                 message.mobile = $('#newMobile').val();
                 message.uid = $scope.uid;
                 message.password = $('#newPsw').val();
                 //校验修改输入信息
                 if(message.email == '' && message.mobile == '' && message.password == ''){
                    layMsg('输入信息不能全部为空！');
                    return false;
                 }else{
                    //手机号码符合
                    if(!message.mobile.match(/^1[3|4|5|7|8][0-9]\d{4,8}$/) && message.mobile != ''){
                        layMsg('请输入正确的手机号码！');
                        return false;
                    };
                    //密码6-16位
                    if((message.password.length < 6 || message.password.length > 16) && message.password != ''){
                        layMsg('请输入密码须为6-16位！');
                        return false;
                    };
                    //邮箱验证
                    if(!message.email.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/) && message.email!= ''){
                        layMsg('请输入正确的邮箱地址');
                        return false;
                    };
                 }
                 var calSuccess = function(data, status, headers, config){ 
                    spinner.spin();
                    if(data.result == 0){
                       layMsg(data.data.msg);
                       location.reload(); 
                    }else{
                        layMsg('服务器连接失败，请重试');
                    };
                    $scope.upDataOpen = false;
                 };
                 var calError = function(data, status, headers, config){
                    console.log(status);
                    spinner.spin();
                 };
                 $http({
                    method : 'GET',
                    url : '/gmtool' + requires.PF_MANAGE_USER_CHANGE,
                    params : message
                }).success( calSuccess ).error( calError );
                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);    
            };
}]);

//style controll 
$(function(){

});