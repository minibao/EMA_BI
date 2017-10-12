app.controller('statsUsersDetails', 
        ['$scope', '$http', '$location', '$cookieStore','uiGridConstants',
         function($scope, $http, $location, $cookieStore,uiGridConstants) {
            $scope.gridOptions = {
                showColumnFooter: true,
                enableGridMenu: true,
                enableSelectAll: true,
                exporterMenuPdf: false,
                exporterOlderExcelCompatibility: true,
                onRegisterApi: function(gridApi) { 
                    $scope.gridApi = gridApi;
                }
            };
            //定义ajax url;
            var ajaxUrl = '';
            var duration = '';
            var method = '';
            //获取URL参数函数
            function GetQueryString(){
                var url =  $location.search().uid;
                if(url){  //有参数
                    return url;
                }else{
                	 url =  $location.search().uid;
                	 if(url){
                		 return url;
                	 }else{
                		 url =  $location.search().uid;
                		 return url;
                	 }
                }
            } 
            //获取信息
            (function(){
                var message = $scope.message;
                if(GetQueryString()){
                    message.uid = GetQueryString();
                }else{
                    $('#openWindow').show();
                    $('#informationErr').show().siblings().hide();
                    var newUrl = $location.absUrl();
                    newUrl = newUrl.split('jsp');
                    setTimeout(function(){
                        sessionStorage.clear();
                        location = newUrl[0];
                    },3000);
                    return false;
                }  
                var calSuccess = function(data, status, headers, config){
                    var infoList = data.data;
                    if(infoList == null){
                        alert('请求参数错误，请确认参数或刷新页面');
                        return false;
                    }
                    $scope.userAllianceId = $location.search().allianceId;    //账号
                    $scope.userId = infoList.UID;     //roleID
                    $scope.userName = infoList.Username;   //用户名
                    $scope.userVocation = infoList.RaceID;   //职业
                    $scope.userState = '';          //账号状态  暂缺
                    $scope.silenceState = (infoList.isMute == true ?'是': '否');     //禁言   暂缺
                    $scope.registerDate = infoList.createRoleTime;
                    $scope.registerIP = infoList.createRoleIp;
                    $scope.lastLoginIP = infoList.lastLoginIp;
                    $scope.userVIP = '';
                    $scope.userLv = infoList.Level
                    $scope.userExp = infoList.Exp;
                    $scope.userdiamond = infoList.Coin;
                    $scope.userGold = infoList.Gold;
                    $scope.sever = $location.search().server;
                    var equipStr = '';
                    var prestigeStr = '';
                    var cellsStr = '';
                    _.each(infoList.EquipIDs,function(item){
                        equipStr += ('<p><span>' + item + '</span></p>');
                    })
                    _.each(infoList.Fames,function(item){
                       prestigeStr +=('<tr><td>' + item.UID + '</td><td>' + item.Level + '</td><td>' + item.Exp + '</td><tr>');
                        
                    });
                     _.each(infoList.Cells,function(item){
                         if(item.Amount == undefined){
                            item.Amount = 1;
                        };
                        cellsStr +=('<tr><td>' + item.ID + '</td><td>' + item.Amount + '</td><tr>')
                     })
                    $('#equips').html(equipStr);
                    $('#prestiges').html(prestigeStr);
                    $('#cells').html(cellsStr);

                };
                var calError = function(data, status, headers, config){
                    console.log(status); 
                };
                $http({
                     method : 'GET',
                     url : '/gmtool' + requires.STATS_USERS_INFO_DETAILS,
                     params : message
                 }).success( calSuccess ).error( calError );
            })();
            //最大时长
            var MAXTIME = 2592000;
            var msgTime = '';
            //计算天数函数
            function dealMaxDateFnc(day,hour,minu,second){
                day = day - 0;hour = hour -0;minu = minu -0;second = second -0;
                var setTime = ((day*24)*60)*60 +  (hour*60)*60 + minu*60 + second;
                if(setTime > MAXTIME){
                    msgTime = MAXTIME;
                    setTime = 30 + '天'
                    return setTime;
                }else{
                    msgTime = setTime;
                    setTime = day + '天' + hour + '时' + minu + '分' + second + '秒';
                    return setTime;
                }
            }
            //声望列表
            $scope.openList = function(str){
                switch(str){
                    case 'prestige':
                        $('.prestige-list').addClass('reback-pos');
                        $('.cells-list').removeClass('reback-pos');
                        $('.equips-list').removeClass('reback-pos');
                    break;
                    case 'cells':
                        $('.cells-list').addClass('reback-pos');
                        $('.equips-list').removeClass('reback-pos');
                        $('.prestige-list').removeClass('reback-pos');
                    break;
                    case 'equip':
                        $('.equips-list').addClass('reback-pos');
                        $('.cells-list').removeClass('reback-pos');
                        $('.prestige-list').removeClass('reback-pos');
                    break;
                    default:
                        console.log('参数错误！');
                    break;

                }
            }

             $scope.openLogWindow = function(str) {
                 $scope.gridOptions.columnDefs = [];
                 $scope.gridOptions.data = [];
                 var message = $scope.message;
                 message.uid = GetQueryString();
                 var calSuccess = function(data, status, headers, config) {
                    var logInfo = data.data;
                    if(logInfo == null){
                        alert('请求参数错误，请确认参数');
                        return false;
                    }
                    var tbody = '';
                    var thead = '';
                    var gData = [];
                    switch(str){
                        case 'login':
                            gData = [];
                            $('#dateLogTitle').html('登录日志');
                            _.each(logInfo, function(item) {
                                gData.push({
                                    'UID': item.roleId,
                                    '角色名': item.roleName,
                                    '等级': item.lv,  
                                    '登录时间': item.loginTime, 
                                    '操作IP': item.ip    
                                })  
                            });
                            $scope.gridOptions.data = gData;
                        break;
                        case 'equip':
                            alert('无数据，请勿点击');
                        break;
                        case 'gold':
                            gData = [];
                            $('#dateLogTitle').html('金币日志');
                            _.each(logInfo, function(item) {
                                gData.push({
                                    'UID': item.roleId,
                                    '角色名': item.roleName,
                                    'sunID':item.subId,
                                    '金币总量':item.amount,
                                    '等级': item.lv,  
                                    '登录时间': item.logTime, 
                                    '操作IP': item.ip,
                                    '获得/消耗': (item.inOut == 'in'? '获得':'消耗'),
                                    '道具类型': item.resourceType
                                })  
                            });
                            $scope.gridOptions.data = gData;
                        break;
                        case 'diamond':
                            gData = [];
                            $('#dateLogTitle').html('钻石日志');
                            _.each(logInfo, function(item) {
                                gData.push({
                                    'UID': item.roleId,
                                    '角色名': item.roleName,
                                    'sunID':item.subId,
                                    '钻石总量':item.amount,
                                    '等级': item.lv,  
                                    '登录时间': item.logTime, 
                                    '操作IP': item.ip,
                                    '获得/消耗': (item.inOut == 'in'? '获得':'消耗'),
                                    '道具类型': item.resourceType
                                })  
                            });
                        $scope.gridOptions.data = gData;
                    break;
                    case 'freetalk':
                        alert('无数据，请勿点击');
                    break;
                    default:
                        console.log('参数错误')
                    break;    
                    }
                 };

                 var calError = function(data, status, headers, config) { console.log(status); };

                 switch(str){
                    case 'login':
                        ajaxUrl = requires.STATS_USERS_INFO_DETAILS_LOG_LOGIN;
                    break;
                    case 'equip':
                        ajaxUrl = requires.STATS_USERS_INFO_DETAILS_LOG_EQUIP;
                    break;
                    case 'gold':
                        ajaxUrl = requires.STATS_USERS_INFO_DETAILS_LOG_GOLD;
                    break;
                    case 'diamond':
                        ajaxUrl = requires.STATS_USERS_INFO_DETAILS_LOG_DIAMOND;
                    break;
                    case 'freetalk':
                        ajaxUrl = requires.STATS_USERS_INFO_DETAILS_LOG_FREETALK;
                    break;
                    default:
                        console.log('参数错误')
                    break;    
                 }
                 $('#loginMasking').addClass('reset-pos');
                 $http({
                     method : 'GET',
                     url : '/gmtool' + ajaxUrl,
                     params : message
                 }).success( calSuccess ).error( calError );
                    
             }
             //确认弹出框
             $scope.openTipsWindow = function(wayStr){
                $('#openWindow').show();
                $('#informationTips').show().siblings().hide();
                switch(wayStr){
                    case 'freeze':
                        $('#textTips').html('确认账号冻结时间：');
                        var day = $('#freezeDays').val();
                        var hour = $('#freezeHours').val();
                        var minu = $('#freezeMinutes').val();
                        var second = $('#freezeSeconds').val();
                        var time = dealMaxDateFnc(day,hour,minu,second);
                        $('#contTips').html(time);
                        method = 'freeze';
                        ajaxUrl = '';
                    break;
                    case 'silence':
                        $('#textTips').html('确认账号禁言时间：');
                        var day = $('#silenceDays').val();
                        var hour = $('#silenceHours').val();
                        var minu = $('#silenceMinutes').val();
                        var second = $('#silenceSeconds').val();
                        var time = dealMaxDateFnc(day,hour,minu,second);
                        $('#contTips').html(time);
                        method = 'silence';
                        ajaxUrl = requires.STATS_USERS_INFO_DETAILS_GM_MUTE;
                    break;
                    case 'loginOut':
                       $('#textTips').html('确认账号踢下线/解除踢下线：');
                       var tipWord = '';
                       $('#loginOutSlc').val() == 'yew' ? tipWord = '账号踢下线': tipWord = '解除踢下线';
                       $('#contTips').html(tipWord);
                       method = 'loginOut';
                       ajaxUrl = requires.STATS_USERS_INFO_DETAILS_GM_QUIT;
                    break;
                    case 'scene':
                        $('#textTips').html('确认切换场景：');
                        var tipWord = $('#sceneChange option:selected').text();
                        var scene = $('#sceneChange').val();
                        method = 'scene';
                        $('#contTips').html(tipWord);
                    break;
                    case 'mission':
                        $('#textTips').html('确认设置任务：');
                        var missionId = $('#missionId').val();
                        var stepId = $('#stepId').val();
                        method = 'mission';
                        $('#contTips').html('任务ID：'+ missionId +'<br/>' + '步骤ID：' + stepId);
                    break;
                    case 'achieve':
                        $('#textTips').html('确认设置成就：');
                        var achieveId = $('#achieveId').val();
                        $('#contTips').html('成就ID：'+ achieveId);
                        method = 'achieve';
                    break;
                    case 'gold':
                        $('#textTips').html('确认赠送：');
                        var goldCount = $('#goldCount').val();
                        $('#contTips').html('赠送金币数量：'+ goldCount);
                        method = 'gold';
                    break;
                    case 'diamond':
                        $('#textTips').html('确认钻石：');
                        var diamondCount = $('#diamondCount').val();
                        $('#contTips').html('赠送钻石数量：'+ diamondCount);
                        method = 'diamond';
                    break;
                    case 'items':
                        $('#textTips').html('确认赠送游戏道具：');
                        var gameItem = $('#gameItem').val();
                        var tipWord = $('#gameItem option:selected').text();
                        $('#contTips').html('赠送道具名称：'+ tipWord);
                        method = 'items';
                    break;
                    case 'vipExp':
                        $('#textTips').html('确认赠送VIP经验：');
                        var vipExp = $('#vipExp').val();
                        $('#contTips').html('赠送VIP经验值：'+ vipExp);
                        method = 'vipExp';
                    break;
                    default:
                        console.log('参数错误');
                    break;
                };
            }
            //GM操作
            $scope.gmOperationConfirm = function(){
                var message = $scope.message;
                message.duration = msgTime; 
                message.uid = GetQueryString();
                var calSuccess = function(data, status, headers, config){
                    switch(method){
                        case 'freeze':

                        break;
                        case 'silence':
                            try{
                                var _status = data.data.code;
                                var res = data.result;
                                if(_status == '0'){
                                    $('#textTips').html('<span style="display:block;height:100px"></span>');
                                    $('#contTips').html('操作成功，正在回转');
                                    setTimeout(function(){
                                        $('#openWindow').hide();
                                    },1500)
                                }else{
                                    throw "1";
                                }
                            }catch(err){
                                $('#textTips').html('<span style="display:block;height:100px"></span>');
                                $('#contTips').html('操作失败，请检查用户在线状态');
                                setTimeout(function(){
                                    $('#openWindow').hide();
                                },1500)
                            }
                        break;
                        case 'loginOut':
                            try{
                                var _status = data.data.code;
                                var res = data.result;
                                if(_status == '0'){
                                    $('#textTips').html('<span style="display:block;height:100px"></span>');
                                    $('#contTips').html('操作成功，正在回转');
                                    setTimeout(function(){
                                        $('#openWindow').hide();
                                    },1500)
                                }else{
                                    throw "1";
                                }
                            }catch(err){
                                $('#textTips').html('<span style="display:block;height:100px"></span>');
                                $('#contTips').html('操作失败，请检查用户在线状态');
                                setTimeout(function(){
                                    $('#openWindow').hide();
                                },1500)
                            }
                        break;
                        case 'mission':

                        break;
                        case 'achieve':

                        break;
                        case 'gold':

                        break;
                        case 'diamond':

                        break;
                        case 'items':

                        break;
                        case 'vipExp':

                        break;
                        default:
                            console.log('参数错误')
                        break;
                    }
                    
                };
                var calError = function(data, status, headers, config) { console.log(status); };
                $http({
                     method : 'GET',
                     url : '/gmtool' + ajaxUrl,
                     params : message
                 }).success( calSuccess ).error( calError );

        }
               



     

}]);

