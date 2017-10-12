app.controller('statsGmtoolEmailSent', 
        ['$scope', '$http', '$location', '$cookieStore',
         function($scope, $http, $location, $cookieStore) {
            $scope.filter = {channel: '', server: '', time: ''};
            $scope.filter.vocation = $scope.vocations[0];
            $scope.filter.retain = $scope.retain[0];
            $scope.filter.pay = $scope.pay[0];
            $scope.screenCondition = 0; 
            $scope.export = function() {
                var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
                $scope.gridApi.exporter.csvExport( 'all', 'all', myElement );
            };  
            $scope.openScreenConds = function(){
                $scope.screenCondition = 1;  
            };
            var uidArr = [];
            var toggle = true;
            $scope.searchUserUid = function(){
                var message = $scope.message;
                message.roleId = '';
                message.containerName = $scope.filter.server==null?null:$scope.filter.server.containerValue;
                message.channel = $scope.filter.channel==null?null:$scope.filter.channel.chnValue;
                message.channelTag = ($scope.filter.channelTag==null || $scope.filter.channelTag.length==0)?null:$scope.filter.channelTag.join(',');
                message.vocation = $scope.filter.vocation.value;
                message.isRetain = $scope.filter.retain.value;
                message.isPay = $scope.filter.pay.value;
                message.startD = $(".date-picker-star").val();
                message.endD = $(".date-picker-end").val();  
                message.startLv = $scope.starGrade;
                message.endLv = $scope.endGrade;
                $scope.usersUidList = '';
                var calSuccess = function(data, status, headers, config){
                    var userListDate = data.data.data;
                    var tbody = '';
                    uidArr = [];
                    $('#checkall').prop('checked',false);
                    toggle = true; 
                     _.each(userListDate, function(item) {
                        var str = '<tr><td>'+ item.containerName +'</td><td>' + item.channel +'</td><td>' 
                                    + item.channeltag +'</td><td>' + item.roleId +'</td><td>' + item.vocation +'</td><td>' + item.lv +'</td><td>' + item.isPay 
                                    +'</td><td>' + item.isRetain +'</td><td>' + item.roleCreateTime +'</td><td><input type="checkbox" name="checked"></td></tr>';
                            tbody += str;
                     })
                     $('#searchResBody').html(tbody);
                    spinner.spin();
                };
                var calError = function(data, status, headers, config){
                    console.log('参数错误带，代码：'+ status);
                    spinner.spin();
                }
                $http({
                        method : 'GET',
                        url : '/gmtool' + requires.STATS_GAME_MANAGE_USER_LIST,
                        params : message
                    }).success( calSuccess ).error( calError );  
                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
            };
            $scope.checkAll = function(){
                if(toggle){
                    $('#searchResBody td').find(':checkbox').prop('checked',true);
                    toggle = false; 
                }else{
                    $('#searchResBody td').find(':checkbox').prop('checked',false);
                    toggle = true; 
                } 
            }
            $scope.upLoadUid = function(files){
                if (files.length) {
                    var file = files[0];
                    var reader = new FileReader();
                    if (/text\/\w+/.test(file.type)) {
                        reader.onload = function() {
                            var str = this.result;
                            str = str.split('\r\n').join(','); 
                            $scope.usersUidList = str;
                            $('#uidlists').val(str);
                        }
                        reader.readAsText(file);
                    }
                }
               
            }; 
            $scope.reback = function(){
                $scope.screenCondition = 0;
            };
            $scope.addToUidText = function(){
            	uidArr = [];
                $('#searchResBody td').find(':checkbox').each(function(){
                    if($(this).is(":checked")){
                        var uid = $(this).parent().parent().find('td:eq(3)').text();
                        uidArr.push(uid);
                    }
                })
                $scope.screenCondition = 0;
                $scope.usersUidList = uidArr.join(',');
            };
            $scope.sendTheEmail = function(){
                 var message = $scope.message;
                 message.containerName = $scope.filter.server==null?null:$scope.filter.server.containerValue;
                 message.title = $scope.emailTitle;
                 message.item = $scope.items;
                 message.uid = $('#uidlists').val();
                 message.body = $('#editor-text').val();
                 if(message.uid == '') message.uid = '-1';
                 var uidArrage =  message.uid.split(',');
                 var calSuccess = function(data, status, headers, config){
                    var res = data.result;
                    if(res){
                        alert('接口调用失败，请检查服务器！');
                    }else{
                        var code = data.data.code
                        if(code){
                            alert('发送失败，请检查收件人信息');
                        }else{
                            alert('发送成功，点击确定返回');
                            location.reload(); 
                        }
                    }
                 };
                 var calError = function(data, status, headers, config){
                    console.log('参数错误带，代码：'+ status);
                }
                    $http({
                        method : 'POST',
                        url : '/gmtool' + requires.STATS_GAME_MANAGE_EMAIL_SENT,
                        params : message
                    }).success( calSuccess ).error( calError );

            }           
}]);

