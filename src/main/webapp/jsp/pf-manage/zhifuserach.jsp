<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/jsp/commons/_header.jsp" %>
<style>
    .main-content input {
        width: 20%;
    }

    .ChannelCallBack {
        width: 100%;
        border-radius: 10px;
        background: #444;
        padding: 20px;
        color: #303030;
        margin-top: 20px;
    }

    .channel-p {
        color: #fff;
        word-break: break-all;
    }

    .ChannelCallBack,
    #iospaygrid,
    #orderinfogrid,
    #paymentgrid {
        position: absolute;
        z-index: -1;
        width: 1100px;
        opacity: 0;
    }

    .titleinfo {
        width: 80%;
        position: relative;
        margin-top: 16px;
        color: #2e2e2e;
        text-align: center;
        font-size: 2em;
        z-index: 999 !important;
        font-weight: 900;
    }
    .hidediv{
        margin-top:60px;
    }
</style>

<div class="main-content span9" ng-controller="zhifuserach">
    <h1 class="text-center">支付查询</h1>

    <form class="form-inline">
        <span>UID：</span>
        <input id="inputuid" type="text" placeholder="请输入UID">
        <button type="submit" class="btn btn-primary" ng-click="serachbyuid()">搜索</button>
    </form>
    <hr>
    <div class="btnbox">
        <button type="button" class="btn btn-primary Channelbtn">ChannelCallBack</button>
        <button type="button" class="btn btn-primary IosPaybtn">IosPay</button>
        <button type="button" class="btn btn-primary Orderbtn">OrderInfo</button>
        <button type="button" class="btn btn-primary Paymentbtn">Payment</button>
    </div>
    <div class="showinfo user-show zhifuresult">
        <div class="titleinfo"></div>
        <div class="ChannelCallBack hidediv"></div>
        <div style="height:600px;" ui-grid="gridiospay" ui-grid-selection ui-grid-exporter ui-grid-grouping
             ui-grid-resize-columns ui-grid-move-columns class="hidediv" id="iospaygrid"></div>
        <div style="height:600px;" ui-grid="gridorderinfo" ui-grid-selection ui-grid-exporter ui-grid-grouping
             ui-grid-resize-columns ui-grid-move-columns class="hidediv" id="orderinfogrid"></div>
        <div style="height:600px;" ui-grid="gridpayment" ui-grid-selection ui-grid-exporter ui-grid-grouping
             ui-grid-resize-columns ui-grid-move-columns class="hidediv" id="paymentgrid"></div>
    </div>
</div>
<script>
    $(document).ready(function () {

    })
</script>
<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/pf-manage/zhifuserach.js"></script>
<%@ include file="/jsp/commons/_footer.jsp" %>
