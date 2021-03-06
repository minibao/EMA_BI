<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%> 
 
    <div class="main-content span9 clearfix" ng-controller="statsOnline">
      <h1 class="text-center">在线情况</h1>
      <hr>
      <div ng-repeat="filter in filterList">
        <form class="form-inline" id="">
          <hr ng-if="$index == 1">
          <%@ include file="/jsp/commons/_serverpicker.jsp"%>
          <%@ include file="/jsp/commons/_channelpicker.jsp"%>
          <span ng-if="filter.time != null" >时间: <%@ include file="/jsp/commons/_datepicker.jsp"%></span>
          <button ng-if="$index == 0" type="submit" class="btn" ng-click="realtimeOnline()">搜索</button>
          <button ng-if="$index == 1" type="submit" class="btn" ng-click="dayOnlineHist()">搜索</button>
          <hr ng-if="$index == 0">
          <hr ng-if="$index == 1">
          <button ng-if="$index == 0" class="btn btn-sm btn-success" id="downloadExceltop" style="display:none;">下载excel表格</button>
          <button ng-if="$index == 1" class="btn btn-sm btn-success" id="downloadExcelbot" style="display:none;">下载excel表格</button>
        </form>
        <div ng-if="$index == 0" id="statsOnlineRealTime" style="width: 100%; height:400px;"></div>
        <div ng-if="$index == 1" id="statsOnlineHist" style="width: 100%; height:400px;"></div>
        </div>
      </div>
    
<script>
    $(document).ready(function(){
        $('#downloadExceltop').on('click',function(){
            var excelName = $('#realTimeOnlineExcel').attr("data-name");
            $('#realTimeOnlineExcel').tableExport({fileName:excelName,type:'excel',escape:'false'});
        });
        $('#downloadExcelbot').on('click',function(){
            var excelName = $('#historyOnlineExcel').attr("data-name"); 
            $('#historyOnlineExcel').tableExport({fileName:excelName,type:'excel',escape:'false'});
        });
    })
</script>

<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/stats_online.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>
