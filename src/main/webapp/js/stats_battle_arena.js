/**
 * Created by Administrator on 2017/1/3.
 */

app.controller('statsBattleArena',
    ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants',
        function($scope, $http, $location, $cookieStore, echartsService, uiGridConstants){
            $scope.filter = {channel: '', server: '', time: ''};
            $scope.columns = [
                {field:'服务器'},
                {field:'渠道'},
                {field:'子渠道'},
                {field:'战斗类型'},
                {field:'持续时长'},
                {field:'时间总和'},
                {field:'难度'},
                {field:'等级'},
                {field:'怪物ID'},
                {field:'人数', aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true},
                {field:'次数', aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true},
                {field:'职业'},
                {field:'BOSS'},
                {field:'组队'},
                {field:'胜利'},
            ];
            $scope.gridOptions = {
                columnDefs: $scope.columns,
                showGridFooter: true,
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

            var difficultyArr = ['简单','普通','困难','英雄'];
            var battleTypeArr = ['非竞技场','竞技场'];
            //默认职业
            $scope.filter.vocation = $scope.vocations[0];
            $scope.statsBattledetial = function() {

                var message = $scope.message;
                message.battleType = $('#battleType').val();//是否是竞技场
                message.channel = $scope.filter.channel==null?null:$scope.filter.channel.chnValue;
                message.channelTag = ($scope.filter.channelTag==null || $scope.filter.channelTag.length==0)?null:$scope.filter.channelTag.join(',');
                message.containerName =  $scope.filter.server==null?null:$scope.filter.server.containerValue;
                message.gameName = 'everAdventure';
                message.dateStart = $(".date-picker-star:eq(0)").val();
                message.dateEnd = $(".date-picker-end:eq(0)").val();
                message.createDateStart = $(".date-picker-star:eq(1)").val();
                message.createDateEnd = $(".date-picker-end:eq(1)").val();
                message.levelStart = $('#levelStart').val();
                message.levelEnd = $('#levelEnd').val();
                message.levelInterval = $('#levelInterval').val() == ''?10:$('#levelInterval').val();
                message.vocationId = $scope.filter.vocation.value;
                message.isWin = $('#isWin').val();
                message.isTeam = $('#isTeam').val();
                message.isBoss = $('#battleType').val() == 0 ? $('#isBoss').val():0;
                message.difficulty = $('#difficulty').val();
                message.formationId = $('#formationId').val();
                message.durationStart = $('#durationStart').val();
                message.durationEnd = $('#durationEnd').val();
                message.durationInterval = $('#durationInterval').val() == 0 ? 30 : $('#durationInterval').val();

                var calSuccess = function(data) {
                    var detailList = data.data;
                    var gridData = [];
                    var fileName = ['战斗统计表'];
                    fileName.push(message.dateStart + '至' + message.dateEnd + '战斗统计表');
                    $scope.gridOptions.exporterCsvFilename = fileName + '.csv';

                    _.each(detailList, function(item) {
                        item.channel == null ? item.channel = '-' : item.channel;
                        item.channeltag == null? item.channeltag = '-':item.channeltag;
                        item.containerName == null ? item.containerName = '-':item.containerName;
                        gridData.push({
                            "服务器": item.containerName,
                            "渠道": item.channel,
                            "子渠道": item.channeltag,
                            "战斗类型": battleTypeArr[item.battleType],
                            "持续时长": item.duration,
                            "时间总和":item.sumDuration,
                            "难度": difficultyArr[item.difficulty],
                            "等级": item.level,
                            "怪物ID": item.formationId,
                            "人数": item.playerCnt,
                            "次数": item.cnt,
                            "职业": $scope.vocationName[item.vocation],
                            "BOSS": item.isBoss == 1?'是':'否',
                            "组队": item.isTeam == 1?'是':'否',
                            "胜利": item.win== 1?'是':'否'
                        });
                    });

                    $scope.gridOptions.data = gridData;

                    spinner.spin();
                };

                var calError = function(data, status, headers, config) {
                    console.log(status);
                    spinner.spin();
                };

                $http({
                    method : 'GET' ,
                    url : '/gmtool' + requires.STATS_BATTLE,
                    params : message
                }).success( calSuccess ).error( calError ) ;

                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
            }
        }]);