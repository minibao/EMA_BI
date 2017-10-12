<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
  <div class="btn-group">
    <div class="dropdown ">
      <select role="presentation"  class="select-ipt" ng-options="item.name for item in pay" ng-if="filter != null" ng-model="filter.pay">
      </select>
      <select role="presentation"  class="select-ipt" ng-options="item.name for item in pay" ng-if="filter == null" ng-model="selectedPay">
      </select>
    </div>
  </div>