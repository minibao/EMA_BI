app.controller('statsUsersInquire', 
        ['$scope', '$http', '$location', '$cookieStore',
         function($scope, $http, $location, $cookieStore) {
             $scope.filter = {channel: '', server: ''};
                    function cookieStoreFnc(eve){
                        var message = $scope.message;
                        var userRoleId = $(this).parent().parent().find('td:eq(0) i').text() - 0;
                        message.roleId = userRoleId;
                        message.allianceId = eve.data.allianceId;
                        message.server = eve.data.server;
                        self.location.href = ('statsUserDetails.jsp'+'?token='+ message.token +'&mid='+ message.mid +'&uid=' + message.roleId +'&server=' + message.server + '&allianceId=' + message.allianceId);
                 }           
             $scope.UsersInquireSearch = function(method) {
                var message = $scope.message;
                if(method == 'sevChnCht'){         //服务器渠道子渠道
                    message.type = 'sevChnCht';
                    message.containerName =  $scope.filter.server==null?null:$scope.filter.server.containerValue;
                    message.channel = $scope.filter.channel==null?null:$scope.filter.channel.chnValue;
                    message.channelTag = ($scope.filter.channelTag==null || $scope.filter.channelTag.length==0)?null:$scope.filter.channelTag.join(',');
                }else if(method == 'uid'){     //游戏账号
                    message.type = 'uid';
                    message.info = $('#uidVal').val();
                }else if(method == 'userName'){     //游戏角色名
                    message.type = 'userName';
                    message.info = $('#userNameVal').val();
                }else if(method == 'pfUid'){        //平台账号
                    message.type = 'pfUid';
                    message.allianceId = $('#allianceId').val();
                    message.allianceUid = $('#allianceUid').val();
                };       
                 var calSuccess = function(data, status, headers, config) {
                     var userInformations = data.data;
                     if(userInformations == 'null'){
                         alert('请求参数错误，请确认请求信息');
                         return false;
                      }
                     var showTableTd = '';
                     switch(method){
                        case 'sevChnCht':
                            _.each(userInformations, function(item) {
                                //var htmlText = '<tr><td>游戏账号：' + $('#uidVal').val() + '</td>'+'<td>游戏名:' + item.data.username + '</td>' +'<td><button class="btn" id="userDetails">详细信息</button></td>'+'</td></tr>'
                               // showTableTd += htmlText;
                            });
                        break;
                        case 'uid':
                                showTableTd = '<tr><td>游戏账号：<i id="uidRes">' + $('#uidVal').val() + '</i></td>'+'<td>游戏名:<i>' + userInformations.name + '</i></td>' + '<td>服务器:<i>' + userInformations.server + '</i></td>' +'<td><button class="btn" id="userDetails_uid">详细信息</button></td>'+'</td></tr>';
                                $('#searchResult tbody').html(showTableTd);
                                $('#userDetails_uid').on('click',{server:userInformations.server,allianceId:userInformations.allianceId},cookieStoreFnc);
                        break;
                        case 'userName':
                                showTableTd = '<tr><td>游戏账号：<i id="userNameRes">' + userInformations.uid + '</i></td>'+'<td>游戏名:<i>' + $('#userNameVal').val() + '</i></td>' +'<td>服务器:<i>' + userInformations.server + '</i></td>'+'<td><button class="btn" id="userDetails_name">详细信息</button></td>'+'</td></tr>';
                                $('#searchResult tbody').html(showTableTd);
                                $('#userDetails_name').on('click',{server:userInformations.server,allianceId:userInformations.allianceId},cookieStoreFnc);
                        break;
                        case 'pfUid':
                                var _index = 0;
                                var body = $('#searchResult tbody');
                                _.each(userInformations, function(item) {
                                    showTableTd = '<tr><td>游戏账号：<i>' + item.uid + '</i></td>'+'<td>游戏名:<i>' + item.name + '</i></td>' + '<td>服务器:<i>' + item.server + '</i></td>' +'<td><button class="btn" id="userDetails_'+_index+'">详细信息</button></td>'+'</td></tr>';
                                     body.html(showTableTd); 
                                     $('#userDetails_'+_index+'').on('click',{server:item.server,allianceId:item.allianceId},cookieStoreFnc);
                                     _index ++;
                                }); 
                        default:
                            console.log('参数错误。')
                        break;
                     }
                     

                 };

                 var calError = function(data, status, headers, config) { console.log(status); };

                 $http({
                     method : 'GET',
                     url : '/gmtool' + requires.STATS_USERS_INFO_SEARCH,
                     params : message
                 }).success( calSuccess ).error( calError );
             }


}]);

