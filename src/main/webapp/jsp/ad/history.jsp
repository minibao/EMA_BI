<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/jsp/commons/_header.jsp" %>

<div class="main-content span9 hot-cloud-msg-page" ng-controller="statsHotCloudShortCnntSet">
    <h1 class="text-center">热云广告投放新增及留存信息查询</h1>

    <div class="sub-header"><i class="wangeditor-menu-img-link"></i>热云广告</div>
    <div class="filter-select">
       <span class="select-item">
        <select name="" id="appId">
            <option value="20015" selected="selected">次元大作战</option>
            <option value="20012">英灵召唤师</option>
            <option value="20007">无尽远征</option>
        </select>
        <select name="" ng-model="chId" class="multi-select select-picker"
                selectpicker multiple data-selected-text-format="count > 4" data-actions-box="true" title="请选择渠道">
            <option value="70">IOS_70</option>
            <option value="71">IOS_71</option>
            <option value="26">安卓</option>
        </select>
      </span>
     <span class="select-item">
        <span class=""><input type="checkbox" id="allShortUrl">全部短链</span>
        <input type="text" placeholder="请输入查询短链" class="ipt-init" id="shortUrl">
    </span>
      <span class="select-item">
        <span class="">时间范围:<%@ include file="/jsp/commons/_daterangepicker.jsp" %></span>
      </span>
        <hr>
      <span class="select-item">
        选择留存日期：
          <select class="multi-select" selectpicker multiple data-actions-box="true" ng-model="filter.reday"
                  ng-options="item.dictName for item in retentionFilter" tickIcon="icon-ok" title="选择留存日期">
          </select>
      </span>
        <a href="javascript:;" class="btn btn-success" ng-click="searchHotCloudSC()">查询</a>
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
            <p>appId:<span id="appId-sp"></span></p>
            <p>regDate: <span id="regDate"></span></p>
            <%--<p>RePercentnull:<span id="RePercentnull"></span></p>--%>
            <%--<p>ReNumnull:<span id="ReNumnull"></span></p>--%>
            <p>spreadName:<span id="spreadName"></span></p>
            <p>spreadurl:<span id="spreadurl"></span></p>
            <p>installCount:<span id="installCount"></span></p>
            <p>regMemberCount:<span id="regMemberCount"></span></p>
            <p>chId:<span id="chId"></span></p>

            <p>当前花费为:<span id="cost"></span></p>
            <input id="in-cost" type="text" placeholder="请输入花费">
            <a id="update-cost" class="btn btn-success btn1">修改</a>
            <a id="mask-close" class="btn btn-success btn2">关闭</a>
        </div>
    </div>
</div>
<style>
    .mask {
        display: none;
        width: 100%;
        height: 100%;
        /*background: #85fe3c;*/
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
        $('#allShortUrl').prop('checked', true);
        $('#shortUrl').on('focus', function () {
            $('#allShortUrl').prop('checked', false);
        })
        $('#allShortUrl').on('click', function () {
            if ($(this).is(':checked')) {
                $('#shortUrl').val('');
            }
        })
    })
</script>
<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/ad/history.js"></script>
<%@ include file="/jsp/commons/_footer.jsp" %>
