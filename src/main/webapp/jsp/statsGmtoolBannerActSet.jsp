<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%> 

<div class="main-content span9 gmtools-bannerActSet-page" ng-controller="statsGmtoolBannerActSet">
	<h1 class="text-center">跑马灯配置</h1>
	<hr>
	<!--列表弹出框-->
	<div id="openWindowMasking" class="banneractset-window">
		<table id="bannerActSetTable">
			<thead>
				<tr>
					<td class="banner-set-title">跑马灯标题：</td>
					<td><input type="text" ng-model="bannerTitle" placeholder="请输入跑马灯标题"></td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>优先级：</td>
					<td>
						<select name="" id="bannerPriority">
							<option value="1">1级</option>
							<option value="2">2级</option>
							<option value="3">3级</option>
							<option value="4">4级</option>
							<option value="5">5级</option>
							<option value="6">6级</option>
							<option value="7">7级</option>
							<option value="8">8级</option>
							<option value="9">9级</option>
							<option value="10">10级</option>
						</select>
					</td>
				</tr>
				<tr>
					<td>轮播次数：</td>
					<td>
						<input type="number" id="bannerNum" placeholder="不输入则默认一次">
					</td>
				</tr>
				<tr>
					<td>公告内容：</td>
					<td style="background:#eee;">
						<textarea class="email-body" id="editor-text" cols="30" rows="10"></textarea>					  	
					</td>
				</tr>
				<tr>
					<td>轮播间隔：</td>
					<td>
						<form action="" id="bannerTimechecked">
							<span><input type="radio" name="bannerInterval" value="5">5秒</span>
							<span><input type="radio" name="bannerInterval" value="10">10秒</span>
							<span><input type="radio" name="bannerInterval" value="30">30秒</span>
							<span><input type="radio" name="bannerInterval" value="60">60秒</span>
						</form>
					</td>
				</tr>
			</tbody>
			<tfoot>
				<tr class="cmd-btn">
					<td colspan="2">
						<button class="btn btn-success" ng-click="sentBannerActSet()">发送</button>
					</td>
				</tr>
			</tfoot>
		</table>
	</div>
	
	<div class="info-tips-window" ng-show = "infoTips == 1">
		<div>
			<p ng-show = "goodTips == 1">新增成功，正在返回。</p>
			<p ng-show = "errTips == 1">该标题跑马灯已存在!</p>
		</div>
	</div>
</div>
     
<script>
    $(document).ready(function(){
    	$("input[name=bannerInterval]:eq(0)").prop("checked",true);
    	$('#bannerTimechecked input[name="bannerInterval"]').on('click',function(){
    		$(this).prop('checked',true).siblings().prop('checked',false);
    	})
    	//初始化角色时间选择
    	$('.date-picker-single:eq(0)').addClass('date-hour');
    	$('.date-picker-single:eq(1)').addClass('date-hour');
    	initializationDateHour();
    })
</script>
<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/stats_gmtool_bannercact_set.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>
