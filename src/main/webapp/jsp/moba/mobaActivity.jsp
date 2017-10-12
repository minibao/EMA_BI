<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%> 
       
    <div class="main-content span9 hero-page" ng-controller="mobaActivityCtrl">
      <h1 class="text-center">活动统计</h1>
      <hr>
      <form class="form-inline" id="">
        <%@ include file="/jsp/commons/_mobasrver.jsp"%>
        <%@ include file="/jsp/commons/_mobaalliance.jsp"%> 
        <span>选择时间:<%@ include file="/jsp/commons/_daterangepicker.jsp"%></span>
        <button type="submit" class="btn" ng-click="activity()">搜索</button>
        <button class="btn btn-sm btn-success" ng-click="export()">下载表格</button>
      </form>
      <div id="spin"></div>
        <div class="text-center check-selector-btn">
          <button class="btn btn-small btn-success" ng-click="activity('NoviceLandingGetReward')">新手登录</button>
          <button class="btn btn-small" ng-click="activity('FightRewardGetReward')">越战越勇</button>
          <button class="btn btn-small" ng-click="activity('CrazyNightGetReward')">狂欢之夜</button>
          <button class="btn btn-small" ng-click="">限定英雄</button>
        </div>
      <hr>
      <div ui-grid="gridOptions" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns ui-grid-move-columns class="myGrid"></div>
    </div>
<script>
  $(document).ready(function(){
     //默认选中 平台设备留存
    $('.check-selector-btn button').on('click',function(){
      $(this).addClass('btn-success').siblings().removeClass('btn-success');
    })
  })
</script>
<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/moba/moba_activity.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>