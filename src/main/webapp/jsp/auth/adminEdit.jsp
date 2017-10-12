<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%>

<div class="main-content span9 " ng-controller="authAdminEdit">
	<h1 class="text-center">权限修改</h1>
	
<table class="table table-bordered">

  <tbody>
    <tr >
      <th scope="row">账号</th>
      <td><input ng-model="member.name" value="{{member.name}}"/></td>
    </tr>
    <tr >
      <th scope="row">密码</th>
      <td><input ng-model="member.password" value=""/></td>
    </tr>
    <tr >
      <th scope="row">确认密码</th>
      <td><input ng-model="member.rptpassword" value=""/></td>
    </tr>
    <tr >
      <th scope="row">所在组</th>
      <td>
     <select ng-model="member.authRoleId" ng-options="item.id as item.roleName for item in sysRoleList" >
      	<option value="0">-- 请选择 --</option>
      
      </select>
     </td>
    </tr>
    <tr >
      <th scope="row">所属人</th>
      <td><input /></td>
    </tr>
    <tr >
      <th scope="row">联系方式</th>
      <td><input ng-model="member.mobile"/></td>
    </tr>
  </tbody>
</table>

<a href="#" ng-click="adminEditSubmit()"><button type="submit" class="btn" ng-click="">确定</button></a>
<a href="./adminList.jsp?mid={{message.mid}}&token={{message.token}}" target="_self" ><button type="submit" class="btn" ng-click="">取消</button></a>
</div>

<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/auth/admin_edit.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>