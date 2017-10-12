<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%> 

<div class="main-content span9 " ng-controller="authGroupList">
	<h1 class="text-center">权限组列表</h1>
	
<table class="table table-bordered">
<thead>
    <tr>
      <th>权限组</th>
      <th>状态</th>
      <th>修改</th>
      <th>人员</th>
      <th>删除</th>
    </tr>
  </thead>
  <tbody>
    <tr ng-repeat="item in sysRoleList">
      <th scope="row">{{item.roleName}}</th>
      <td>{{item.roleStatus}}</td>
      <td><a href="./groupEdit.jsp?groupId={{item.id}}&mid={{message.mid}}&token={{message.token}}" target="_self">修改</a></td>
      <td><a href="./groupMember.jsp?groupId={{item.id}}&mid={{message.mid}}&token={{message.token}}" target="_self">修改</a></td>
      <td><a href="#" ng-click="groupDeleteSubmit(item.id)">删除</a></td>
    </tr>
  </tbody>
</table>
<a href="./groupAdd.jsp?mid={{message.mid}}&token={{message.token}}" target="_self"><button type="submit" class="btn" ng-click="">新增</button></a>

</div>

<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/auth/group_list.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>