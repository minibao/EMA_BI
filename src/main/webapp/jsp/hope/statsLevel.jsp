<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%> 
       
    <div class="main-content span9 level-page" ng-controller="statsLevel">
      <h1 class="text-center">等级分布</h1>
      <hr>
      <form class="form-inline" id="formInline">
        <%@ include file="/jsp/commons/_serverpicker.jsp"%>
        <%@ include file="/jsp/commons/_channelpicker.jsp"%> 
        <%@ include file="/jsp/commons/_channeltagpicker.jsp"%>
        <span>角色创建时间:<%@ include file="/jsp/commons/_daterangepicker.jsp"%></span>
        <%@ include file="/jsp/commons/_vocationpicker.jsp"%>
        <%@ include file="/jsp/commons/_retainpicker.jsp"%>
        <%@ include file="/jsp/commons/_paypicker.jsp"%>
        <hr>
        <button type="submit" class="btn" ng-click="userLevel()">搜索</button>
        <button type="button" class="btn btn-success" ng-click="hideGrid = !hideGrid">{{ hideGrid && '隐藏' || '显示' }}表格</button>
        <button class="btn btn-sm btn-success" ng-if="hideGrid" ng-click="export()">下载表格</button>
      </form>    
      <div id="spin"></div>
      <div ui-grid="gridOptions" ng-if="hideGrid" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns ui-grid-move-columns class="myGrid"></div>
      <div id="statsUserLevel" style="width: 100%; height:400px;"></div>
    </div>
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
<script src="${ctx}/js/hope/stats_level.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>




