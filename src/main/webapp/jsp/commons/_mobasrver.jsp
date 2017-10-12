<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
    <div class="btn-group"> 
	<div class="dropdown">
	    <!-- 服务器选择 -->
		<select class="multi-select" selectpicker
		            title = "请选择服务器" 
		            ng-model="ciyuan.server">
              <option value="">请选择服务器</option>	
		      <option ng-repeat="item in sysCiyuanDictionary.serviceList" value="{{item.serverKey}}">{{item.serverName}}</option>
	    </select>
	    <span style="display:inline-block;margin:0 5px;"></span>		  
	    </div>
	</div>