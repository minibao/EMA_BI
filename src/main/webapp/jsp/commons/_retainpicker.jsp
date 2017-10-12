<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
  <div class="btn-group">
    <div class="dropdown ">
      <select role="presentation"  class="select-ipt" ng-options="item.name for item in retain" ng-if="filter != null" ng-model="filter.retain">
      </select>
      <select role="presentation"  class="select-ipt" ng-options="item.name for item in retain" ng-if="filter == null" ng-model="selectedRetain">
      </select>
    </div>
  </div>