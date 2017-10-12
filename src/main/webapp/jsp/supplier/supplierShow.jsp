<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%>

<div class="main-content span9 plantform-active-page" ng-controller="supplierShow">
  <h1 class="text-center">供应商查询</h1>
  <hr>
  <h2 class="text-center check-selector-btn">数据查询</h2>
  <form class="form-inline">
    <%@ include file="/jsp/commons/_plantformselectors_2.jsp"%>
    <span>选择时间:<%@ include file="/jsp/commons/_daterangepicker.jsp"%></span>
    <button type="submit" class="btn" ng-click="showdata()">搜索</button>
    <button class="btn btn-sm btn-success" ng-click="export()" >下载表格</button>
    <hr />
    <div ui-grid="gridOptions"  ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns ui-grid-move-columns class="myGrid"></div>
    <div id="spin"></div>
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
  })
</script>
<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/supplier/suppliershow.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>
