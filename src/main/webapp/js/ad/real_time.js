app.controller('realTimeCtrl', 
        ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants',
        function($scope, $http, $location, $cookieStore, echartsService, uiGridConstants){
            $scope.filter = {channel: '', server: '', time: ''};
            $scope.ciyuan = {channel: {}, alliance: {} };
            var realNewRoleChart = echartsService.line('realNewRoleChart', '实时新增数据统计表');
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
            $scope.export = function() {
              var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
              $scope.gridApi.exporter.csvExport( 'all', 'all', myElement );
            };
            //定义当前时间
            function newDay(){
              var nowDay = new Date(); 
              var today = nowDay.getFullYear() + '-' + addO((nowDay.getMonth() + 1))+ '-' + addO(nowDay.getDate());
              return today;
            };
            //初始化游戏选择
            $scope.appId = 20007;
            //查询函数
            $scope.roleRealTime = function(){
              //定义通量
              var SETURL = '';
              var COUNT = [];
              //初始化grid数据
              var gridData = [];
              // echarts 数据初始化
              var echartsData = [];
              var lengedData = [];
              //参数根据选择游戏判断
              var message = $scope.message;
              message.appId =  $scope.appId;
              var today = newDay();
              message.startD = today + '+00:00:00';
              message.endD = today + '+23:59:59'; 
              switch($scope.appId){
                //匹配次元
                case '20015':
                  message.server = ($scope.ciyuan.server == null || $scope.ciyuan.server.length == undefined) ? '': $scope.ciyuan.server;
                  message.channel =  ($scope.ciyuan.alliance==null || $scope.ciyuan.alliance.length== undefined) ? '': $scope.ciyuan.alliance.join(',');
                  SETURL = '';
                break;
                //匹配英灵
                case '20012':

                break;
                //匹配无尽
                case '20007':
                  message.channel = $scope.filter.channel==null ?'':$scope.filter.channel.chnValue;
                  message.channelTag = ($scope.filter.channelTag==null || $scope.filter.channelTag.length==0) ? '':$scope.filter.channelTag.join(',');
                  message.containerName =  $scope.filter.server==null ?'':$scope.filter.server.containerValue;
                  //表格表头
                  $scope.gridOptions.columnDefs = [
                    {field: '时间',sort: {
                            direction: 'desc', priority: 0 
                        }},
                    {field: '新增人数'},
                    ]
                    if(message.containerName){
                      $scope.gridOptions.columnDefs.splice(1,0, {field: '服务器'});
                      lengedData.push(message.containerName);
                    }else{lengedData.push('全服务器')};
                    if(message.channel){
                      $scope.gridOptions.columnDefs.splice(2,0,{field: '渠道'});
                      lengedData.push(message.channel);
                    }else{lengedData.push('全渠道')};
                    if(message.channelTag){
                      $scope.gridOptions.columnDefs.splice(3,0,{field: '子渠道'});
                      COUNT.length < 2 ? lengedData.push(message.channelTag) : lengedData;
                    }else{lengedData.push('全子渠道')};
                  SETURL = requires.STATS_NEWROLE_REALTIME;
                break;
                //匹配失败
                default:
                  console.log('匹配游戏字段失败');
                break;
              }
              //call success
              var calSuccess = function(data, status, headers, config){
                //判断服务器状态
                if(data.result != 0){
                    console.log('服务器联系失败，请检查服务器状态')
                    return false; 
                  };
                //根据选择游戏判断生成函数
                switch($scope.appId){
                  //匹配次元
                  case '20015':
                    var dataBack = '';
                  break;
                  //匹配英灵
                  case '20012':
                    var dataBack = '';
                  break;
                   //匹配无尽
                  case '20007':
                    var dataBack = data.dailynew;
                    COUNT = message.channelTag.split(',');
                    _.each(dataBack,function(item){
                      //表格数据
                      var gData = {
                        '时间': item.dateInfo,
                        '新增人数' : item.newRole
                      };
                      if(message.containerName){
                        gData['服务器'] = item.containerName;
                      };
                      if(message.channel){
                        gData['渠道'] = item.channel;
                      };
                      if(message.channelTag){
                        gData['子渠道'] = item.channelTag;
                      };
                      gridData.push(gData);
                      //echarts 数据
                      if(COUNT.length < 2){
                        echartsData.push([item.dateInfo,item.newRole]);
                      }
                    })
                  break;
                  //匹配失败
                default:
                break;
                };
                //grid 表格
                $scope.gridOptions.data = gridData;
                //ecahrts 图表
                if (realNewRoleChart == null){
                    realNewRoleChart = echartsService.line('realNewRoleChart', '实时新增数据统计表');
                }else{
                    realNewRoleChart.dispose();
                    realNewRoleChart = echartsService.line('realNewRoleChart', '实时新增数据统计表');
                }
                if(COUNT.length < 2){
                  realNewRoleChart.setOption({
                  legend: { data: [lengedData.join('-')]},
                  //显示工具条
                  toolbox: {
                      show: true,
                      feature: { saveAsImage: {} }
                  },
                  //缩放
                  dataZoom: {
                      show: true,
                      realtime: true,
                      type: 'inside'
                  },
                  xAxis: { type: 'time' },
                  yAxis: [
                      { type: 'value' }
                  ],
                  series: [{
                    name:lengedData.join('-'),
                    type:'line',
                    data:echartsData
                    }]
                  });
                }
                spinner.spin();
              };    
              var calError = function(data, status, headers, config){
                console.log('参数错误：' + status);
                spinner.spin();
              };
               $http({
                        method : 'GET',
                        url : '/gmtool' + SETURL,
                        params : message
                    }).success( calSuccess ).error( calError );  
                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
            };
            setTimeout(function() {
                $scope.roleRealTime();
            }, $scope.reqDelay);
}]);

//style controll 
$(function(){

});
