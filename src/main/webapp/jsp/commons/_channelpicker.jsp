<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
    <div class="btn-group">
  
	<div class="dropdown">
		    <select role="presentation" ng-options="item.chnName for item in filter.server.channelData" ng-change="filter.channelTag=''" ng-if="filter != null" ng-model="filter.channel" class="select-picker">
            <option value="" selected="selected">请选择渠道</option>
		    <a role="menuitem">{{item.chnName}}</a>
		    </select>
		    <select role="presentation" ng-options="item.chnName for item in selectedServer.channelData" ng-change="selectedChannelTag=''" ng-if="filter == null" ng-model="selectedChannel" class="select-picker">
            <option value="" selected="selected">请选择渠道</option>
		    <a role="menuitem">{{item.chnName}}</a>
		    </select>
		</div>
		
    </div>