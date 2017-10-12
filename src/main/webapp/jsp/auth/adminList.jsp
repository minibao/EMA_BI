<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%>

<div class="main-content span9 " ng-controller="authAdminList">
	<h1 class="text-center">管理员列表</h1>
	
<table class="table table-bordered">
<thead>
    <tr>
      <th>账号</th>
      <th>所属人</th>
      <th>组别</th>
      <th>状态</th>
      <th>手机</th>
      <th>邮件</th>
      <th colspan="2">操作</th>
    </tr>
  </thead>
  <tbody>
    <tr ng-repeat="item in memberList">
      <th scope="row">{{item.uid}}</th>
      <td>{{item.name}}</td>
      <td>{{item.roleName}} ({{item.authRoleId}})</td>
      <td></td>
      <td>{{item.mobile}}</td>
      <td>{{item.email}}</td>
      <td><a href="./adminEdit.jsp?uid={{item.uid}}&mid={{message.mid}}&token={{message.token}}" target="_self">修改</a></td>
      <td><a ng-click="adminDeleteSubmit(item.uid)" >删除</a></td>
    </tr>
  </tbody>
</table>
<a href="./adminAdd.jsp?mid={{message.mid}}&token={{message.token}}" target="_self"><button type="submit" class="btn" ng-click="">新增</button></a>

</div>

<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/auth/admin_list.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>