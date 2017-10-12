<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/jsp/commons/_header.jsp" %>

<div class="main-content span9 plantform-userpay-page" ng-controller="statsPlantformBigR">
    <h1 class="text-center">新增大R</h1>
    <hr>
    <form class="form-inline">
        <span>选择时间:<%@ include file="/jsp/commons/_daterangepicker.jsp" %></span>
        <button type="submit" class="btn" ng-click="getdata_bigr()">搜索</button>
        <hr>
        <div style="height: 700px;max-height: 1000px;" ui-grid="gridOptions" ui-grid-selection ui-grid-exporter
             ui-grid-grouping ui-grid-resize-columns
             ui-grid-move-columns class="myGrid"></div>
        <div id="spin"></div>
    </form>
</div>
<script>
    $(document).ready(function () {
        var nowDay = new Date();
        var dateToday = nowDay.getFullYear() + '-' + addO((nowDay.getMonth() + 1)) + '-' + addO(nowDay.getDate())
        //初始化时间插件
        initializationDateRange();
        initializationDatesingel();
        initializationdDefaultValue();
        $('.date-picker-single').datetimepicker('setEndDate', nowDay);
        //切换选项按钮
        $('.check-selector-btn button').on('click', function () {
            $(this).addClass('btn-success').siblings().removeClass('btn-success');
        })
    })
</script>
<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/pf/stats_plantform_big_r.js"></script>
<%@ include file="/jsp/commons/_footer.jsp" %>
