<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%> 
 
    <div class="main-content span9 clearfix" ng-controller="mobaOnline">
      <h1 class="text-center">在线情况</h1>
      <hr>
      <div ng-repeat="ciyuan in ciyuan">
        <form class="form-inline" id="">
          <span class="ser-margin-set"><%@ include file="/jsp/commons/_mobasrver.jsp"%></span>
          <span ng-if="$index == 1">时间: <%@ include file="/jsp/commons/_datepicker.jsp"%></span>
          <button ng-if="$index == 0" type="submit" class="btn" ng-click="realtimeOnline()">搜索</button>
          <button ng-if="$index == 1" type="submit" class="btn" ng-click="dayOnlineHist()">搜索</button>
          <button ng-if="$index == 0" class="btn btn-sm btn-success" id="downloadExceltop" style="display:none;">下载excel表格</button>
          <button ng-if="$index == 1" class="btn btn-sm btn-success" id="downloadExcelbot" style="display:none;">下载excel表格</button>
        </form>
        <hr>
        <div ng-if="$index == 0" id="statsOnlineRealTime" style="width: 100%; height:400px;"></div>
        <div ng-if="$index == 1" id="statsOnlineHist" style="width: 100%; height:400px;"></div>
        </div>
        <div id="spin"></div>
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
<script src="${ctx}/js/moba/moba_online.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>
