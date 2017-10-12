<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%> 

<div class="main-content span9 gmtools-bannerAct-page" ng-controller="statsGmtoolBannerAct">
	<h1 class="text-center">跑马灯列表</h1>
	<hr>
	<!--公告列表-->
	<table id="publicActList" class="publicact-list">
		<thead>
			<tr>
				<th class="banner-content-sm">跑马灯标签</th>
				<th style="width:4%;">操作</th>
			</tr>
		</thead>		
		<tbody id="tbodyList">

		</tbody>
		<tfoot>
			<tr>
				<td colspan="6">PS:请谨慎操作</td>
			</tr>
		</tfoot>
	</table>

	<!--列表弹出框-->
	<div id="openWindowMasking" class="open-window-publicact">
		<div class="infor-window" ng-show="infoTips == 0">
			<p>确认删除该跑马灯</p>
			<div class="btn-area">
				<button class="btn btn-default" id="backToInfoPage">返回</button>
				<button class="btn btn-success" id="conformToDel" ng-click="conformToDelFnc()">确定</button>
			</div>
		</div>
		<div class="infor-window" ng-show="infoTips == 1">
			<p>成功删除！</p>
		</div>
		<div class="infor-window" ng-show="infoTips == 2">
			<p>删除失败，请检查跑马灯状态</p>
		</div>
	</div>

</div>
     
<script>
    $(document).ready(function(){
    	$('#backToInfoPage').on('click',function(){
    		$('#openWindowMasking').hide();
    	});
    	$('#tbodyList').on('click','button[name="delBtn"]',function(){
    		$('#openWindowMasking').show();
    		var _index = $(this).attr('data-index');
    		$('#conformToDel').attr('date-index',_index);
    	})
    	//初始化角色时间选择
    	$('.date-picker-single:eq(0)').addClass('date-hour');
    	$('.date-picker-single:eq(1)').addClass('date-hour');
    	initializationDateHour();    	
    })
</script>

<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/stats_gmtool_bannercact_list.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>
