<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
  <div class="btn-group">
    <div class="dropdown ">
      <select role="presentation"  class="select-ipt" ng-options="item.name for item in vocations" ng-if="filter != null" ng-model="filter.vocation">
      </select>
      <select role="presentation"  class="select-ipt" ng-options="item.name for item in vocations" ng-if="filter == null" ng-model="selectedVocation">
      </select>
    </div>
  </div>