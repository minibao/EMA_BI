<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/commons/_header.jsp"%>  

    <div class="main-content span9 channel-manage" ng-controller="statsChannelManage">
      <h1 class="text-center">渠道管理</h1>
      <div class="layMsgSuccess">
          <span>修改成功，正在返回。</span>
      </div>
      <div class="layMsgError">
          <span>修改失败，请重试。</span>
      </div>
      <hr>
        <div class="method-select">
            <select name="" id="methodSelect"  ng-model="method">
                <option value="0" selected="selected">修改渠道</option>
                <option value="1">新增渠道</option>
            </select>        
        </div> 
        <hr>       
        <div class="content">
            <!--修改-->
            <div class="revise" ng-if="method == 0">
                <div>
                    <%@ include file="/jsp/commons/_serverpicker.jsp"%>
                    <%@ include file="/jsp/commons/_channelpicker.jsp"%>
                    <%@ include file="/jsp/commons/_channeltagpicker.jsp"%>
                    时间: <%@ include file="/jsp/commons/_datepicker.jsp"%>
                    <button class="btn btn-success" ng-click="channelManage()">提交</button>
                </div>
                <hr>
                <div class="allDictionary">
                    <div ui-grid="gridOptions" ui-grid-selection ui-grid-exporter ui-grid-grouping ui-grid-resize-columns ui-grid-move-columns class="myGrid"></div>
                </div>
            </div>
            <!--新增-->
            <div class="newly" ng-if="method == 1">
                <table>
                    <thead>
                        <tr>
                            <th>渠道编号</th>
                            <th>渠道名称</th>
                            <th class="th-plus"></th>
                            <th class="th-plus"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="channel-num"><input type="number" min="0" /></td>
                            <td class="channel-name"><input type="text"/></td>
                            <td id="plusNext" class="plus-next"><span class="glyphicon glyphicon-plus"></span></td>
                            <td id="deleteSelf" class="delete-self"><span class="glyphicon glyphicon-minus"></span></td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>时间: <%@ include file="/jsp/commons/_datepicker.jsp"%></td>
                            <td><button class="btn btn-success" ng-click="channelManage()">提交</button></td>
                        </tr>
                    </tfoot>
                </table>                   
            </div>
        </div>
    </div>
<script>
    $(document).ready(function(){
                //table tr line
         var tdLine = '<tr>'+
        '                            <td class="channel-num"><input type="number" min="0" /></td>'+
        '                            <td class="channel-name"><input type="text"/></td>'+                           
        '                        </tr>';  
        $('.date-picker-single').addClass('date-hour');
        initializationDateHour();
        initializationdDefaultValue(); 
        $('#methodSelect').on('change',function(){           
            //初始化时间插件
            $('.date-picker-single').addClass('date-hour');
            initializationDateHour();
            initializationdDefaultValue();

            var _this = $('#methodSelect').val();
            if(_this == 1){
                //添加行
                $('#plusNext').on('click',function(){
                    $('.newly table tbody').append(tdLine);

                })
                $('#deleteSelf').on('click',function(){
                    if ($('.newly table tbody tr').length > 1){
                            $('.newly table tbody tr:last').remove();
                    }
                })
            }



        })

        



    });
</script>        
<script src="${ctx}/js/home_page.js"></script>
<script src="${ctx}/js/stats_channel_manage.js"></script>
<%@ include file="/jsp/commons/_footer.jsp"%>




