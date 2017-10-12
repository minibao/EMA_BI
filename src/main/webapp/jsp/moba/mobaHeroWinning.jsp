<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%> 
       
    <div class="main-content span9 hero-win-page" ng-controller="mobaHeroWinning">
      <h1 class="text-center">英雄胜率统计</h1>
      <hr>
      <form class="form-inline" id="">
        <%@ include file="/jsp/commons/_mobasrver.jsp"%>
        <%@ include file="/jsp/commons/_mobaalliance.jsp"%> 
        <span>选择时间:<%@ include file="/jsp/commons/_daterangepicker.jsp"%></span>
        <span>地图：
          <select name="" id="mapId" style="max-width:100px;">
            <option value="{{item.mapValue}}" ng-repeat="item in gameMapDic">{{item.mapName}}</option>
          </select>
        </span>
        <button type="submit" class="btn" ng-click="heroWinning()">搜索</button>
        <button class="btn btn-sm btn-success" ng-click="export()">下载表格</button>
        <hr>
      </form>    
      <div id="spin"></div>
      <div ui-grid="gridOptions" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns ui-grid-move-columns class="myGrid"></div>
    </div>

<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/moba/moba_hero_winning.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>




