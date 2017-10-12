<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%> 

    <div class="main-content span9 plantform-retention-page" ng-controller="statsPlantformRetention">
      <h1 class="text-center">平台留存统计</h1>
      <hr>
       <h2 class="text-center check-selector-btn">历史数据</h2>
      <form class="form-inline">
       <%@ include file="/jsp/commons/_plantformselectors_2.jsp"%>
        <span>选择时间:<%@ include file="/jsp/commons/_daterangepicker.jsp"%></span>
        <select class="multi-select" selectpicker multiple data-actions-box="true" ng-model="filter.reday" 
            ng-options="item.dictName for item in retentionFilter" tickIcon="icon-ok" title="选择留存日期">
        </select>
        <button type="submit" class="btn" ng-click="PlantformRetention('ajax')">搜索</button> 
        <button class="btn btn-sm btn-success" ng-click="export()">下载表格</button>   
      </form>
      <hr>
      <div class="text-center check-selector-btn">
        <button class="btn btn-small btn-success" ng-click="showType('PfDevice');ngtype = 'PfDevice' ">平台设备留存</button>
        <button class="btn btn-small" ng-click="showType('PfUid');ngtype = 'PfUid' ">平台账号留存</button>
        <button class="btn btn-small" ng-click="showType('GameDevice');ngtype = 'GameDevice' ">游戏设备留存</button>
        <button class="btn btn-small" ng-click="showType('GameUid');ngtype = 'GameUid' ">游戏账号留存</button>
      </div>
      <div ui-grid="gridOptions" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns ui-grid-move-columns class="myGrid"></div>
      <div id="spin"></div>

    <hr />
    <h2 class="text-center check-selector-btn">实时对比数据</h2>
    <div class="text-center">
      <%@ include file="/jsp/commons/_plantformselectors_2.jsp"%>
      <span>选择时间:<%@ include file="/jsp/commons/_datepicker.jsp"%></span>
      <button type="submit" class="btn" ng-click="PlantformRetCompare('ajax')">搜索</button>
    </div>
      <hr>
      <div class="text-center check-selector-btn">
        <button class="btn btn-small btn-success" ng-click="compareSlc('gameDeviceCount');methodCompare = 'gameDeviceCount' ">游戏设备数</button>
        <button class="btn btn-small" ng-click="compareSlc('gameUidCount');methodCompare = 'gameUidCount' ">游戏账号数</button>
        <button class="btn btn-small" ng-click="compareSlc('pfDeviceCount');methodCompare = 'pfDeviceCount' ">平台设备数</button>
        <button class="btn btn-small" ng-click="compareSlc('pfUidCount');methodCompare = 'pfUidCount' ">平台账号数</button>
      </div>
      <hr>
      <div id="statsPlantFormRetCompare" style="width:100%; height:400px;"></div>
      <div id="spin_cop"></div>

  </div>
<script>
$(document).ready(function(){
  //默认选中 平台设备留存
  $('.check-selector-btn button').on('click',function(){
    $(this).addClass('btn-success').siblings().removeClass('btn-success');
  })
  var nowDay = new Date(); 
  var dateToday =  nowDay.getFullYear() + '-' + addO((nowDay.getMonth() + 1))+ '-' + addO(nowDay.getDate());
    //初始化时间插件
    initializationDateRange();
    initializationDatesingel();
    initializationdDefaultValue();
    $('.date-picker-single').datetimepicker('setEndDate', nowDay);
    //关闭app选项
    $('.dropdown .data-app-rel').find('option[label="合成与召唤"]').show().siblings().hide();
})    
</script>    
<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/zhaohuanhecheng/stats_plantform_retention.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>
