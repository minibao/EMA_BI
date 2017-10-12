<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%>

<div class="main-content span9 " ng-controller="statsBattleArena">
  <h1>战斗统计</h1>
  <hr>
  <form class="form-battle" id="">
    <%@ include file="/jsp/commons/_serverpicker.jsp"%>
    <%@ include file="/jsp/commons/_channelpicker.jsp"%>
    <span class="ser-margin-set"><%@ include file="/jsp/commons/_channeltagpicker.jsp"%></span>
    <span class="start-time">开始时间: <%@ include file="/jsp/commons/_daterangepicker.jsp"%></span>
    <span class="">角色创建时间:<%@ include file="/jsp/commons/_daterangepicker.jsp"%></span>
    <hr />
    <div class="">
      <div  id="setDetails" class="set-details">
          <span style="display: none;" class="title-bar">战斗类型:
            <select name="" id="battleType">
              <%--<option value="0" selected="selected">非竞技场</option>--%>
              <option value="1">竞技场</option>
            </select> 
          </span>
        <button type="button" class="btn btn-default" id="openDetailList">详细设置：<span class="glyphicon glyphicon-th-list"></span></button>
        <div class="detail-list" id="detailList">
          <span class="title-bar">选择职业:<%@ include file="/jsp/commons/_vocationpicker.jsp"%></span>
          <div class="cut-line"></div>
          <span class="title-bar">等级范围:<input type="number" id="levelStart" min="0" placeholder="0级"/>至<input type="number" id="levelEnd" min="0" placeholder="满级"/>级</span>
          <span class="title-bar">等级间隔:<input class="ipt-level" type="number" min="0" id="levelInterval" placeholder="10级"></span>
          <div class="cut-line"></div>
          <span class="title-bar">战斗时长:<input type="number" id="durationStart" min="0" placeholder="0秒">至<input type="number" id="durationEnd"  min="0" placeholder="480">秒</span>
          <span class="title-bar">战斗时长间隔:<input type="number" class="ipt-select" min="0" placeholder="30秒" id="durationInterval"></span>
          <div class="cut-line"></div>
            <span class="title-bar" style="visibility:hidden">是否BOSS战:
              <select name="" id="isBoss">
                <option value="0">否</option>
                <option value="1" selected="selected">是</option>
              </select> 
            </span>             
            <span class="title-bar" style="visibility:hidden">难度等级:
              <select name="" id="difficulty">
                <option value="">全部</option>
                <option value="0">简单</option>
                <option value="1">普通</option>
                <option value="2">困难</option>
                <option value="3">英雄</option>
              </select>
            </span>
          <div class="cut-line"></div>
          <span class="" style="visibility:hidden">怪物ID:<input type="number" id="formationId" min="0"/></span>
          <button type="button" class="btn btn-default" id="clsOpen">确认：<span class="glyphicon glyphicon-ok"></span></button>
        </div>
          <span class="title-bar">是否战胜:
            <select name="" id="isWin">
              <option value="1" selected="selected">是</option>
              <option value="0">否</option>
            </select>
          </span>
          <span class="title-bar">是否组队:
            <select name="" id="isTeam">
              <option value="1" selected="selected">是</option>
              <option value="0">否</option>
            </select>
          </span>
        <button class="btn" type="submit" ng-click="statsBattledetial()">搜索</button>
        <button class="btn btn-sm btn-success" ng-click="export()">下载表格</button>
      </div>
    </div>
  </form>
  <hr>
  <div id="spin"></div>
  <div ui-grid="gridOptions" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns ui-grid-move-columns class="myGrid"></div>
</div>

<script>
  $(document).ready(function(){
    $('#openDetailList').on('click',function(){
      $('#detailList').css('visibility','visible');
      var _this = $('#battleType');
      if(_this.val() == 0){
        $('#isBoss').parent().css('visibility','visible');
        $('#formationId').parent().css('visibility','visible');
        $('#difficulty').parent().css('visibility','visible');
      }else if(_this.val() == 1){
        $('#isBoss').val(0);
        $('#formationId').val('');
        $('#difficulty').val('');
      }
      _this.attr('disabled','disabled');
    })
    $('#clsOpen').on('click',function(){
      $('#detailList').css('visibility','hidden');
      var _this = $('#battleType');
      $('#isBoss').parent().css('visibility','hidden');
      $('#formationId').parent().css('visibility','hidden');
      $('#difficulty').parent().css('visibility','hidden');
      _this.removeAttr('disabled');
    })
    $('#isBoss').on('change',function(){
      var _this = $(this);
      if(_this.val() == 1){
        $('#difficulty').parent().css('visibility','visible');
      }else if(_this.val() == 0){
        $('#difficulty').parent().css('visibility','hidden');
        $('#difficulty').val('');
      }

    })
    //初始化角色时间选择
    $('.date-picker-star:eq(1)').addClass('date-hour');
    $('.date-picker-end:eq(1)').addClass('date-hour');
    initializationDateHour();


  })
</script>

<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/stats_battle_arena.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>
