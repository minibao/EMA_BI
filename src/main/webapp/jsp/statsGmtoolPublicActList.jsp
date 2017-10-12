<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%> 

<div class="main-content span9 gmtools-publicAct-page" ng-controller="statsGmtoolPublicAct">
	<h1 class="text-center">弹窗公告列表(修改)</h1>
	<hr>
	<!--公告列表-->
	<table id="publicActList" class="publicact-list">
		<thead>
			<tr>
				<td>公告标题</td>
				<td>开始时间</td>
				<td>结束时间</td>
				<td>状态</td>
				<td>操作</td>
			</tr>
		</thead>		
		<tbody id="tbodyList">
			<tr>
				<td>标题01</td>
				<td>2015-02-12 23:35:15</td>
				<td>2015-02-16 24:35:15</td>
				<td>有效</td>
				<td><button class="btn btn-default" ng-click="openPublicActSetting('0')">修改</button></td>
			</tr>
			<tr>
				<td>标题02</td>
				<td>2015-02-14 02:35:15</td>
				<td>2015-02-16 12:35:15</td>
				<td>过期</td>
				<td><button class="btn btn-default" ng-click="openPublicActSetting('1')">修改</button></td>
			</tr>
			<tr>
				<td>标题03</td>
				<td>2015-08-05 12:14:15</td>
				<td>2015-02-16 22:35:15</td>
				<td>过期</td>
				<td><button class="btn btn-default" ng-click="openPublicActSetting('2')">修改</button></td>
			</tr>
		</tbody>
		<tfoot>
			<tr>
				<td colspan="5">PS:请谨慎操作</td>
			</tr>
		</tfoot>
	</table>

	<!--列表弹出框-->
	<div id="openWindowMasking" style="display:none" class="open-window-publicact">

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
						<textarea class="public-textarea" name="" ng-model="publicActTextarea" placeholder="请输入公告内容"></textarea>
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
						<button class="btn btn-default" id="backToInfoPage">返回</button>
					</td>
				</tr>
			</tfoot>
		</table>
	</div>

</div>
     
<script>
    $(document).ready(function(){
    	$('#backToInfoPage').on('click',function(){
    		$('#openWindowMasking').hide();
    	});
    	//初始化角色时间选择
    	$('.date-picker-single:eq(0)').addClass('date-hour');
    	$('.date-picker-single:eq(1)').addClass('date-hour');
    	initializationDateHour();    	
    })
</script>

<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/stats_gmtool_publicact_list.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>
