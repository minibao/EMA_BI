<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/jsp/commons/_header.jsp" %>
<style>

</style>
<div class="main-content span9 clearfix" ng-controller="mobaPayRecord">
    <h1 class="text-center">充值记录</h1>
    <hr>
    <form style="margin: 2rem 0;" class="form-horizontal" role="form">
        <div class="form-group">
            <label  class="col-sm-2 control-label">UID：</label>
            <div class="col-sm-10">
                <input style="width:40%;" type="text" class="form-control" id="inputuid" placeholder="请输入uid">
                <button style="width:10%;" ng-click="searchbyUID()" type="submit" class="btn btn-primary">搜索</button>
            </div>
        </div>
    </form>
    <div style="height:600px;margin-top: 10px" ui-grid="gridOptions" ui-grid-selection ui-grid-exporter ui-grid-grouping
         ui-grid-resize-columns ui-grid-move-columns class="myGrid"></div>
    <div id="spin"></div>

</div>

<script>
    $(document).ready(function () {

    })
</script>

<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/moba/moba_payrecord.js"></script>
<%@ include file="/jsp/commons/_footer.jsp" %>
