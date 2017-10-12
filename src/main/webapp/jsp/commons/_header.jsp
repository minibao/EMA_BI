<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app="app" xmlns:ng="http://angularjs.org" id="ng-app">
<head>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
    <c:set var="ctx" value="${pageContext.request.contextPath}" />     
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <script>
        //检测登录
            if(!sessionStorage.getItem('userToken')){
                self.location.href = '/gmtool/login.html';
            };
    </script>
    <link rel="stylesheet" href="${ctx}/js/vendor/bootstrap/css/bootstrap.css"> 
    <link rel="stylesheet" href="${ctx}/css/common.css">
    <link rel="stylesheet" href="${ctx}/css/bootstrap-treeview.min.css">
    <link rel="stylesheet" href="${ctx}/css/dashboard.css">
    <link rel="stylesheet" href="${ctx}/css/ace.min.css">      
    <link href="https://cdn.bootcss.com/bootstrap/2.3.2/css/bootstrap-responsive.min.css" rel="stylesheet">
    <link rel="stylesheet" href="${ctx}/js/vendor/angular-1.5.8/dist/select.min.css">
    <link rel="styleSheet" href="${ctx}/js/vendor/ui-grid/ui-grid.min.css">
    <link rel="styleSheet" href="${ctx}/js/vendor/datetimepicker/css/bootstrap-datetimepicker.min.css">    
    <link href="https://cdn.bootcss.com/bootstrap-select/1.11.2/css/bootstrap-select.min.css" rel="stylesheet">
    <link href="https://cdn.bootcss.com/wangeditor/2.1.20/css/wangEditor.min.css" rel="stylesheet">
    <link rel="stylesheet" href="${ctx}/css/SimpleTree.css">
    <link rel="stylesheet" href="${ctx}/css/select2.css">
    <script src="https://cdn.bootcss.com/jquery/2.0.3/jquery.min.js"></script>
    <script src="${ctx}/js/vendor/jquery/jquery.cookie.js"></script>
    <script src="https://cdn.bootcss.com/jquery-cookie/1.3.0/jquery.cookie.min.js"></script>
    <script src="${ctx}/js/vendor/jquery/jquery.mobile.custom.min.js"></script>
    <script src="${ctx}/js/vendor/echarts.common.min.js"></script>  
    <script src="https://cdn.bootcss.com/angular.js/1.5.8/angular.min.js"></script>
    <script src="https://cdn.bootcss.com/angular.js/1.5.8/angular-cookies.min.js"></script>
    <script src="https://cdn.bootcss.com/angular.js/1.5.8/angular-sanitize.min.js"></script>
    <script src="https://cdn.bootcss.com/ngStorage/0.3.11/ngStorage.min.js"></script>
    <script src="${ctx}/js/vendor/angular-1.5.8/dist/select.min.js"></script>
    <script src="${ctx}/js/commons/loginbar.js"></script>
    <script src="${ctx}/js/commons/tableExport.js"></script>
    <script src="${ctx}/js/commons/FileSaver.min.js"></script>
    <script src="${ctx}/js/commons/tools.js"></script>
    <script src="${ctx}/js/commons/angular.common.js"></script>    
    <script src="${ctx}/js/vendor/angular-recursion.min.js"></script>
    <script src="https://cdn.bootcss.com/bootstrap-select/1.11.2/js/bootstrap-select.min.js"></script>
    <script src="${ctx}/js/vendor/datetimepicker/js/bootstrap-datetimepicker.js"></script>
    <script src="${ctx}/js/vendor/datetimepicker/js/bootstrap-datetimepicker.fr.js"></script>
    <script src="https://cdn.bootcss.com/lodash.js/4.16.4/lodash.min.js"></script>
    <script src="${ctx}/js/vendor/spin.min.js"></script> 
    <script src="${ctx}/js/vendor/ui-grid/ui-grid.min.js"></script> 
    <script src="${ctx}/js/commons/angular-bootstrap-select.js"></script>
    <script src="${ctx}/js/commons/bootstrap-treeview.js"></script>
    <script src="${ctx}/js/commons/layer2/layer.js"></script>
    <%--<script src="${ctx}/js/commons/SimpleTree.js"></script>--%>
    <script src="${ctx}/js/commons/select2.js"></script>
    <script type="text/javascript" language="JavaScript">
        window.ctx = '${pageContext.request.contextPath}';
    </script>

    
    <script>  
        $(document).ready(function(){
            //更改密码
            $('#changePsw').click(function(){
            	location.href = '/gmtool/mf-password.html';
            })
            //用户名
           	$('#userNameShow').html(sessionStorage.userName);
	        //用户中心
	        $('.user-option-btn a:eq(0)').siblings().hide();
		    $('.user-option-btn').mouseover(function(){
		        $('.user-option-btn a').show();
		    })
		    $('.user-option-btn').mouseout(function(){
		        $('.user-option-btn a:eq(0)').siblings().hide();
		    })
		    //退出登录
		    $('#signOut').on('click',function(){
		    	sessionStorage.clear();
				window.location.reload();
		    })
        })
    </script>	

