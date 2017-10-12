<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/jsp/commons/_header.jsp" %>

<div class="main-content span9 plantform-active-page" ng-controller="statsPlantformActiveTimeshare">
    <h1 class="text-center">平台分时活跃</h1>
    <hr>

    <%--<h2 class="text-center check-selector-btn">实时对比数据</h2>--%>

    <form class="form-inline">
            <%@ include file="/jsp/commons/_plantformselectors_2.jsp" %>
            <span>对比时间：<%@ include file="/jsp/commons/_datepicker.jsp" %></span>
            <button type="submit" class="btn" ng-click="PlantformactiveUserCompare()">搜索</button>
        <hr>
        <div id="statsPlantFormActiveUserCompare" ui-grid="gridOptions" style="width:100%; height:400px;"></div>
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
<script src="${ctx}/js/pf/stats_plantform_active_timeshare.js"></script>
<%@ include file="/jsp/commons/_footer.jsp" %>
