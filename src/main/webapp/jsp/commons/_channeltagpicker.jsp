<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
 	<div class="btn-group">
	    <select class="multi-select" selectpicker multiple  
	            data-selected-text-format="count > 4" 
	            data-actions-box="true"
	            title = "选择子渠道" 
	            ng-model="filter.channelTag">
	      <option ng-repeat="chnTag in filter.channel.chnTag"
	              value="{{chnTag.channeltagValue}}"
	              data-subtext="{{chnTag.channeltagValue}}|{{chnTag.lastUpdate}}">{{chnTag.channeltagName}}</option>
	    </select>
    </div>  