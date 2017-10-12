/**
 * Created by Administrator on 2017/1/3.
 */
app.controller('statsResourceGold',
    ['$scope', '$http', '$location', '$cookieStore', 'echartsService',
        function($scope, $http, $location, $cookieStore, echartsService){
            $scope.filter = {channel: '', server: '', time: ''};
            var resourceDict = {
                "CATEGORY": [],
                "RESOURCE_TYPE": []
            };
            $scope.filter.vocation = $scope.vocations[0];
            $scope.resourceTree = [
                {
                    inOutType: '消耗',
                    inOutTypeVal: 'out',
                    resourceType: []
                },
                {
                    inOutType: '获得',
                    inOutTypeVal: 'in',
                    resourceType: []
                },
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

            $scope.resourceChange = function() {
                $scope.resourceType = $scope.inOutType.resourceType[0];
            }

            $http({
                method : 'GET' ,
                url : '/gmtool' + requires.SYS_LOAD_DICTRESOURCE
            }).success( function(data, status, headers, config){
                var resData = data.data.resource;
                _.each(resData, function(item) {
                    resourceDict[item.dictType].push({dictValue: item.dictValue, dictName: item.dictName});
                    if (item.dictType == "RESOURCE_TYPE") {
                        if (item.dictValue.charAt(1) == 'o') {
                            $scope.resourceTree[0].resourceType.push({dictValue: item.dictValue, dictName: item.dictName});
                        }
                        else if (item.dictValue.charAt(1) == 'i') {
                            $scope.resourceTree[1].resourceType.push({dictValue: item.dictValue, dictName: item.dictName});
                        }
                        else if (item.dictValue.charAt(1) == 't') {
                            $scope.resourceTree[0].resourceType.push({dictValue: item.dictValue, dictName: item.dictName});
                            $scope.resourceTree[1].resourceType.push({dictValue: item.dictValue, dictName: item.dictName});
                        }
                    }
                })

                $scope.category = resourceDict["CATEGORY"];
                $scope.categoryType = $scope.category[0];
                $scope.inOutType = $scope.resourceTree[0];
                $scope.resourceType = $scope.inOutType.resourceType[0];
            });

            $scope.statsResourcedetial = function(){
                var message = $scope.message;
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
                message.inOutType =$scope.inOutType.inOutTypeVal;
                message.resourceType = $scope.resourceType.dictValue;
                message.category =$("#category").attr("categoryid");
                message.subId = $('#subId').val();


                $scope.gridOptions.columnDefs = [];
                $scope.gridOptions.data = [];

                var calSuccess = function(data){
                    var detailList = data.data;
                    var gridData = [];
                    var vocationText = $('#vactionSelect option:selected').text();
                    var inOutTypeText = $('#inOutType option:selected').text();
                    _.each(detailList, function(item){
                        item.channel == null ? item.channel = '-' : item.channel;
                        item.channeltag == null? item.channeltag = '-':item.channeltag;
                        item.containerName == null ? item.containerName = '-':item.containerName;
                        var gData = {};
                        gData ={
                            "服务器": item.containerName,
                            "渠道": item.channel,
                            "子渠道": item.channeltag,
                            "职业": $scope.vocationName[item.vocation],
                            "等级":item.level,
                            "资源种类":$("#category").attr("category"),   //暂用
                            "IN/OUT":item.inOutType,
                            "总量":item.amount,
                            "资源来源":$scope.resourceType.dictName, //暂用
                        }
                        if(!(message.subId == '')){
                            gData['SubId'] = item.subId
                        }
                        gridData.push(gData);
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
                    url : '/gmtool' + requires.STATS_RESOURCE,
                    params : message
                }).success( calSuccess ).error( calError ) ;
                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
            }

        }]);
