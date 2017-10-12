app.controller('statsGmtoolPublicAct', 
        ['$scope', '$http', '$location', '$cookieStore',
         function($scope, $http, $location, $cookieStore) {

            $scope.openPublicActSetting = function(str_num){
                var _index = str_num - 0;
                var text =  $('#tbodyList tr:eq('+_index+') td');
                $scope.effectOverdue = text[3].innerText;
                $scope.actTitle = text[0].innerText;
                $('#openWindowMasking').show();
                $(".date-picker-single:eq(0)").val(text[1].innerText);
                $(".date-picker-single:eq(1)").val(text[2].innerText);

            }



             

}]);

