<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%> 

<div class="main-content span9 " ng-controller="authGroupMember">
	<h1 class="text-center">修改人员</h1>
	
<table class="table">

  <tbody>
    <tr >
      <th scope="row">名称</th>
	  <td colspan="3">{{groupRole.roleName}}</td>
    </tr>
    <tr >
      <th scope="row">人员</th>
	  <td >
		<select multiple="multiple" name="leftSelect" style="height:500px;">
	        <option ng-repeat="member in freeMembers | orderBy:'uid'" value="{{member.uid}}">{{member.name}}</option>
	    </select>
    </td>
    <td >
    <div>
    <button type="submit" class="btn" ng-click="moveMember(0)"> >> </button>
    <br />
    <button type="submit" class="btn" ng-click="moveMember(1)"> << </button>
    </div>
   </td>
    <td >
    	<select multiple="multiple" name="rightSelect" style="height:500px;">
        	<option ng-repeat="member in groupRole.members | orderBy:'uid'" value="{{member.uid}}">{{member.name}}</option>
   		 </select>
	  
	  </td>
    </tr>
  </tbody>
</table>
<button type="submit" class="btn" ng-click="groupMemberSubmit()">提交</button>
<a href="./groupList.jsp" target="_self"><button type="submit" class="btn" ng-click="">取消</button></a>
</div>

<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/auth/group_member.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>