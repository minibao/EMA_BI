<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%>

<div class="main-content span9 " ng-controller="authAdminAdd">
	<h1 class="text-center">新增管理员</h1>
	
<table class="table table-bordered">

  <tbody>
    <tr >
      <th scope="row">账号</th>
      <td><input ng-model="member.name"/></td>
    </tr>
    <tr >
      <th scope="row">密码</th>
      <td><input ng-model="member.password" /></td>
    </tr>
    <tr >
      <th scope="row">确认密码</th>
      <td><input ng-model="member.rptpassword" /></td>
    </tr>
    <tr >
      <th scope="row">所在组</th>
      <td>
<!--       <select ng-model="member.authRoleId" >
      	<option ng-repeat="item in sysRoleList" value="{{item.id}}">{{item.roleName}}</option>
      </select> -->
      
      <select ng-model="member.authRoleId" ng-options="item.id as item.roleName for item in sysRoleList" >
      	<option value="0">-- 请选择 --</option>
      
      </select>
      </td>
    </tr>
    <tr >
      <th scope="row">邮件</th>
      <td><input ng-model="member.email"/></td>
    </tr>
    <tr >
      <th scope="row">联系方式</th>
      <td><input ng-model="member.mobile"/></td>
    </tr>
  </tbody>
</table>

<a href="#" ng-click="adminAddSubmit()"><button type="submit" class="btn" ng-click="">确定</button></a>


</div>

<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/auth/admin_add.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>