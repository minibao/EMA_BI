<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/jsp/commons/_header.jsp" %>

<div class="main-content span9 hot-cloud-sc-page" ng-controller="statsHotCloudShortCnntSet">
    <h1 class="text-center">热云短链配置</h1>

    <div class="sub-header"><i class="wangeditor-menu-img-link"></i>热云广告</div>
    <div class="filter-select">
      <span class="select-item">
        <input type="text" placeholder="请输入游戏ID" class="ipt-init" ng-model="gameId">
      </span>
      <span class="select-item">
        <select name="" id="" ng-model="decType">
            <option value="" disabled selected>请选择设备类型</option>
            <option value="0">IOS</option>
            <option value="1">安卓</option>
        </select>
      </span>
      <span class="select-item">
        <input type="text" placeholder="请输入APPkey" class="ipt-init" ng-model="appKey" ng-change="validateFnc('apK')">
        <a class="ipt-tips" ng-show="apktip == 1">APPkey长度为32位</a>
      </span>
      <span class="select-item">
        <input type="text" placeholder="广告活动6位短链" class="ipt-init" ng-model="bannerShortCnnt"
               ng-change="validateFnc('bsc')">
        <a class="ipt-tips" ng-show="bsctip == 1">输入短链长度为6位</a>
      </span>
      <span class="select-item">
        <input type="text" placeholder="请输入活动短链名称" class="ipt-init" ng-model="activeShortCnnt">
      </span>
      <span class="select-item">
        <input type="text" placeholder="请输入花费" class="ipt-init" ng-model="activeCost">
      </span>
        <a href="javascript:;" class="btn btn-success" ng-click="searchHotCloudSC()">添加</a>
    </div>
    <hr>
    <!--表格-->
    <div ui-grid="gridOptions" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns
         ui-grid-move-columns class="myGrid"></div>
</div>
<div id="spin"></div>
<div class="mask">
    <div class="in-box">
        <p class="in-title">花费修改</p>
        <div class="info">
            <p>gameName:<span id="gameName"></span></p>
            <p>gameId: <span id="gameId"></span></p>
            <p>hotAppKey:<span id="hotAppKey"></span></p>
            <p>urlName: <span id="urlName"></span></p>
            <p>adPf:<span id="adPf"></span></p>
            <p>shortUrl:<span id="shortUrl"></span></p>
            <p>type:<span id="type"></span></p>
            <p>当前花费为:<span id="cost"></span></p>
            <input id="in-cost" type="text" placeholder="请输入花费" >
            <a id="update-cost"  class="btn btn-success btn1">修改</a>
            <a id="mask-close"  class="btn btn-success btn2">关闭</a>
        </div>
    </div>
</div>
<style>
    .mask {
        display: none;
        width: 100%;
        height: 100%;
        /*background: #000;*/
        z-index: 9;
        position: relative;
        margin: 100px auto;
    }

    .in-box {
        width: 40%;
        min-width:500px;
        height: 400px;
        background: #333;
        position: relative;
        margin: 50px auto;
        top:50px;
        text-align: center;
        color:#fff;
    }
    .in-title{
        font-size: 2rem;
        text-align: center;
        position: absolute;
        margin: 0 auto;
        text-align: center;
        width: 100%;
        top: 15px;
    }
    .info{
        position: absolute;
        top:80px;
        text-align: left;
        margin:0 auto;
        width:100%;

    }
    .info p{
        width: 100%;
        text-indent: 10%;
        font-size:1rem;
    }
    .info input{
        position: absolute;
        left:10%;
    }
    .info .btn1{
        float: right;
        right:30%;
        position: relative;
    }
    .info .btn2{
        right:20px;
        position: absolute;
        top:0px;
    }
    #cost{
        color:#fff12d;
    }
</style>
<script>
    $(document).ready(function () {


    })
</script>
<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/ad/config.js"></script>
<%@ include file="/jsp/commons/_footer.jsp" %>
