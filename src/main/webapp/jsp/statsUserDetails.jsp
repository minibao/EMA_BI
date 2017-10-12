<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%> 

<div class="main-content span9 user-detail-page" ng-controller="statsUsersDetails">
	<h1 class="text-center">玩家详细信息</h1>
	<hr>
	<table class="user-details-table">
		<thead><tr><td colspan="7">玩家详情</td></tr></thead>
		<tbody>
			<tr>
				<td rowspan="4" class="table-note">基础信息</td>
				<td><span class="td-item-name">账号:</span><span class="td-item-cont" id="userUid">{{userAllianceId}}</span></td>
				<td><span class="td-item-name">角色ID:</span><span class="td-item-cont" id="userId">{{userId}}</span></td>
				<td><span class="td-item-name">角色名:</span><span class="td-item-cont" id="userName">{{userName}}</span></td>
				<td><span class="td-item-name">职业:</span><span class="td-item-cont" id="userVocation">{{userVocation}}</span></td>
				<td><span class="td-item-name">等级:</span><span class="td-item-cont" id="userExp">{{userLv}}</span></td>
				<td><span class="td-item-name">当前经验:</span><span class="td-item-cont" id="userExp">{{userExp}}</span></td>
			</tr>
			<tr>
				<td><span class="td-item-name">账号状态:</span><span class="td-item-cont" id="userState">{{userState}}</span></td>
				<td><span class="td-item-name">禁言状态:</span><span class="td-item-cont" id="silenceState">{{silenceState}}</span></td>
				<td><span class="td-item-name">注册时间:</span><span class="td-item-cont" id="registerDate" style="display:block">{{registerDate}}</span></td>
				<td><span class="td-item-name">注册IP:</span><span class="td-item-cont" id="registerIP">{{registerIP}}</span></td>
				<td><span class="td-item-name">最后登录IP:</span><span class="td-item-cont" id="lastLoginIP">{{lastLoginIP}}</span></td>
				<td><span class="td-item-name">服务器:</span><span class="td-item-cont" id="">{{sever}}</span></td>
			</tr>
			<tr>
				<td><span class="td-item-name">VIP:</span><span class="td-item-cont" id="userVIP">{{userVIP}}</span></td>
				<td><span class="td-item-name">钻石币:</span><span class="td-item-cont" id="userdiamond">{{userdiamond}}</span></td>
				<td><span class="td-item-name">金币:</span><span class="td-item-cont" id="userGold">{{userGold}}</span></td>
				<td class="postion-rel">
					<button class="btn btn-default" ng-click="openList('prestige')">声望列表</button>
					<div class="open-list prestige-list">
						<table>
							<thead>
								<tr>
									<th>声望ID</th>
									<th>声望等级</th>
									<th>声望经验</th>
								</tr>
							</thead>
							<tbody id="prestiges" class="over-tbody">
								
							</tbody>
							<tfoot>
								<tr>
									<td colspan="3">
										<a href="javascript:$('.prestige-list').removeClass('reback-pos');" class="btn btn-success">返回</a>
									</td>
								</tr>
							</tfoot>
						</table>
					</div>
				</td>
				<td class="postion-rel">
					<button class="btn btn-default" ng-click="openList('cells')">背包列表</button>
					<div class="open-list cells-list">
						<table>
							<thead>
								<tr>
									<th>物品ID</th>
									<th>物品数量</th>
								</tr>
							</thead>
							<tbody id="cells" class="over-tbody">
								
							</tbody>
							<tfoot>
								<tr>
									<td colspan="2">
										<a href="javascript:$('.cells-list').removeClass('reback-pos');" class="btn btn-success">返回</a>
									</td>
								</tr>
							</tfoot>
						</table>
					</div>
				</td>
				<td class="postion-rel">
					<button class="btn btn-default" ng-click="openList('equip')">当前装备列表</button>
					<div class="open-list equips-list">
						<table>
						<thead>
							<th>装备ID</th>
						</thead>
						<tbody id="equips" class="over-tbody">
							
						</tbody>
						<tfoot>
							<td>
								<a href="javascript:$('.equips-list').removeClass('reback-pos');" class="btn btn-success">返回</a>
							</td>
						</tfoot>	
						</table>
					</div>
				</td>				
			</tr>
			<tr><td class="splic-line" colspan="7"></td></tr>
			<tr style="text-align: center;">
				<td class="table-note">玩家日志</td>
				<td><button class="btn" ng-click="openLogWindow('login')">登录日志</button></td>
				<td><button class="btn" ng-click="openLogWindow('gold')">金币日志</button></td>
				<td><button class="btn" ng-click="openLogWindow('diamond')">钻石币日志</button></td>
				<td></td>
			 	<td></td>
			 	<td><span id=""></span></td>
			</tr>
		</tbody>
	</table>	
	
	<table class="gm-opr-table">
		<thead><tr><td colspan="3">GM操作：</td></tr></thead>
		<tbody>
			<tr>
				<td>账号冻结时间:</td>
				<td>
					<span>
						<input type="number" id="freezeDays" min="0">天
						<input type="number" id="freezeHours" min="0">时
						<input type="number" id="freezeMinutes" min="0">分
						<input type="number" id="freezeSeconds" min="0">秒
					</span>
				</td>
				<td><button class="btn" ng-click="openTipsWindow('freeze')">确定</button></td>
			</tr>
			<tr>
				<td>账号禁言时间:</td>
				<td>
					<span>
						<input type="number" max="30" id="silenceDays" min="0">天
						<input type="number" max="720" id="silenceHours" min="0">时
						<input type="number" max="43200" id="silenceMinutes" min="0">分
						<input type="number" max="2592000" id="silenceSeconds" min="0">秒
					</span>
				</td>
				<td><button class="btn" ng-click="openTipsWindow('silence')">确定</button></td>
			</tr>
			<tr>
				<td>是否踢下线:</td>
				<td>
					<select name="" id="loginOutSlc">
						<option value="yew">是</option>
						<option value="no">否</option>
					</select>
				</td>
				<td><button class="btn" ng-click="openTipsWindow('loginOut')">确定</button></td>
			</tr>
			<tr>
				<td>切换场景:</td>
				<td>
					<select name="" id="sceneChange">
						<option value="scene_1">场景一</option>
						<option value="scene_2">场景二</option>
						<option value="scene_3">场景三</option>
						<option value="">~~~~~~~</option>
					</select>
				</td>
				<td><button class="btn" ng-click="openTipsWindow('scene')">确定</button></td>
			</tr>
			<tr>
				<td>设置任务:</td>
				<td>
					<span>任务ID:<input type="text" id="missionId"></span>
					<span>步骤ID:<input type="text" id="stepId"></span>
				</td>
				<td><button class="btn" ng-click="openTipsWindow('mission')">确定</button></td>
			</tr>
			<tr>
				<td>设置成就:</td>
				<td>
					<span>成就ID:<input type="text" id="achieveId"></span>
				</td>
				<td><button class="btn" ng-click="openTipsWindow('achieve')">确定</button></td>
			</tr>
			<tr><td colspan="3" class="splic-line"></td></tr>
			<tr>
				<td>赠送金币:</td>
				<td><input type="number" placeholder="请输入金币数量" id="goldCount" class="ipt-reset"></td>
				<td><button class="btn" ng-click="openTipsWindow('gold')">确定</button></td>
			</tr>
			<tr>
				<td>赠送钻石币:</td>
				<td><input type="number" placeholder="请输入钻石币数量" id="diamondCount" class="ipt-reset"></td>
				<td><button class="btn" ng-click="openTipsWindow('diamond')">确定</button></td>
			</tr>
			<tr>
				<td>赠送道具:</td>
				<td>
					<select name="" id="gameItem">
						<option value="">道具1</option>
						<option value="">道具2</option>
						<option value="">道具3</option>
						<option value="">道具4</option>
						<option value="">道具5</option>
					</select>
				</td>
				<td><button class="btn" ng-click="openTipsWindow('items')">确定</button></td>
			</tr>
			<tr>
				<td>赠送VIP经验:</td>
				<td><input type="number" placeholder="请输入VIP经验值" id="vipExp" class="ipt-reset"></td>
				<td><button class="btn" ng-click="openTipsWindow('vipExp')">确定</button></td>
			</tr>
		</tbody>
		<tfoot>
			<tr><td colspan="3"><button onclick="javascript:history.back(-1);" class="btn btn-reback">返回</button></td></tr>
		</tfoot>
	</table>	
	
	<div id="openWindow" class="open-window-masking">
		<!--非正常跳转提示-->
		<div id="informationErr" class="center-window">
			<p class="text-center">非正常跳转，正在退出登录！</p>
		</div>
		<!--提示弹框-->
		<div id="informationTips" class="center-window">
			<p id="textTips">是否确认修改：</p>
			<span id="contTips" class="tip-span">-------------</span>
			<div><button class="btn btn-default backToInfoPage">返回</button><button class="btn btn-success" ng-click="gmOperationConfirm()">确认</button></div>
		</div>	
	</div>
	<div class="masking-bl" id="loginMasking">
		<!--登录日志弹窗-->
		<div id="informationLog" class="center-window center-log-table">
			<p class="text-center" id="dateLogTitle">xxxx日志</p>
		 	<div ui-grid="gridOptions" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns ui-grid-move-columns></div>
		 	<div><button class="btn btn-default" id="rebackTohome">返回</button></div>
		</div>
	</div>

</div>
     
<script>
    $(document).ready(function(){
    	$(document).on('click','.backToInfoPage',function(){
    		$('#openWindow').hide();
    	});
		$('#rebackTohome').on('click',function(){
			$('#loginMasking').removeClass('reset-pos');
		})
    })
</script>

<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/stats_users_details.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>

