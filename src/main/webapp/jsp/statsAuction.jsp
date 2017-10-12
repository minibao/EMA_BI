<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%>  
     
    <div class="main-content span9 auction-page" ng-controller="statsAuction">
      <h1 class="text-center">拍卖行分析</h1>
      <hr>
      <form class="form-inline">  
        <%@ include file="/jsp/commons/_serverpicker.jsp"%>
        <%@ include file="/jsp/commons/_channelpicker.jsp"%> 
        <%@ include file="/jsp/commons/_channeltagpicker.jsp"%>
        <span>选择时间: <%@ include file="/jsp/commons/_daterangepicker.jsp"%></span>
      </form>
      <div class="set-details" style="margin-bottom:20px;">
        <button type="button" class="btn btn-default" id="openDetailList">详细设置：<span class="icon-th-list"></span></button>
        <div class="detail-list" id="detailList" style="left:0px;">
          <span class="">角色创建时间:<%@ include file="/jsp/commons/_daterangepicker.jsp"%></span>
          <div class="cut-line"></div>
          <span class="title-bar">等级范围:<input type="number" name="levelFrom" min="0"/>至<input type="number" name="levelTo" min="0"/>级</span>	
          <button type="button" class="btn btn-default" id="clsOpen" style="margin:60px 10px 0 0;float:right;">确认：<span class="icon-ok-circle"></span></button>
        </div> 
        <button type="submit" class="btn" ng-click="auctionAnalyze()">搜索</button>
        <button type="button" class="btn btn-success" ng-click="hideGrid = !hideGrid">{{ hideGrid && '隐藏' || '显示' }}表格</button>
        <button class="btn btn-sm btn-success" ng-if="hideGrid" ng-click="export()">下载表格</button>
      </div>
      <div ui-grid="gridOptions" ng-if="hideGrid" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns ui-grid-move-columns class="myGrid"></div>
      <hr>
      <div id="statsAuction" style="width: 100%; height:400px;"></div>
      <div id="spin"></div>
    </div>
    
<script>
$(document).ready(function(){
	//初始化角色时间选择
	$('.date-picker-star:eq(1)').addClass('date-hour');
	$('.date-picker-end:eq(1)').addClass('date-hour');
	$('#openDetailList').on('click',function(){
		 $('#detailList').css('visibility','visible');		 
	});
	$('#clsOpen').on('click',function(){
   	 $('#detailList').css('visibility','hidden');     
   });
	initializationDateHour();
	initializationdDefaultValue();
	
})




</script>    
<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/stats_auction.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>