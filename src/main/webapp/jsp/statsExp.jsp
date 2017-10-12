<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%>

    <div class="main-content span9 consume-page"  ng-controller="statsExp">
      <h1 class=" text-center">经验获得</h1>
      <hr>
      <form class="form-inline">
        <%@ include file="/jsp/commons/_serverpicker.jsp"%>
        <%@ include file="/jsp/commons/_channelpicker.jsp"%> 
        <%@ include file="/jsp/commons/_channeltagpicker.jsp"%>
        <span>时间：<%@ include file="/jsp/commons/_daterangepicker.jsp"%></span>
        <button type="submit" class="btn" ng-click="expDetail()">搜索</button>
        <button class="btn btn-success co" ng-click="export()">下载表格</button>   
        <hr>
      </form>
      <div ui-grid="gridOptions" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns ui-grid-move-columns style="height: 500px;"></div>
    </div>
    
<script>
    $(document).ready(function(){
    	 //时间选框的二次初始化
        $('#selectFilter').on('change',function(){
        	initializationDateRange();
        	initializationdDefaultValue();       	
        })
    })
</script>

<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/stats_exp.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>