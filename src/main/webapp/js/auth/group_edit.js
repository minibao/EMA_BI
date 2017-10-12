app.controller('authGroupEdit',
    ['$scope', '$http', '$location', '$cookieStore', 'echartsService',
        function ($scope, $http, $location, $cookieStore, echartsService) {
            var searchObject = $location.search();
            var groupId = searchObject.groupId;
            if (!groupId) {
                $scope.changeLocation('./groupList.jsp?mid=' + message.mid + "&token=" + message.token, true);
                return;
            }
            $scope.sysRole = {};
            var groupDetail = function () {
                var calSuccess = function (data, status, headers, config) {
                    $scope.sysRole = data.role || {};
                    $scope.treecheck = ',' + $scope.sysRole.readableRights;

                    $scope.interfaces = ',' + $scope.sysRole.interfaces + ',';
                };
                var calError = function (data, status, headers, config) {
                    console.log(status)
                };
                var message = $scope.message;
                message.id = groupId;
                $http({
                    method: 'GET',
                    url: '/gmtool' + requires.AUTH_GROUP_DETAIL,
                    params: message
                }).success(calSuccess).error(calError);
            }
            groupDetail();

            $scope.groupEditSubmit = function () {
                var checkedboxVals = [];
                _.each($("input[name=checkboxAuth]:checked"), function (checkedItem) {
                    checkedboxVals.push($(checkedItem).val());
                });
                var groupNameVal = $('input[name=groupName]').val();
                if (_.isNull(groupNameVal) || groupNameVal.length < 1) {
                    alert('权限组名字不能为空');
                    return;
                }
                submitGoupEdit(groupId, groupNameVal, checkedboxVals);

                function submitGoupEdit(groupId, groupNameVal, checkedboxVals) {
//                    var message = {
//                    	id : groupId,
//                    	groupName: groupNameVal,
//                    	groupGame: '',
//                    	groupStatus: $('input[name=radioStatus]:checked').val()||0,
//                    	menuIds: checkedboxVals.join(','),
//                    };

                    var message = $scope.message;
                    message.id = groupId;
                    message.groupName = groupNameVal;
                    message.groupGame = '';
                    message.groupStatus = $('input[name=radioStatus]:checked').val() || 0;
                    message.menuIds = checkedboxVals.join(',');
                    var arr = [];
                    $('#slcChnForm input[type="checkbox"]').each(function () {
                        if ($(this).is(":checked")) {
                            arr.push($(this).val());
                        }
                    })
                    message.interfaces = arr.join(',');
                    var calSuccess = function (data, status, headers, config) {
                        $scope.changeLocation('./groupList.jsp?mid=' + message.mid + "&token=" + message.token, true);
                    };
                    var calError = function (data, status, headers, config) {
                        console.log(status)
                    };
                    $http({
                        method: 'POST',
                        url: '/gmtool' + requires.AUTH_GROUP_EDIT,
                        params: message
                    }).success(calSuccess).error(calError);

                }
            }


        }]);
