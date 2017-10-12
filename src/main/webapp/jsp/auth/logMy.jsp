<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%> 
<div class="main-content span9 " ng-controller="autLogMy">
	<h1 class="text-center">我的操作日志</h1>
	<hr />
  <div ui-grid="gridOptions" style="min-height:660px" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns ui-grid-move-columns class="myGrid"></div>
<div id="spin"></div>
</div>


<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/auth/log_my.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>