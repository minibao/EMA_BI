<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/jsp/commons/_header.jsp" %>

<div class="main-content span9 " ng-controller="authGroupEdit">
    <h1 class="text-center">修改权限组</h1>

    <table class="table table-bordered">
        <tbody>
        <tr>
            <th scope="row">名称</th>
            <td><input name="groupName" type="text" placeholder="Type something…" value="{{sysRole.roleName}}"></td>
        </tr>
        <tr>
            <th scope="row">状态</th>
            <td>
                <label class="radio inline">
                    <input style="width: 13px;height: 13px!important;" type="radio" name="radioStatus"
                           id="optionsRadios1" value="0"
                           ng-checked="!sysRole.roleStatus">关闭
                </label>
                <label class="radio inline">
                    <input style="width: 13px;height: 13px!important;" type="radio" name="radioStatus"
                           id="optionsRadios2" value="1"
                           ng-checked="sysRole.roleStatus">激活
                </label>
            </td>

        </tr>
        <tr>
            <th scope="row">渠道</th>
            <td>
                <form action="" id="slcChnForm">
                    <div ng-repeat="item in sysGroupdDictionary" class="spn-fl">
                        <input type="checkbox" value="{{item.channelValue}}"
                               ng-checked="interfaces.indexOf(',' + item.channelValue + ',') > -1">
                        <span>{{item.channelName}}</span>
                    </div>
                </form>
            </td>
        </tr>
        <tr>
            <th scope="row">权限</th>
            <td>
                <div class="st_tree" q-recurse="navTree">
                    <span ng-if="navTree.id > 0">
                        <li><label style="font-size: 12px;margin-bottom: 0;display: inline-block;">
                            {{navTree.menuName}}<input
                                style="position: absolute; width: 13px;height: 13px!important;margin-top: 2px;margin-left: 5px;"
                                type="checkbox" name="checkboxAuth"
                                value="{{navTree.id}}"
                                ng-checked="treecheck.indexOf(','+navTree.id+',') > -1">
                        </label>
                        </li>
                    </span>

                    <div ng-if="navTree.subMenus != null">
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
    <button type="submit" class="btn" ng-click="groupEditSubmit()">提交</button>
    <a href="./groupList.jsp" target="_self">
        <button type="submit" class="btn" ng-click="">取消</button>
    </a>
</div>
<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/auth/group_edit.js"></script>
<%@ include file="/jsp/commons/_footer.jsp" %>