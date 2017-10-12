<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/jsp/commons/_header.jsp" %>
<style>
    .main-content input {
        width: 40%;
    }
    .showinfo {
        width: 63%;
        border-radius: 10px;
        background: #444;
        padding: 20px;
        color: #fff;
        margin-top: 50px;
    }
</style>

<div class="main-content span9" ng-controller="aliserach">
    <h1 class="text-center">支付宝查询</h1>

    <form class="form-inline">
        <span>tradeNo：</span>
        <input id="inputtradeno" type="text" placeholder="请输入tradeNo">
        <button type="submit" class="btn btn-primary" ng-click="serachbytradeno()">搜索</button>
    </form>
    <hr>
    <!-- 显示查询结果 -->
    <div class="showinfo user-show">
    </div>
</div>
<script>
    $(document).ready(function () {

    })
</script>
<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/pf-manage/aliserach.js"></script>
<%@ include file="/jsp/commons/_footer.jsp" %>
