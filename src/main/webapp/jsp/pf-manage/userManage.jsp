<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/jsp/commons/_header.jsp" %>
<style>
    .pf-search-item {
        display: inline-block;
        width: 22%;
        margin: 10px;
    }

    .pf-search-item span {
        width: auto;
    }

    .ui-grid-cell-contents {
        text-align: center;
    }
    .frmbind{
        position: absolute;
        width: 1000px;
        height: 400px;
        background: rgb(162, 162, 162);
        top: 160px;
        padding: 50px;
        border-radius: 10px;
        display: none;
    }
</style>
<div class="main-content span9 userManage" ng-controller="userManage">
    <h1 class="text-center">邮箱绑定</h1>
    <hr>
    <form>
        <div class="pf-search-item">
            <span>UID：</span>
            <input type="text" class="form-control" ng-model="uid" placeholder="UID">
        </div>
        <div class="pf-search-item">
            <span>Email：</span>
            <input type="email" class="form-control" ng-model="email" placeholder="Email">
        </div>
        <div class="pf-search-item">
            <span>手机号：</span>
            <input type="tel" class="form-control" ng-model="phone" placeholder="手机号">
        </div>
        <div class="pf-search-item">
            <span>平台昵称：</span>
            <input type="text" class="form-control" ng-model="nickname" placeholder="昵称">
        </div>
        <hr>
        <div class="pf-search-item">
            <span>渠道ID：</span>
            <input type="text" class="form-control" ng-model="allianceId" placeholder="渠道ID">
        </div>
        <div class="pf-search-item">
            <span>渠道UID：</span>
            <input type="text" class="form-control" ng-model="allianceUid" placeholder="渠道UID">
        </div>
        <div class="pf-search-item" style="width:10%;">
            <button class="btn btn-primary" ng-click="serachUserInfo()">查询</button>
        </div>
        <hr>
        <h3 class="">帐号信息</h3>

        <div ui-grid="griduserinfo" style="width:90%; height: 200px;" ui-grid-selection ui-grid-exporter
             ui-grid-grouping
             ui-grid-auto-resize ui-grid-move-columns class="userinfo-tb"></div>
        <hr>
        <h3 class="">登录历史</h3>

        <div ui-grid="gridhistory" style="width:90%; height: 400px;" ui-grid-selection ui-grid-exporter ui-grid-grouping
             ui-grid-resize-columns ui-grid-move-columns class="loginhistory-tb"></div>
        <hr>

        <div class="frmbind">
            <h3 class="">绑定邮箱</h3>
            <button class="btn btn-primary" style="    position: relative;left: 650px" ng-click="hidebindpage()">关闭</button>
            <div class="pf-search-item" style="width:100%">
                <%--<span>UID：</span>--%>
                <%--<input type="text" class="form-control" ng-model="binduid" placeholder="UID">--%>
                <span>Email：</span>
                <input type="email" class="form-control" ng-model="bindemail" placeholder="Email">
                <span style="font-weight: 300;padding:0 10px;">请确认邮箱未被绑定过</span>

                <div class="pf-search-item" style="width:20%;">
                    <button class="btn btn-primary" ng-click="bindEmail()">绑定邮箱</button>
                </div>
            </div>
        </div>

    </form>
    <div id="spin"></div>
</div>
<script>
    $(document).ready(function () {

    })
</script>
<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/pf-manage/pf_manage.js"></script>
<%@ include file="/jsp/commons/_footer.jsp" %>
