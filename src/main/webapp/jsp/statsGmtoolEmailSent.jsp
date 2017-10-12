<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%> 

<div class="main-content span9 gmtools-emailSent-page" ng-controller="statsGmtoolEmailSent">
	<h1 class="text-center">邮件发送</h1>
	<hr>
	<div class="email-content">
		<table id="emailContent"> 
			<thead>
				<tr>
					<td class="email-title">发送账号：</td>
					<td>
						<select name="" id="gmId">
							<option value="">客服A</option>
							<option value="">客服B</option>
							<option value="">客服C</option>
						</select>
					</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>服务器：</td>
					<td><%@ include file="/jsp/commons/_serverpicker.jsp"%></td>
				</tr>
				<tr>
					<td>收件人：</td>
					<td class="ipt-recipients"><textarea name="" id="uidlists" placeholder="请输入收件人UID，为空则发送全体玩家" ng-model="usersUidList"></textarea></td>
					<td style="border:none;">
						<form action=""  runat="server" method="post">
							<a href="javascript:;" class="ipt-upload"><input type="file" accept=".txt" onchange ="angular.element(this).scope().upLoadUid(this.files)">批量导入</a>
						</form>	
						<button type="button" class="btn btn-default filter-btn" ng-click="openScreenConds()">条件筛选</button>
					</td>
				</tr>
				<tr>
					<td>邮件标题：</td>
					<td><input type="text" placeholder="请输入邮件标题" ng-model="emailTitle"></td>
				</tr>
				<tr>
					<td>邮件内容：</td>
					<td style="background:#eee;">					  	
				   	 	<textarea class="email-body" id="editor-text" cols="30" rows="10" placeholder="请输入邮件内容"></textarea>
					</td>
				</tr>
				<tr>
					<td>包含物品：</td>
					<td><input style="width: 100%;" type="text" ng-model="items" placeholder="以道具种类|道具id|道具数量的形式，多个以逗号分隔，例如：1|71113201|1"></td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<td colspan="2"><button type="button" class="btn btn-success" ng-click="sendTheEmail()">发送</button></td>
				</tr>
			</tfoot>
		</table>
	</div>
	<div ng-show="screenCondition == 1" class="screen-window-masking">		
		<div class="conditions-content">
			<p class="screen-title">筛选条件</p>
			<div>
				<div class="list-row">
					服务器：<%@ include file="/jsp/commons/_serverpicker.jsp"%>  <!--服务器-->
					渠道：<%@ include file="/jsp/commons/_channelpicker.jsp"%> <!--渠道-->
					子渠道：<%@ include file="/jsp/commons/_channeltagpicker.jsp"%>	<!--子渠道-->
				</div>
				<div class="list-row">
					职业：<%@ include file="/jsp/commons/_vocationpicker.jsp"%>  <!--选择职业-->
					等级范围：<input type="number" ng-model="starGrade" min="0" placeholder="请输入起始等级"> <!--等级范围-->
					<input type="number" ng-model="endGrade" min="0" placeholder="请输入结束等级">
				</div>
				<div class="list-row"><!--留存-->
				 	留存状态：<%@ include file="/jsp/commons/_retainpicker.jsp"%>
				 	付费选择：<%@ include file="/jsp/commons/_paypicker.jsp"%> 
				</div>
				<div class="list-row" style="height: 80px;border-bottom: 1px solid #ccc;"><!--角色创建时间-->
	    				角色创建时间：<%@ include file="/jsp/commons/_daterangepicker.jsp"%>
					<span>
						<button type="button" class="btn btn-success" ng-click="searchUserUid()" style="margin-bottom: 10px;">搜索</button>
					</span> 
				</div>
			</div>
			<div>
			<table id="" class="table-striped table-bordered table-reset">
				<thead>
					<tr class="text-center">
						<th>服务器</th>
						<th>渠道</th>
						<th>子渠道</th>
						<th>UID</th>
						<th>职业</th>
						<th>等级</th>
						<th>付费状态</th>
						<th>留存状态</th>
						<th>创建角色时间</th>
						<th>全选<input type="checkbox" id="checkall" name="checked" ng-click="checkAll()"></th>
					</tr>
				</thead>
				<tbody id="searchResBody">
				</tbody>
				<tfoot>
					
				</tfoot>
			</table>
			<div class="btn-bar-line">
				<button type="button" class="btn btn-default" ng-click="reback()">返回</button>
				<button type="button" class="btn btn-success" ng-click="addToUidText()">确定</button>
			</div>
			</div>			
		</div>
		<div id="spin"></div> 
	</div>
	<div class="screen-window-masking" ng-show="screenCondition == 2">
		<div class="conditions-content">
			<p>邮件发送成功，正在返回</p>
		</div>
	</div>
</div>
     
<script>
    $(document).ready(function(){
    	//textarea初始化
    	//var editor = new wangEditor('editor-trigger');
    	//$('#editor-trigger').css('height','220px');
    	//初始化角色时间选择
    	$('.date-picker-star').addClass('date-hour');
    	$('.date-picker-end').addClass('date-hour');
    	initializationDateHour();    	
    	//editor.create();    	
    })
</script>

<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/stats_gmtool_email_sent.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>