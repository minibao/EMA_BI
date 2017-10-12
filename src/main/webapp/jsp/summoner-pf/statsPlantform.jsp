<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/jsp/commons/_header.jsp" %>
<div style="position: relative;" class="main-content span9 plantform-active-page">
    <h1 class="text-center">英灵数据</h1>

    <div class="">
        <div class="pf-btn active">实时统计</div>
        <div style="font-size: 16px;display: inline-block;padding: 0 5px;">/</div>
        <div class="pf-btn">日统计</div>
        <div style="font-size: 16px;display: inline-block;padding: 0 5px;">/</div>
        <div class="pf-btn">月统计</div>
    </div>
    <hr>
    <div ng-controller="statsPlantformday">
        <div id="daycount">
            <form class="form-inline">
                <div style="margin-bottom: 10px;">
                    <code style="padding: 2px 4px;font-size: 90%;color: #c7254e;background-color: #f9f2f4;border-radius: 4px;">NUU : 游戏新增帐号</code>
                    <code style="padding: 2px 4px;font-size: 90%;color: #c7254e;background-color: #f9f2f4;border-radius: 4px;">DAU : 游戏活跃帐号</code>
                    <h4>实时统计</h4>
                    <%@ include file="/jsp/commons/_plantformselectors_2.jsp" %>
                    <span>选择时间:<%@ include file="/jsp/commons/_datepicker.jsp" %></span>
                    <button type="submit" class="btn btn-small btn-primary"
                            ng-click="Plantformday(); PlantformactiveUserCompare('ajax');PlantformnewgrowUserCompare('ajax');PlantformnewPayCompare();PlantformtotalAmount()">
                        搜索
                    </button>
                </div>
                <div ui-grid="gridOptions" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns
                     ui-grid-move-columns style="width:100%; height:150px;"></div>
                <div class="spin" id="spin1"></div>
            </form>
            <hr>

            <%--DAU--%>
            <h4>DAU</h4>

            <div class="text-center check-selector-btn">
                <button class="btn btn-small btn-success"
                        ng-click="compareSlc('uidCountDau');methodCompare = 'uidCountDau' ">活跃用户
                </button>
                <button class="btn btn-small"
                        ng-click="compareSlc('deviceCountDau');methodCompare = 'deviceCountDau' ">活跃设备
                </button>
            </div>
            <div id="spin_dau"></div>
            <div id="statsPlantDau" style="width:100%; height:400px;"></div>
            <hr>

            <%--NUU--%>
            <h4>NUU</h4>

            <div class="text-center check-selector-btn">
                <button class="btn btn-small btn-success"
                        ng-click="compareSlc1('uidCountNuu');methodCompare = 'uidCountNuu' ">新增用户
                </button>
                <%--<button class="btn btn-small"--%>
                        <%--ng-click="compareSlc1('deviceCountNuu');methodCompare = 'deviceCountNuu' ">新增设备--%>
                <%--</button>--%>
            </div>
            <div id="spin_nuu"></div>
            <div id="statsPlantNuu" style="width:100%; height:400px;"></div>
            <hr>

            <%--PAY--%>
            <h4>PayRate</h4>

            <div class="text-center check-selector-btn">
                <button class="btn btn-small btn-success"
                        ng-click="compareSlc2('uidCountPay');methodCompare = 'uidCountPay' ">付费人数
                </button>
                <button class="btn btn-small"
                        ng-click="compareSlc2('deviceCountPay');methodCompare = 'deviceCountPay' ">付费率
                </button>
            </div>
            <div id="spin_pay"></div>
            <div id="statsPlantPay" style="width:100%; height:400px;"></div>
            <hr>

            <%--totalAmount--%>
            <h4>付费金额</h4>
            <div class="text-center check-selector-btn">
                <%--<button class="btn btn-small btn-success"--%>
                        <%--ng-click="compareSlc3('uidCounttotalAmount');methodCompare = 'uidCounttotalAmount' ">付费人数--%>
                <%--</button>--%>
            </div>
            <div id="spin_totalAmount"></div>
            <div id="statsPlanttotalAmount" style="width:100%; height:400px;"></div>
            <hr>
        </div>

        <%--日统计(详细)--%>
        <div id="monthcount">
            <form class="form-inline">
                <div style="margin-bottom: 10px;">
                    <h4>日统计</h4>
                    <%@ include file="/jsp/commons/_plantformselectors_2.jsp" %>
                    <span>选择时间:<%@ include file="/jsp/commons/_daterangepicker.jsp" %></span>
                    <%--<select class="multi-select retention" selectpicker multiple data-actions-box="true"--%>
                    <%--ng-model="filter.reday"--%>
                    <%--ng-options="item.dictName for item in retentionFilter" tickIcon="icon-ok" title="选择留存日期">--%>
                    <%--</select>--%>
                    <button type="submit" class="btn" ng-click="PlantformManyday();">搜索</button>
                </div>
                <div ui-grid="gridOptions1" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns
                     ui-grid-move-columns style="width:100%; height:250px;">
                </div>
                <hr>
                <div class="spin" id="spin3"></div>
                <h4>跟踪</h4>
                <h5 ><span style="background: #0070cc;color: #fff;padding: 4px 10px;" class="h5title">NUU</span></h5>

                <div ui-grid="gridOptions2" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns
                     ui-grid-move-columns style="width:100%; height:300px;">
                </div>
                <div class="text-center" style="padding-top:30px;">
                    <button class="undo btn btn-small">前十天</button>
                    <button class="undo btn btn-small">后十天</button>
                </div>

            </form>
        </div>
    </div>

</div>

<style>
    .channeltag.btn-group select {
        display: none;
    }

    .channeltag .dropdown-menu {
        display: none;
    }

    footer {
        display: none;
    }

    .footerline {
        display: none;
    }

</style>
<script>
    $(document).on("click", ".pf-multi-show-hide button", function () {
        layer.msg('暂不支持子渠道选择！');
    })

    $(document).on("click", ".undo", function () {
        layer.msg('暂不支持！');
    })

    $(document).ready(function () {
        var nowDay = new Date();
        var dateToday = nowDay.getFullYear() + '-' + addO((nowDay.getMonth() + 1)) + '-' + addO(nowDay.getDate());
        //初始化时间插件
        initializationDateRange();
        initializationDatesingel();
        initializationdDefaultValue();
        $('.date-picker-single').datetimepicker('setEndDate', nowDay);
        //切换选项按钮
        $('.check-selector-btn button').on('click', function () {
            $(this).addClass('btn-success').siblings().removeClass('btn-success');
        })

        //关闭app选项
        $('.dropdown .data-app-rel').find('option[label="英灵召唤师"]').show().siblings().hide();
    })
</script>
<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/summoner-pf/stats_plantform.js"></script>
<%--<script src="${ctx}/js/pf/stats_plantformmonth.js"></script>--%>
<%@ include file="/jsp/commons/_footer.jsp" %>
