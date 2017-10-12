<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%> 

    <div class="main-content span9 newGrow" ng-controller="statsNewGrow">
      <h1 class="text-center">新增角色</h1>
      <hr>      
      <form class="form-inline" id="formInline">
        <%@ include file="/jsp/commons/_serverpicker.jsp"%>
        <%@ include file="/jsp/commons/_channelpicker.jsp"%> 
        <%@ include file="/jsp/commons/_channeltagpicker.jsp"%>
        <span>选择时间: <%@ include file="/jsp/commons/_daterangepicker.jsp"%></span>
        <button type="submit" class="btn" ng-click="newGrow()">搜索</button>
        <button type="button" class="btn btn-success" ng-click="hideGrid = !hideGrid">{{ hideGrid && '隐藏' || '显示' }}表格</button>
        <button class="btn btn-sm btn-success" ng-if="hideGrid" ng-click="export()">下载excel表格</button>
      </form>
      <div ui-grid="gridOptions" ng-if="hideGrid" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns ui-grid-move-columns class="myGrid"></div>
      <hr />
      <div id="statsNewGrow" style="height:400px;"></div>
      <div id="spin"></div>
    </div>

<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/stats_newgrow.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>
