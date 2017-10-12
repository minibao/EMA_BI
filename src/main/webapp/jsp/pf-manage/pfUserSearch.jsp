<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%> 

<div class="main-content span9" ng-controller="pfUserSearchCtrl">
  <h1 class="text-center">用户后台查询</h1>
  <hr>
  <form>
    <div class="pf-search-item">
      <span>Email：</span>
      <input type="email" class="form-control" ng-model="iptEmail" placeholder="Email">
    </div>
    <div class="pf-search-item">
      <span>UID：</span>
      <input type="text" class="form-control" ng-model="iptUid" placeholder="UID">
    </div>
    <div class="pf-search-item">
      <span>设备ID：</span>
     <input type="text" class="form-control" ng-model="iptdevice" placeholder="设备ID">
    </div>
    <div class="pf-search-item">
      <span>手机号：</span>
      <input type="tel" class="form-control" ng-model="iptphone" placeholder="手机号">
    </div>
    <div class="pf-search-item" style="width:10%;">
      <button class="btn btn-primary" ng-click="serachUserInfo()">搜索</button>
    </div>
  </form>
  <div id="spin"></div>  
  <div class="user-info-table">
    <h3 ng-if="reSuccess == 'conBad'" class="text-center">服务器连接失败，请确认连接状态！</h3>
    <h3 ng-if="reSuccess == 'resBad'" class="text-center">没有该信息对应的内容！</h3>
    <table ng-if="reSuccess == 'resGood'" class="table-striped table-hover table-bordered text-left">
      <tbody>
        <tr>
          <th>UID:</th>
          <td>{{uid}}</td>
        </tr>
        <tr>
          <th>Email:</th>
          <td>{{email}}</td>
        </tr>
        <tr>
          <th>mobile:</th>
          <td>{{mobile}}</td>
        </tr>
        <tr>
          <th>nickname:</th>
          <td>{{nickname}}</td>
        </tr>
        <tr>
          <th>password:</th>
          <td>{{password}}</td>
        </tr>
        <tr>
          <th>status:</th>
          <td>{{status}}</td>
        </tr>
        <tr>
          <th>androidDeviceKey:</th>
          <td>{{androidDK}}</td>
        </tr>
        <tr>
          <th>iosDeviceKey:</th>
          <td>{{iosDK}}</td>
        </tr>
      </tbody>
      <tfoot>
        <th></th>
        <td class="btn btn-success" ng-click="openFixWin('fix')">修改内容</td>
      </tfoot>
    </table>
  </div>
  <!--信息修改弹出框-->
    <div class="open-masking" ng-if="upDataOpen">
      <table class="table-hover table-bordered table-op-center">
        <thead>
          <tr>
            <th>项目</th>
            <th>原内容</th>
            <th>修改内容</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Email</td>
            <td>{{email}}</td>
            <td><input type="email" placeholder="输入新email" id="newEmail"></td>
          </tr>
          <tr>
            <td>mobile</td>
            <td>{{mobile}}</td>
            <td><input type="number" placeholder="输入手机号" id="newMobile"></td>
          </tr>
          <tr>
            <td>password</td>
            <td>{{password}}</td>
            <td><input type="password" placeholder="输入新密码" id="newPsw"></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-center">
              <a ng-click="openFixWin('close')" class="btn btn-default">返回</a>
              <a class="btn btn-success" ng-click="upDataInfo()">确定</a>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
</div>      
<script>
$(document).ready(function(){
	
})    
</script>    
<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/pf-manage/pf_user_search.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>
