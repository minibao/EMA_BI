<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>


<div class="btn-group">
    <div class="dropdown">
        <!-- appID 选择 -->
        <select role="presentation" class="data-app-rel" ng-options="item.appName for item in sysPlantformContainerInfo"
                ng-change="filter.channel=''" ng-model="filter.server" class="select-picker" style="margin-right:2px;">
            <option value="" selected="selected">请选择appID</option>
        </select>
        <!-- 渠道选择 -->
        <select role="presentation" ng-options="item.allianceName for item in filter.server.allianceData"
                ng-change="filter.channelTag=''" ng-model="filter.channel" class="select-picker"
                style="margin-right:2px;">
            <option value="" selected="selected">请选择渠道</option>
        </select>
        <!-- 子渠道选择 -->
        <select class="multi-select pf-multi-show-hide channeltag" selectpicker multiple
                data-selected-text-format="count > 4"
                data-actions-box="true"
                title="选择子渠道"
                ng-model="filter.channelTag">
            <option ng-repeat="chnTag in filter.channel.chnTag"
                    value="{{chnTag.channeltagValue}}"
                    data-subtext="{{chnTag.channeltagValue}}">{{chnTag.channeltagName}}
            </option>
        </select>
    </div>
</div>













