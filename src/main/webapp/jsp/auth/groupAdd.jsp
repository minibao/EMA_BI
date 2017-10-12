<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%> 

<div class="main-content span9 " ng-controller="authGroupAdd">
	<h1 class="text-center">新增权限组</h1>
	
<table class="table table-bordered">
  <tbody>
    <tr>
      <th scope="row">名称</th>
      <td><input name="groupName" type="text" placeholder="Type something…"></td>
    </tr>
    <tr>
      <th scope="row">状态</th>
      <td>
<label class="radio inline">
  <input type="radio" name="radioStatus" id="optionsRadios1" value="0" checked>关闭
</label>
<label class="radio inline">
  <input type="radio" name="radioStatus" id="optionsRadios2" value="1">激活
</label>
	</td>

    </tr>
        <tr>
      <th scope="row">渠道</th>
      <td></td>
    </tr>
    <tr>
      <th scope="row">权限</th>
      <td >
      
      <div class="st_tree" q-recurse="navTree" >
		<span ng-if="navTree.id > 0" >
			<%--<input type="checkbox" name="checkboxAuth" value="{{navTree.id}}" >{{navTree.menuName}}--%>
            <li><label style="font-size: 12px;margin-bottom: 0;display: inline-block;">
                {{navTree.menuName}}<input
                    style="position: absolute; width: 13px;height: 13px!important;margin-top: 2px;margin-left: 5px;"
                    type="checkbox" name="checkboxAuth"
                    value="{{navTree.id}}">
            </label>
            </li>
		</span>

		<div ng-if="navTree.subMenus != null" >
			<%--<label ng-class="{true: 'floatLeft', false: 'inactive'}[navTree.parentId == 0]" --%>
			<%--class="checkbox"  ng-repeat="childNode in navTree.subMenus" q-recurse-node="childNode" ></label>--%>

            <ul>
                <div ng-class="{true: 'floatLeft', false: 'inactive'}[navTree.parentId == 0]"
                     class="checkbox" ng-repeat="childNode in navTree.subMenus"
                     q-recurse-node="childNode"></div>
            </ul>

		</div>
	  </div> 
	    
	  </td>
    </tr>
  </tbody>
</table>
<a href="./groupList.jsp?mid={{message.mid}}&token={{message.token}}" target="_self"><button type="submit" class="btn" ng-click="">列表</button></a>
<button type="submit" class="btn" ng-click="checkboxSubmit()">提交</button>
<button type="submit" class="btn" ng-click="">取消</button>

</div>

<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/auth/group_add.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>