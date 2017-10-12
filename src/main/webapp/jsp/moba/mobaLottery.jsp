<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%> 
       
    <div class="main-content span9 hero-page" ng-controller="mobaLotteryCtrl">
      <h1 class="text-center">祈愿数据</h1>
      <hr>
      <form class="form-inline" id="">
        <%@ include file="/jsp/commons/_mobasrver.jsp"%>
        <%@ include file="/jsp/commons/_mobaalliance.jsp"%>
        <span>选择时间:<%@ include file="/jsp/commons/_daterangepicker.jsp"%></span>
        <button type="submit" class="btn" ng-click="calfnc()">搜索</button>
        <button class="btn btn-sm btn-success" ng-click="export()">下载表格</button>
        <hr>
      </form>
      <div id="spin"></div>
      <h3 class="text-center">祈愿次数</h3>
      <div ui-grid="gridNum" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns ui-grid-move-columns class="myGrid"></div>
      <hr>
      <h3 class="text-center">奖品获得</h3>
      <div ui-grid="gridReward" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns ui-grid-move-columns class="myGrid"></div>
    </div>

<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/moba/moba_lottery.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>