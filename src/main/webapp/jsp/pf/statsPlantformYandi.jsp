<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/jsp/commons/_header.jsp" %>

<div class="main-content span9 plantform-active-page" ng-controller="statsPlantformYandi">
    <h1 class="text-center">平台延递数据</h1>
    <hr>
    <%--<h2 class="text-center check-selector-btn">实时对比数据</h2>--%>
    <form class="form-inline">
        <%@ include file="/jsp/commons/_plantformselectors_2.jsp" %>
        <span>选择时间:<%@ include file="/jsp/commons/_daterangepicker.jsp" %></span>
        <select class="multi-select" selectpicker multiple data-actions-box="true" ng-model="filter.reday"
                ng-options="item.dictName for item in retentionFilter" tickIcon="icon-ok" title="选择留存日期">
        </select>
        <button type="submit" class="btn" ng-click="PlantformYandi();PlantformLTV();">搜索</button>
        <%--<button type="submit" class="btn" ng-click="export()">数据导出</button>--%>
        <hr>
        <h3 class="text-center">充值留存</h3>

        <div ui-grid="gridOptions" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns
             ui-grid-move-columns style="width:100%; height:400px;"></div>
        <hr>
        <h3 class="text-center">用户留存</h3>

        <div ui-grid="gridOptions1" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns
             ui-grid-move-columns style="width:100%; height:400px;"></div>
        <hr>
        <h3 class="text-center">设备留存</h3>

        <div ui-grid="gridOptions2" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns
             ui-grid-move-columns style="width:100%; height:400px;"></div>
        <div id="spin"></div>
        <hr>
        <h3 class="text-center">LTV</h3>

        <div ui-grid="gridOptions3" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns
             ui-grid-move-columns style="width:100%; height:400px;"></div>
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
<script src="${ctx}/js/pf/stats_plantform_yandi.js"></script>
<%@ include file="/jsp/commons/_footer.jsp" %>