</head>
    <body scroll="no" ng-cloak ng-controller="MainController">
        <div class="navbar navbar-inverse navbar-fixed-top">
            <div class="navbar-inner">
                <div class="container-fluid">
                    <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="brand" href="#">BI系统</a>
                    <div class="nav-collapse collapse">
            <p class="navbar-text pull-right user-infomation">
              	欢迎您，<span class="yellow" id="userNameShow">博士！！</span>
              	<span class="user-option-btn">
				    <a  id="userCentre" href="javascript:;">用户中心</a>
				    <a  id="changePsw" href="javascript:;">修改密码</a>
				    <a  id="signOut" href="javascript:;">退出登录</a>
				</span>
                        </p>                       
                    </div>
                    <!--/.nav-collapse -->
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <div class="row-fluid">

                <!-- <div class="sub-nav-menu">
                    <div class="well sidebar-nav">
                        <ul class="nav nav-list" q-recurse="navTree">
                            <a ng-if="navTree.menuUrl != null" ng-href="${ctx}/{{navTree.menuUrl}}?mid={{navTree.id}}&token={{message.token}}" target="_self">{{navTree.menuName}}</a>
                            <ul ng-if="navTree.subMenus != null" class="nav nav-list">
                                <li ng-repeat="childNode in navTree.subMenus" q-recurse-node="childNode"></li>
                            </ul>
                        </ul>
                    </div>
                </div> -->
				<div class="sub-nav-menu" id="ng-nav-tree-box">
					 <span class="glyphicon glyphicon-align-justify" id="menubar">
					 </span>
					<div id="ng-nav-tree"></div> 
				</div>
                
<script type="text/javascript">
	// 1.控制a标签的显隐情况  
    $(document).on("click", ".teminal", function() {
        var nodeid= $(this).parent('li').attr('data-nodeid');
        sessionStorage.setItem("data-nodeid", nodeid);
    })
    
    
    $(function(){
    	var nodeid = sessionStorage.getItem("data-nodeid");
        if (nodeid!=null) {
            var intnodeid= Number(nodeid); 
            $('#ng-nav-tree').treeview('revealNode', [ intnodeid, { levels: 5, silent: true } ]);
            $('#ng-nav-tree').treeview('selectNode', [ intnodeid, { silent: true } ]);
            sessionStorage.setItem("data-nodeid", '');
        }
     
     
     
     $('#menubar').on('click',function(){
    	 if($('#menubar').parent().hasClass('sub-nav-show')){
    		 $(this).parent().removeClass('sub-nav-show');
    	 }else{
    		 $(this).parent().addClass('sub-nav-show');
    	 }
     })    
    })
</script>


