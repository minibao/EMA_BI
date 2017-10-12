<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/jsp/commons/_header.jsp" %>

<div class="main-content span9 consume-page" ng-controller="statsConsumeDetail">
  <h1 categorySlc="98" name="钻石" class=" text-center categorySlc">钻石流通</h1>
  <hr>
  <form class="form-inline">
    <%@ include file="/jsp/commons/_serverpicker.jsp" %>
    <%@ include file="/jsp/commons/_channelpicker.jsp" %>
    <%@ include file="/jsp/commons/_channeltagpicker.jsp" %>
    <span>时间：<%@ include file="/jsp/commons/_daterangepicker.jsp" %></span>

    <%--<select name="" id="categorySlc" class="select-ipt">--%>
    <%--<option value="99" selected="selected">金币</option>--%>
    <%--<option value="98">钻石</option>--%>
    <%--<option value="97">经验</option>--%>
    <%--</select>--%>
    <button type="submit" class="btn" ng-click="consumeDetail()">搜索</button>
    <button class="btn btn-success co" ng-click="export()">下载表格</button>
    <hr>
  </form>
  <div ui-grid="gridOptions" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns
       ui-grid-move-columns style="height: 500px;"></div>
</div>

<script>
  $(document).ready(function () {
    //时间选框的二次初始化
    $('#selectFilter').on('change', function () {
      initializationDateRange();
      initializationdDefaultValue();
    })
  })
</script>

<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/stats_consume_detail.js"></script>
<%@ include file="/jsp/commons/_footer.jsp" %>