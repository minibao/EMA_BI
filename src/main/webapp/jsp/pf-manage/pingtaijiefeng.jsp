<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/jsp/commons/_header.jsp" %>
<style>
    .main-content input {
        width: 20%;
    }
    .showinfo {
        display: none;
        width: 63%;
        background: #333;
        padding: 20px;
        color: #fff;
        margin-top: 50px;
    }
    .zhifuclosed{
        margin-left:50px;
    }
</style>

<div class="main-content span9" ng-controller="pingtaijiefeng">
    <h1 class="text-center">平台解封</h1>

    <form class="form-inline">
        <span>UID：</span>
        <input id="inputUID" type="text" placeholder="请输入UID">
        <button class="btn btn-primary" ng-click="SearchbyUID()">搜索</button>
    </form>
    <hr>
    <div class="showinfo user-show">
        <div class="info"></div>
        <hr>
        <div class="info"></div>
        <hr>
        <div class="info"></div>
        <hr>
        <div class="info"></div>
        <hr>
        <div class="info"></div>
        <hr>
        <div class="info"></div>
        <hr>
        <button ng-click="pingtaiclosed()" type="submit" class="btn btn-primary pTclosed" disabled="disabled">平台封禁</button>
        <button ng-click="pingtaiopen()" type="submit" class="btn btn-primary pTopen" disabled="disabled">平台解封</button>
        <button ng-click="zhifuclosed()" type="submit" class="btn btn-primary zhifuclosed" disabled="disabled">支付封禁</button>
        <button ng-click="zhifuopen()" type="submit" class="btn btn-primary  zhifuopen" disabled="disabled">支付解封</button>
    </div>
</div>
<script>
    $(document).ready(function () {

    })
</script>
<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/pf-manage/pingtaijiefeng.js"></script>
<%@ include file="/jsp/commons/_footer.jsp" %>
