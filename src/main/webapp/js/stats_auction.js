app.controller('statsAuction', 
        ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants','$sessionStorage',
        function($scope, $http, $location, $cookieStore, echartsService, uiGridConstants,$sessionStorage){
            $scope.hideGrid = $sessionStorage.excelShow;
            $scope.$watch('hideGrid',function(){
                $sessionStorage.excelShow = $scope.hideGrid;
            });
            $scope.filter = {channel: '', server: '', time: ''};
            $scope.gridOptions = {
                treeRowHeaderAlwaysVisible: false,
                enableRowSelection: false,
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
            
            var statsAuctionChart = echartsService.line('statsAuction', '金币拍卖行', ['成交均价'], '成交均价'); ;
            
            $scope.auctionAnalyze = function() {
                var message = $scope.message;
                message.containerName = $scope.filter.server==null?null:$scope.filter.server.containerValue;
                message.channel = $scope.filter.channel==null?null:$scope.filter.channel.chnValue;
                message.channelTag = ($scope.filter.channelTag==null || $scope.filter.channelTag.length==0)?null:$scope.filter.channelTag.join(',');
                message.startD = $(".date-picker-star:eq(0)").val();
                message.endD = $(".date-picker-end:eq(0)").val();
                message.crstartD = $(".date-picker-star:eq(1)").val();
                message.crendD =$(".date-picker-end:eq(1)").val();
                message.lvFrom = $("input[name=levelFrom]").val();
                message.lvTo =  $("input[name=levelTo]").val();

                $scope.gridOptions.columnDefs = [];
                $scope.gridOptions.data = [];
                
                var calSuccess = function(data, status, headers, config){
                    var auctions = data.auctions;
                    var e_dataAvg = [];
                    var e_dataG = [];
                    var e_dataD = [];
                    var gridData = [];
                    var fileName = [];
                    $scope.columns = [
                        {field: '时间',sort: {
                            direction: 'desc', priority: 0 
                        }},
                        {field: 'UID'},
                        {field: '等级'},
                        {field: '服务器'},
                        {field: '渠道'},
                        {field: '子渠道'},
                        {field: '成交金币', aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true},
                        {field: '成交钻石', aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true},
                        {field: '均价', aggregationType: uiGridConstants.aggregationTypes.avg, aggregationHideLabel: true}
                    ];
                      
                    //下载表名
                    fileName.push(message.startD + '至' + message.endD + '拍卖行分析统计表');
                    $scope.gridOptions.exporterCsvFilename = fileName + '.csv';
                    $scope.gridOptions.columnDefs = $scope.columns;   
                    _.each(auctions, function(item){		    			
                        e_dataAvg.push([item.dateInfo,new Number(item.itemNum/item.totalPrice).toFixed(2)]);
                        e_dataG.push([item.dateInfo,item.itemNum]);
                        e_dataD.push([item.dateInfo,item.totalPrice]);
                        gridData.push({
                            "时间": item.dateInfo,
                            "UID":item.uid,
                            "等级":item.lv,
                            "服务器":item.containerName,
                            "渠道":item.channel,
                            "子渠道":item.channelTag,
                            "成交金币": item.itemNum,
                            "成交钻石": item.totalPrice,
                            "均价": new Number(item.itemNum/item.totalPrice).toFixed(2)
                        });
                    });
                    $scope.gridOptions.data = gridData;
                    
                    var offNum = data.offNum || 0;
                    var sellNum = data.sellNum || 0;
                    var buyNum = data.buyNum || 0;
                    var totalGold = data.totalGold || 0;
                    var totalDiamond = data.totalDiamond || 0;
                    
                    var subTitleArr = ['成交:'+buyNum, '总金币:'+totalGold, '总钻石:'+totalDiamond, '上架:' + sellNum, '下架:'+offNum];
                    var subTitleStr = subTitleArr.join(" ");
                    
                    statsAuctionChart.setOption({
                        legend: {
                            data: ['成交均价','成交金币','成交钻石']
                        },
                        title: {
                        	subtext: subTitleStr
                        },
                        //显示工具条
                        toolbox: {
                            show: true,
                            feature: { saveAsImage: {} }
                        },
                        //缩放
                        dataZoom : {
                            show : true,
                            realtime : true,
                            type:'inside'
                        },
                        xAxis: {
                            type: 'time'
                        },
                        yAxis: [
                            {
                                type: 'value'
                            },
                            {
                                name: '成交金币',
                                nameLocation: 'end',
                                show:false,
                                type: 'value'
                            },
                            {
                                name: '成交钻石',
                                nameLocation: 'end',
                                show:false,
                                type: 'value',
                                position: 'right',
                                offset: 50
                            }
                        ],
                        series: [
                            {
                                name: '成交均价',
                                type: 'line',
                                data: e_dataAvg,
                                itemStyle: {
                                    normal: {
                                        opacity:0
                                    }
                                },
                            },
                            {
                                name: '成交金币',
                                type: 'line',
                                data: e_dataG,
                                yAxisIndex:1,
                                itemStyle: {
                                    normal: {
                                        opacity:0
                                    }
                                },
                            },
                            {
                                name: '成交钻石',
                                type: 'line',
                                data: e_dataD,
                                yAxisIndex:2,
                                itemStyle: {
                                    normal: {
                                        opacity:0
                                    }
                                },
                            }
                        ]
                    });
                    spinner.spin(); 
                };
                
                var calError = function(data, status, headers, config) {
                    console.log(status);
                    spinner.spin(); 
                };				
                $http({
                    method : 'GET' ,
                    url : '/gmtool' + requires.STATS_AUCTION_ANALYZE,
                    params : message
                }).success( calSuccess ).error( calError ) ;
                var spinner = new Spinner();
                var target = $("#spin").get(0);
                spinner.spin(target);
            };
            setTimeout(function() {
                $scope.auctionAnalyze();
            }, $scope.reqDelay);
}]);