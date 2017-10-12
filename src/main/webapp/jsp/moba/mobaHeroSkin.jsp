<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%> 
       
    <div class="main-content span9 hero-Skin-page" ng-controller="mobaHeroSkin">
      <h1 class="text-center">英雄皮肤销售数据</h1>
      <hr>
      <form class="form-inline" id="formInline">
        <%@ include file="/jsp/commons/_mobasrver.jsp"%>
        <%@ include file="/jsp/commons/_mobaalliance.jsp"%> 
        <span>购买使用：
          <select name="" id="buyType" style="width:10%">
            <option value="">所有</option>
            <option value="1">钻石</option>
            <option value="4">金币</option>
            <option value="3">碎片</option>
          </select>
        </span>
        <span>选择时间:<%@ include file="/jsp/commons/_daterangepicker.jsp"%></span>
        <button type="submit" class="btn" ng-click="calRes()">搜索</button>
        <button class="btn btn-sm btn-success" ng-click="export()">下载表格</button>
        <hr>
      </form>    
      <div id="spin"></div>
      <div ui-grid="gridOptions" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns ui-grid-move-columns class="myGrid"></div>
      <hr>
      <h3 class="text-center">皮肤觉醒</h3>
      <div ui-grid="gridUpdate" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns ui-grid-move-columns class="myGrid"></div>
    </div>

<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/moba/moba_hero_skin.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>
