<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%>

<div class="main-content span9 " ng-controller="statsResourceGold">
  <h1>资源统计</h1>
  <hr>
  <form class="form-battle" id="">
    <%@ include file="/jsp/commons/_serverpicker.jsp"%>
    <%@ include file="/jsp/commons/_channelpicker.jsp"%>
    <span class="ser-margin-set"><%@ include file="/jsp/commons/_channeltagpicker.jsp"%></span>
    <span>选择时间: <%@ include file="/jsp/commons/_daterangepicker.jsp"%></span>
    <hr>
    <div class="set-details">
      <span class="">角色创建时间:<%@ include file="/jsp/commons/_daterangepicker.jsp"%></span>
      <button type="button" class="btn btn-default btn-open-detail" id="openDetailList" style="margin-top: initial;">详细设置：<i class="glyphicon glyphicon-th-list"></i></button>
      <div class="detail-list detail-relist" id="detailList">
        <span class="title-bar">等级范围:<input type="number" id="levelStart" min="0" placeholder="0级"/>至<input type="number" id="levelEnd" min="0" placeholder="满级"/>级</span>
        <span class="title-bar">等级间隔:<input class="ipt-level" type="number" min="0" id="levelInterval" placeholder="10级"></span>
        <div class="cut-line"></div>
        <span class="title-bar">选择职业:<%@ include file="/jsp/commons/_vocationpicker.jsp"%></span>
        <button type="button" class="btn btn-default btn-cs" id="clsOpen">确认：<span class="glyphicon glyphicon-ok"></span></button>
      </div>
      <hr />
          <span class="title-bar">获得/消耗:
            <select role="presentation" ng-options="item.inOutType for item in resourceTree"  ng-change="resourceChange()" ng-model="inOutType" class="select-picker"></select>
          </span>
          <span class="">来源类型:
            <select role="presentation" ng-options="item.dictName for item in inOutType.resourceType" ng-model="resourceType" class="select-picker"></select>
          </span>
          <span style="display: none;" class="title-bar">资源种类:
            <select role="presentation" ng-options="item.dictName for item in category" ng-model="categoryType" categoryid="98" category="钻石"  class="select-picker" id="category"></select>
          </span>
          <span class="title-bar" style="position:relative;" id="subIdFa" ng-if="categoryType.dictValue <= 90">
            <span class="tips text-tips" style="display:none;position: absolute;">若输入多个subId,请以逗号进行分隔</span>请输入SubId:
            <input type="text" id="subId" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = ',';"/>
          </span>
      <button class="btn" type="submit" ng-click="statsResourcedetial()">搜索</button>
      <button class="btn btn-sm btn-success" ng-click="export()">下载表格</button>
    </div>
  </form>
  <hr>
  <div id="spin"></div>
  <div ui-grid="gridOptions" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns ui-grid-move-columns class="myGrid"></div>
</div>

<script>
  $(document).ready(function(){
    $('#subId').focus(function(){
      $('.text-tips').show();
    });
    $('#subId').blur(function(){
      $('.text-tips').hide();
    })
    $('#openDetailList').on('click',function(){
      $('#detailList').css('visibility','visible');
    })
    $('#clsOpen').click(function(){
      $('#detailList').css('visibility','hidden');
    })
    //初始化角色时间选择
    $('.date-picker-star:eq(1)').addClass('date-hour');
    $('.date-picker-end:eq(1)').addClass('date-hour');
    initializationdDefaultValue();
    initializationDateHour();
  })
</script>

<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/stats_resource_gold.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>




