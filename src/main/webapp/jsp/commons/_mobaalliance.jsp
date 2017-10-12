<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
    <div class="btn-group"> 
	<div class="dropdown">	  
	  	<!-- 渠道选择 -->      	
		<select class="multi-select" selectpicker multiple style="text-align: center;"
					data-selected-text-format="count > 4" 
		            data-actions-box="true"
		            title = "选择渠道" 
		            ng-model="ciyuan.alliance">   
		      <option ng-repeat="item in sysCiyuanDictionary.allianceList" value="{{item.allianceKey}}">{{item.allianceName}}</option>
	    </select>
	    </div>
	</div>
