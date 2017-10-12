<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%> 

<div class="main-content span9 user-inquire-page" ng-controller="statsUsersInquire">
	<h1 class="text-center">玩家查询</h1>
	<hr>
	<table class="search-table">
		<thead>
			<tr><td>玩家信息查询<i class="color-defult info-tips">(请选择一个途径进行查询)</i></td></tr>
		</thead>
		<tbody>
			<tr><td><%@ include file="/jsp/commons/_serverpicker.jsp"%><%@ include file="/jsp/commons/_channelpicker.jsp"%><%@ include file="/jsp/commons/_channeltagpicker.jsp"%></td><td><button class="btn search-info" ng-click="UsersInquireSearch('sevChnCht')">查询</button></td></tr>
			<tr><td><i>游戏账号：</i><input type="text" id="uidVal" placeholder="请输入游戏账号"></td><td><button class="btn search-info" ng-click="UsersInquireSearch('uid')">查询</button></td></tr>
			<tr><td><i>游戏角色名：</i><input type="text" id="userNameVal" placeholder="请输游戏角色名"></td><td><button class="btn search-info" ng-click="UsersInquireSearch('userName')">查询</button></td></tr>
			<tr>
				<td class="pf-info-ipt">
					<i>平台账号：</i>
					<input type="text" placeholder="请输入allianceId" id="allianceId">
					<input type="text" placeholder="请输入allianceUid" id="allianceUid">
				</td>
					<td><button type="button" class="btn search-info" id="pfSearchBtn" ng-click="UsersInquireSearch('pfUid')">查询</button>
				</td>
			</tr>
		</tbody>
	</table>

	<table id="searchResult" class="search-result-table">
		<tbody>
			
		</tbody>
	</table>		

</div>
     
<script>
    $(document).ready(function(){
    	if($('#allianceId').val() == '' || $('#allianceUid').val() == ''){
    		$('#pfSearchBtn').attr('disabled',true);
    	}
    	$('#allianceId').on('change',function(){
    		if($('#allianceId').val() != '' && $('#allianceUid').val() != ''){
    			$('#pfSearchBtn').removeAttr('disabled');
    		}
    	});
    	$('#allianceUid').on('change',function(){
    		if($('#allianceId').val() != '' && $('#allianceUid').val() != ''){
    			$('#pfSearchBtn').removeAttr('disabled');
    		}
    	})
    })
</script>

<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/stats_users_inquire.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>

