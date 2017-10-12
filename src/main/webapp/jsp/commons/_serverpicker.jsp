<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
    <div class="btn-group">

		<div class="dropdown ">
		    <select role="presentation" ng-options="item.containerName for item in sysContainerInfo" ng-change="filter.channel=''" ng-if="filter != null" ng-model="filter.server" class="select-picker">
		    <option value="" selected="selected">请选择服务器</option>
		    <a role="menuitem">{{item.containerName}}</a>
		    </select>
		    <select role="presentation" ng-options="item.containerName for item in sysContainerInfo" ng-change="selectedChannel=''" ng-if="filter == null" ng-model="selectedServer" class="select-picker">
		    <option value="" selected="selected">请选择服务器</option>
		    <a role="menuitem">{{item.containerName}}</a>
		    </select>
		</div>
		    
    </div>