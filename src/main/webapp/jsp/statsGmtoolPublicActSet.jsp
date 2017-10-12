<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%> 

<div class="main-content span9 gmtools-publicActSet-page" ng-controller="statsGmtoolPublicActSet">
	<h1 class="text-center">弹窗公告设置(新增)</h1>
	<hr>
	<!--列表弹出框-->
	<div id="openWindowMasking" class="open-window-publicactset">

		<table id="openPublicAct">
			<thead>
				<tr>
					<td>公告标题：</td>
					<td><input type="text" value="{{actTitle}}"></td>
				</tr>
				<tr>
					<td>服务器列表：</td>
					<td><%@ include file="/jsp/commons/_serverpicker.jsp"%></td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>公告内容：</td>
					<td>
						<textarea class="public-textarea" name="" placeholder="请输入公告内容"></textarea>
					</td>
				</tr>
				<tr>
					<td>开始时间：</td>
					<td><%@ include file="/jsp/commons/_datepicker.jsp"%></td>
				</tr>
				<tr>
					<td>结束时间：</td>
					<td><%@ include file="/jsp/commons/_datepicker.jsp"%></td>
				</tr>
			</tbody>
			<tfoot>
				<tr class="cmd-btn">
					<td colspan="2">
						<button class="btn btn-success" ng-click="">发送</button>
					</td>
				</tr>
			</tfoot>
		</table>
	</div>

</div>
     
<script>
    $(document).ready(function(){
    	//初始化角色时间选择
    	$('.date-picker-single:eq(0)').addClass('date-hour');
    	$('.date-picker-single:eq(1)').addClass('date-hour');
    	initializationDateHour();    	
    })
</script>

<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/stats_gmtool_publicact_set.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>
