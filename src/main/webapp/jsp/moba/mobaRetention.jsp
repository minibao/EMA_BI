<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%> 
   
    <div class="main-content span9 retention" ng-controller="mobaRetention">
      <h1 class="text-center">留存统计(帐号)</h1>
      <hr>
      <form class="form-inline">  
        <%@ include file="/jsp/commons/_mobasrver.jsp"%>
        <%@ include file="/jsp/commons/_mobaalliance.jsp"%> 
        <span>时间范围:<%@ include file="/jsp/commons/_daterangepicker.jsp"%></span>
        <select class="multi-select" selectpicker multiple data-actions-box="true" ng-model="filter.reday" 
            ng-options="item.dictName for item in retentionFilter" tickIcon="icon-ok" title="选择留存日期">
        </select>
        <button type="submit" class="btn" ng-click="retention()">搜索</button>
        <button type="button" class="btn btn-success" ng-click="hideGrid = !hideGrid">{{ hideGrid && '隐藏' || '显示' }}表格</button>
        <button class="btn btn-sm btn-success" ng-if="hideGrid" ng-click="export()">下载表格</button>
      </form>
      <div ui-grid="gridOptions" ng-if="hideGrid" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns ui-grid-move-columns class="myGrid"></div>
      <div id="mobaRetentionChart" style="width: 100%; height:400px;"></div> 
    </div>
    <div id="spin"></div>

<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/moba/moba_retention.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%> 