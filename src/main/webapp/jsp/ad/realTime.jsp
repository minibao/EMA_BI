<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%> 

  <div class="main-content span9 ad-realtime" ng-controller="realTimeCtrl">
    <h1 class="text-center">实时数据</h1> 
    <div class="filter-select">
       <span class="">
        <select name="" ng-model="appId" ng-init="appId = '20007' ">
          <!-- <option value="20015">次元大作战</option>
          <option value="20012">英灵召唤师</option> -->
          <option value="20007">无尽远征</option>
        </select>
      </span>
      <hr>
	<!--选择次元  服  渠-->
	<span class="" ng-show="appId == 20015">
		<%@ include file="/jsp/commons/_mobasrver.jsp"%>  
        <%@ include file="/jsp/commons/_mobaalliance.jsp"%> 
	</span>
	<!--选择英灵-->
	<span class="" ng-show="appId == 20012">
		暂无通道选项
	</span>
	<!--选择无尽  服 渠  子渠-->
	<span class="" ng-show="appId == 20007">
		<%@ include file="/jsp/commons/_serverpicker.jsp"%>
        <%@ include file="/jsp/commons/_channelpicker.jsp"%> 
        <%@ include file="/jsp/commons/_channeltagpicker.jsp"%>
	</span>
    <button type="button" class="btn btn-success" ng-click="hideGrid = !hideGrid">{{ hideGrid && '隐藏' || '显示' }}表格</button>
    <a href="javascript:;" class="btn btn-success" ng-click="roleRealTime()">查询</a>
    </div>
    <!--表格-->
     <div ui-grid="gridOptions" ng-if="hideGrid" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns ui-grid-move-columns class="myGrid"></div>
     <hr>
     <div id="realNewRoleChart" style="height:400px;"></div>    
  </div>
  <div id="spin"></div>
    
<script>
$(document).ready(function(){
  
})    
</script>    
<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/ad/real_time.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>
