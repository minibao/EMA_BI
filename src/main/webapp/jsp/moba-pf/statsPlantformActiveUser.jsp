<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%> 

    <div class="main-content span9 plantform-active-page" ng-controller="statsPlantformActiveUser">
      <h1 class="text-center">平台活跃用户</h1>
      <hr>
      <h2 class="text-center check-selector-btn">历史数据</h2>
      <form  class="form-inline">
        <%@ include file="/jsp/commons/_plantformselectors_2.jsp"%>
        <span>选择时间:<%@ include file="/jsp/commons/_daterangepicker.jsp"%></span>
        <button type="submit" class="btn" ng-click="PlantformactiveUser()">搜索</button> 
        <button type="button" class="btn btn-success" ng-click="hideGrid = !hideGrid">{{ hideGrid && '隐藏' || '显示' }}表格</button>
        <button class="btn btn-sm btn-success" ng-click="export()" ng-if="hideGrid">下载表格</button>   
        <hr />
        <div id="statsPlantFormActiveUser" style="width:100%; height:400px;"></div>
        <hr />
        <div ui-grid="gridOptions"  ng-if="hideGrid" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns ui-grid-move-columns class="myGrid"></div>
      <div id="spin"></div>  
      </form>  
   	
    
      <h2 class="text-center check-selector-btn">实时对比数据</h2>
      <form class="form-inline">
        <div class="text-center">
          <%@ include file="/jsp/commons/_plantformselectors_2.jsp"%>
          <span>对比时间：<%@ include file="/jsp/commons/_datepicker.jsp"%></span>
          <button type="submit" class="btn" ng-click="PlantformactiveUserCompare('ajax')">搜索</button>
        </div>
        <hr>
        <div class="text-center check-selector-btn">
          <button class="btn btn-small btn-success" ng-click="compareSlc('uidCount');methodCompare = 'uidCount' ">用户对比</button>
          <button class="btn btn-small" ng-click="compareSlc('deviceCount');methodCompare = 'deviceCount' ">设备对比</button>
        </div>
        <hr />
        <div id="statsPlantFormActiveUserCompare" style="width:100%; height:400px;"></div>
        <div id="spin_b"></div> 
      </form> 
    </div>
     
<script>
$(document).ready(function(){
	var nowDay = new Date(); 
	var dateToday =  nowDay.getFullYear() + '-' + addO((nowDay.getMonth() + 1))+ '-' + addO(nowDay.getDate())
    //初始化时间插件
    initializationDateRange();
    initializationDatesingel();
    initializationdDefaultValue();
    $('.date-picker-single').datetimepicker('setEndDate', nowDay);
    //切换选项按钮
    $('.check-selector-btn button').on('click',function(){
      $(this).addClass('btn-success').siblings().removeClass('btn-success');
    })
    //关闭app选项
    $('.dropdown .data-app-rel').find('option[label="次元大作战"]').show().siblings().hide();
})    
</script>    
<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/moba-pf/stats_plantform_active_user.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>
