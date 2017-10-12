<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%> 
       
    <div class="main-content span9 level-page" ng-controller="mobaOnlineTime">
      <h1 class="text-center">在线时长分布</h1>
      <hr>
      <form class="form-inline" id="formInline">
        <%@ include file="/jsp/commons/_mobasrver.jsp"%>
        <%@ include file="/jsp/commons/_mobaalliance.jsp"%> 
        <span><%@ include file="/jsp/commons/_datepicker.jsp"%></span>
        <button type="submit" class="btn" ng-click="mabaOnlineTime()">搜索</button>
        <button type="button" class="btn btn-success" ng-click="hideGrid = !hideGrid">{{ hideGrid && '隐藏' || '显示' }}表格</button>
        <button class="btn btn-sm btn-success" ng-if="hideGrid" ng-click="export()">下载表格</button>
        <hr>
      </form>    
      <div id="spin"></div>
      <div ui-grid="gridOptions" ng-if="hideGrid" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns ui-grid-move-columns class="myGrid"></div>
      <div id="mobaOnlineTime" style="width: 100%; height:400px;"></div>
    </div>
      
<script>
    $(document).ready(function(){
    })
</script>

<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/moba/maba_online_time.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>




