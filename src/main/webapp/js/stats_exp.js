app.controller('statsExp', ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants',
    function($scope, $http, $location, $cookieStore, echartsService, uiGridConstants) {
        $scope.filter = { channel: '', server: '', time: '' };
        $scope.columns = [
            { field: '时间'},
            { field: '类别'},
            { field: '数量', aggregationType: uiGridConstants.aggregationTypes.sum, enableFiltering: false }
        ];
        $scope.gridOptions = {
            columnDefs: $scope.columns,
            treeRowHeaderAlwaysVisible: false,
            enableRowSelection: false,
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
            $scope.gridApi.exporter.csvExport('all', 'all', myElement);
        };

        $scope.expDetail = function() {
            var message = $scope.message;
            message.containerName = $scope.filter.server == null ? null : $scope.filter.server.containerValue;
            message.channel = $scope.filter.channel == null ? null : $scope.filter.channel.chnValue;
            message.channelTag = ($scope.filter.channelTag==null || $scope.filter.channelTag.length==0)?null:$scope.filter.channelTag.join(',');
            message.dateInfo = $(".date-picker-single").val();
            message.startD = $(".date-picker-star").val();
            message.endD = $(".date-picker-end").val();
            message.category = 97;  //经验=97

            var calSuccess = function(data) {
                var detailList = data.detail;
                var gridData = [];
                var fileName = ['经验获得'];
                $scope.columns = [
                    { field: '时间',sort: {
                            direction: 'desc', priority: 0 
                        }},
                    { field: '类别' },
                    { field: '数量', aggregationType: uiGridConstants.aggregationTypes.sum, enableFiltering: false }
                ];

                fileName.push($('#categorySlc option:selected').text());
                if ($scope.filter.server != null && $scope.filter.server != '') {
                    fileName.push($scope.filter.server.containerName);
                    $scope.columns.splice($scope.columns.length - 3, 0, { field: '服务器' });
                }
                if ($scope.filter.channel != null && $scope.filter.channel != '') {
                    fileName.push($scope.filter.channel.chnName);
                    $scope.columns.splice($scope.columns.length - 3, 0, { field: '渠道' });
                }
                if ($scope.filter.channelTag != null && $scope.filter.channelTag != '') {
                    fileName.push($scope.filter.channelTag);
                    $scope.columns.splice($scope.columns.length - 3, 0, { field: '子渠道' });
                }
                fileName.push(message.startD + '至' + message.endD);
                $scope.gridOptions.exporterCsvFilename = fileName.join('-') + '.csv';
                $scope.gridOptions.columnDefs = $scope.columns;
                _.each(detailList, function(item) {
                        gridData.push({
                            "时间": item.dateInfo,
                            "服务器": item.containerName,
                            "渠道": item.channel,
                            "子渠道": item.channelTag,
                            "类别": item.resourceType,
                            "数量": item.amount
                        });
                    });
                $scope.gridOptions.data = gridData;
            };

            var calError = function(data, status, headers, config) {
                console.log(status)
            };

            $http({
                method: 'GET',
                url: '/gmtool' + requires.STATS_CONSUME_DETAIL,
                params: message
            }).success(calSuccess).error(calError);

        };
        setTimeout(function() {
            $scope.expDetail();
        }, $scope.reqDelay);
    }
]);
