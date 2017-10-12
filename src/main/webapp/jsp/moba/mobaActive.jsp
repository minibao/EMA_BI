<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%> 

    <div class="main-content span9 active-page" ng-controller="mobaActive">
      <h1 class="text-center">活跃角色</h1>
      <hr>
      <form class="form-inline">
        <%@ include file="/jsp/commons/_mobasrver.jsp"%>
        <%@ include file="/jsp/commons/_mobaalliance.jsp"%> 
        <span>选择时间:<%@ include file="/jsp/commons/_daterangepicker.jsp"%></span>
        <button type="submit" class="btn" ng-click="activeUser()">搜索</button>
        <button type="button" class="btn btn-success" ng-click="hideGrid = !hideGrid">{{ hideGrid && '隐藏' || '显示' }}表格</button> 
        <button class="btn btn-sm btn-success" ng-if="hideGrid" ng-click="export()">下载表格</button>
      </form>
      <hr>
      <div ui-grid="gridOptions" ng-if="hideGrid" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns ui-grid-move-columns class="myGrid"></div>
      <hr ng-if="hideGrid">
      <div id="mobaActiveUser" style="width:100%; height:400px;"></div>
    </div>
    <div id="spin"></div>
    
<script>
$(document).ready(function(){

})    
</script>    
<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/moba/moba_active.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>
