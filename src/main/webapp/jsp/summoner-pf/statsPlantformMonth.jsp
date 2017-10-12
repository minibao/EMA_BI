<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/jsp/commons/_header.jsp" %>

<div class="main-content span9 plantform-userpay-page" ng-controller="statsPlantformMonth">
    <h1 class="text-center">英灵数据统计（按月统计）</h1>
    <div class="pf-btn active"><a style="color:#000" onclick="history.go(-1)">返回平台统计<a></div>
    <hr>
    <form class="form-inline">
        <%@ include file="/jsp/commons/_plantformselectors_2.jsp" %>
        <span>选择时间:<%@ include file="/jsp/commons/_daterangepicker.jsp" %></span>
        <button type="submit" class="btn" ng-click="Plantformmonth()">搜索</button>
        <hr>
        <div style="height: 700px;max-height: 400px;" ui-grid="gridOptions" ui-grid-selection ui-grid-exporter
             ui-grid-grouping ui-grid-resize-columns
             ui-grid-move-columns class="myGrid"></div>
        <div id="spin"></div>
    </form>
</div>
<style>
    .channeltag.btn-group select {
        display: none;
    }
    .channeltag .dropdown-menu {
        display: none;
    }
</style>

<script>
    $(document).on("click", ".pf-multi-show-hide button", function () {
        layer.msg('暂不支持子渠道选择！');
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
<script src="${ctx}/js/summoner-pf/stats_plantformmonth.js"></script>
<%@ include file="/jsp/commons/_footer.jsp" %>
