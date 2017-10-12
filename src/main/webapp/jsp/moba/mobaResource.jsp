<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%> 
    
  <div class="main-content span9 " ng-controller="mobaResource">
  <h1 class="text-center">消耗总览</h1>
  <hr>               
   <form class="form-inline">
        <%@ include file="/jsp/commons/_mobasrver.jsp"%>
        <%@ include file="/jsp/commons/_mobaalliance.jsp"%> 
        <span>选择时间:<%@ include file="/jsp/commons/_daterangepicker.jsp"%></span>
        <button type="submit" class="btn" ng-click="resource()">搜索</button>
        <button type="button" class="btn btn-success" ng-click="hideGrid = !hideGrid">{{ hideGrid && '隐藏' || '显示' }}表格</button>
        <button class="btn btn-sm btn-success" ng-if="hideGrid" ng-click="export()">下载表格</button>
        <hr>
      </form>
      <h2 class="text-center ">钻石总览</h2>
      <div ui-grid="gridOptionsDiamond" ng-if="hideGrid" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns ui-grid-move-columns class="myGrid"></div>
      <div id="mobaDiamondConsume" style="width: 100%; height:400px;"></div>
      <hr>
      <h2 class="text-center">金币总览</h2>
      <div ui-grid="gridOptionsGold" ng-if="hideGrid" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns ui-grid-move-columns class="myGrid"></div>
      <div id="mobaGoldConsume" style="width: 100%; height:400px;"></div>    
      <div id="spin"></div>  
    </div>
    
<script>
    $(document).ready(function(){ 	

    })
</script>
        
<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/moba/moba_resource.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>




