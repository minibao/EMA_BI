<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%> 
       
    <div class="main-content span9 level-page" ng-controller="statsLevel">
      <h1 class="text-center">等级分布</h1>
      <hr>
      <form class="form-inline" id="formInline">
        <%@ include file="/jsp/commons/_serverpicker.jsp"%>
        <%@ include file="/jsp/commons/_channelpicker.jsp"%> 
        <%@ include file="/jsp/commons/_channeltagpicker.jsp"%>
        <span><%@ include file="/jsp/commons/_datepicker.jsp"%></span>
        <%@ include file="/jsp/commons/_vocationpicker.jsp"%>
        <%@ include file="/jsp/commons/_retainpicker.jsp"%>
        <%@ include file="/jsp/commons/_paypicker.jsp"%>
        <button type="submit" class="btn" ng-click="userLevel()">搜索</button>
        <button class="btn btn-sm btn-success" ng-click="export()">下载表格</button>
      </form>
      <hr>    
      <div id="spin"></div>
      <div ui-grid="gridOptions" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns ui-grid-move-columns class="myGrid"></div>
      <div id="statsUserLevel" style="width: 100%; height:400px;"></div>
    </div>

<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/stats_level.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>




