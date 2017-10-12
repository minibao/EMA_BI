/**
 * Created by Administrator on 2016/12/27.
 */
app.controller('aliserach',
    ['$scope', '$http', '$location', '$cookieStore', 'echartsService', 'uiGridConstants',
        function ($scope, $http, $location, $cookieStore, echartsService, uiGridConstants) {
            var message = {};

            $scope.gridalipay = {
                showGridFooter: true,
                showColumnFooter: true,
                enableGridMenu: true,
                enableSelectAll: true,
                exporterMenuPdf: false,
                exporterCsvFilename: 'Iospay.csv',
                exporterOlderExcelCompatibility: true,
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                }
            };
            var calSuccess = function (data, status, headers, config) {
                console.log(data);
                var showdata = data.data.alipay_trade_query_response;

                console.log(showdata.trade_no);
                if(typeof(showdata.trade_no)=="undefined"){
                    $(".showinfo").css("opacity", "1");
                    $(".showinfo").empty();
                    $(".showinfo").append("<div >没有查到相应的数据！</div> ");
                    return false;
                }
                var ob = objectisnull(showdata);
                if (message.tradeNo != null) {
                    if (ob != "kong") {
                        $(".showinfo").css("opacity", "1");
                        $(".showinfo").empty();

                        $(".showinfo").append("<div >trade_no:" + showdata.trade_no + "</div> <hr>");
                        $(".showinfo").append("<div >buyer_logon_id:" + showdata.buyer_logon_id + "</div> <hr>");
                        $(".showinfo").append("<div >buyer_pay_amount:" + showdata.buyer_pay_amount + "</div> <hr>");
                        $(".showinfo").append("<div >buyer_user_id:" + showdata.buyer_user_id + "</div> <hr>");
                        $(".showinfo").append("<div >code:" + showdata.code + "</div><hr>");
                        $(".showinfo").append("<div >invoice_amount:" + showdata.invoice_amount + "</div> <hr>");
                        $(".showinfo").append("<div >msg:" + showdata.msg + "</div> <hr>");
                        $(".showinfo").append("<div >open_id:" + showdata.open_id + "</div> <hr>");
                        $(".showinfo").append("<div >out_trade_no:" + showdata.out_trade_no + "</div> <hr>");
                        $(".showinfo").append("<div >point_amount:" + showdata.point_amount + "</div> <hr>");
                        $(".showinfo").append("<div >receipt_amount:" + showdata.receipt_amount + "</div> <hr>");
                        $(".showinfo").append("<div >send_pay_date:" + showdata.send_pay_date + "</div> <hr>");
                        $(".showinfo").append("<div >total_amount:" + showdata.total_amount + "</div> <hr>");
                        $(".showinfo").append("<div >trade_status:" + showdata.trade_status + "</div> <hr>");

                    } else {
                        $(".showinfo").css("opacity", "1");
                        $(".showinfo").empty();
                        $(".showinfo").append("<div >没有查到该信息对应的内容！</div>");
                    }
                } else {
                    $(".showinfo").css("opacity", "1");
                    $(".showinfo").empty();
                    $(".showinfo").append("<div >无效的提交！</div>");

                }
            };

            var calError = function (data, status, headers, config) {
                console.log(status);
            };

            $scope.serachbytradeno = function () {
                $(".showinfo").empty();
                var tradeno = ($('#inputtradeno').val().length == 0 ? null : $('#inputtradeno').val());
                message.tradeNo = tradeno;
                if (tradeno == null) {
                    alert("tradeno不能为空");
                } else {

                    $http({
                        method: 'POST',
                        url: '/gmtool' + requires.PF_MANAGE_ZHIFUBAO_SEO,
                        params: message
                    }).success(calSuccess).error(calError);
                }
            }


        }]);

$(function () {
    if ($(".showinfo").find('div')) {
        $(".showinfo").css("opacity", "0");
    }
})

function objectisnull(obj) {
    for (var k in obj) {
        if (obj[k]) {
            return obj;

        }
    }
    return "kong";
}