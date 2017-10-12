<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%> 
   
    <div class="main-content span9 retention" ng-controller="statsRetention">
      <h1>留存用户</h1>
      <hr>
      <form class="form-inline">  
        <%@ include file="/jsp/commons/_serverpicker.jsp"%>
        <%@ include file="/jsp/commons/_channelpicker.jsp"%> 
        <%@ include file="/jsp/commons/_channeltagpicker.jsp"%>
        <span>角色创建时间<%@ include file="/jsp/commons/_daterangepicker.jsp"%></span>
        <button type="submit" class="btn" ng-click="retention()">搜索</button>
        <button type="button" class="btn btn-success" ng-click="hideGrid = !hideGrid">{{ hideGrid && '隐藏' || '显示' }}表格</button>
        <button class="btn btn-sm btn-success" ng-if="hideGrid" ng-click="export()">下载表格</button>
      </form>
      <div ui-grid="gridOptions" ng-if="hideGrid" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns ui-grid-move-columns class="myGrid"></div>
      <div id="statsRetentionChart" style="width: 100%; height:400px;"></div> 
    </div>
    <div id="spin"></div>
    
<script>
  $(document).ready(function(){
    $('.date-picker-star').addClass('date-hour');
    $('.date-picker-end').addClass('date-hour');
    initializationDateHour();
    initializationDateRange();
    initializationDatesingel();
    initializationdDefaultValue();
  })
</script>
<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/hope/stats_retention.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%> 