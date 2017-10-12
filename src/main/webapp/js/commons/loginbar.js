
	var loginHtml =  '<div class="main-container login-layout" id="loginbar">'+
'		<div class="main-content">'+
'			<div class="row">'+
'				<div class="col-sm-10 col-sm-offset-1">'+
'					<div class="login-container">'+
'						<div class="center">'+
'							<h1>'+
'								<i class="glyphicon glyphicon-leaf green"></i>'+
'								<span class="red">EMA</span>'+
'								<span class="white">管理系统</span>'+
'							</h1>'+
'							<h4 class="blue">后台登录</h4>'+
'						</div>'+
'						<div class="space-6"></div>'+
'						<div class="position-relative">'+
'							<div id="login-box" class="login-box visible widget-box no-border">'+
'								<div class="widget-body">'+
'									<div class="widget-main">'+
'										<h4 class="header blue lighter bigger">'+
'											<i class="glyphicon glyphicon-coffee green"></i>'+
'											请输入您的登录信息'+
'										</h4>'+
'										<div class="space-6"></div>'+
'										<form>'+
'											<fieldset>'+
'												<label class="block clearfix">'+
'													<span class="block input-icon input-icon-right">'+
'														<input type="text" class="form-control" id="txt_username" placeholder="用户名" />'+
'														<i class="glyphicon glyphicon-user"></i>'+
'													</span>'+
'												</label>'+
'												<label class="block clearfix">'+
'													<span class="block input-icon input-icon-right">'+
'														<input type="password" class="form-control" id="txt_password" placeholder="密码"/>'+
'														<i class="glyphicon glyphicon-lock"></i>'+
'													</span>'+
'												</label>'+
'												<div class="space"></div>'+
'												<div class="clearfix">'+
'													<label class="inline">'+
'														<input type="checkbox" class="ace" id="ck_rmbUser"/>'+
'														<span class="lbl" >记住信息</span>'+
'													</label>'+
'												<button type="button" class="width-35 pull-right btn btn-sm btn-primary" id="loginBtn">'+
'														<i class="glyphicon glyphicon-key"></i>'+
'														登录'+
'													</button>'+
'												</div>'+
'												<div class="social-or-login center">'+
'													<span class="bigger-110">登录信息</span>'+
'													<p class="red center" id="loginErr" style="display:none">您的账号或者密码错误，请联系管理员。</p>	'+
'												</div>'+
'												<div class="space-4"></div>'+
'											</fieldset>'+
'										</form>'+
'									</div><!-- /widget-main -->'+
'									<div class="clearfix"></div>'+
'								</div>'+
'							</div>'+
'						</div>'+
'					</div>'+
'				</div>'+
'			</div>'+
'		</div>'+
'	</div> ';


//更改密码页面
 var resetHtml = '<div class="main-container">'+
'			<div class="main-content" id="changePswBar">'+
'				<div class="row">'+
'					<div class="col-sm-10 col-sm-offset-1">'+
'						<div class="login-container">'+
'							<div class="center">'+
'								<h1>'+
'									<i class="glyphicon glyphicon-leaf green"></i>'+
'									<span class="red">EMA</span>'+
'									<span class="black">后台管理系统</span>'+
'								</h1>'+
'								<h4 class="blue">&copy; 亿马联盟</h4>'+
'							</div>'+
'							<div class="position-relative">'+
'								<div id="signup-box" class="signup-box no-border">'+
'									<div class="widget-body">'+
'										<div class="widget-main">'+
'											<h4 class="header green lighter bigger">'+
'												<i class="glyphicon glyphicon-group blue"></i>'+
'												更改密码'+
'											</h4>'+
'											<div class="space-6"></div>'+
'											<p> 输入您的信息</p>'+
'											<form>'+													
'													<label class="block clearfix">'+
'														<span class="block input-icon input-icon-right">'+
'															<input type="password" class="form-control" placeholder="原密码" id="oldPsw"/>'+
'															<i class="glyphicon glyphicon-lock"></i>'+
'														</span>'+
'													</label>'+
'													<label class="block clearfix">'+
'														<span class="block input-icon input-icon-right">'+
'															<input type="password" class="form-control" placeholder="新密码" id="newPsw"/>'+
'															<i class="glyphicon glyphicon-lock"></i>'+
'														</span>'+
'													</label>'+
'													<div class="space-24"></div>'+
'													<div class="clearfix">'+
'														<button type="reset" class="width-30 pull-left btn btn-sm" id="closeBar">'+
'															<i class="icon-refresh"></i>'+
'															关闭'+
'														</button>'+
'														<button type="button" class="width-65 pull-right btn btn-sm btn-success" id="confirmChange">'+
'															确定'+
'															<i class="icon-arrow-right icon-on-right"></i>'+
'														</button>'+
'													</div>'+
'												</fieldset>'+
'											</form>'+
'										</div>'+
'									</div>'+
'								</div>'+
'							</div>'+
'						</div>'+
'					</div>'+
'				</div>'+
'			</div>'+
'		</div>';


	
	