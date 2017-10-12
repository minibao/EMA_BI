package com.gmtool.constant;

public enum Routes {

	HOME ("/"),
	INDEX_PAGE ("/index.jsp"),
	JS_FILES ("/js/"),
	CSS_FILES ("/css/"),
	LOGIN ("/login.html"),
	MF_PW ("/mf-password.html"),
	
	
	SYS_LOADDICT ("/sys/loadDict.do"),
	SYS_LOAD_DICTRESOURCE ("/sys/loadDictResource.do"),
//	SYS_LOAD_CONTAINERINFO ("/sys/loadContainerInfo.do"),
	PF_SYS_LOAD_APPINFO ("/pf-sys/loadAppInfo.do"),
	MEMER_LOGIN_BILOGIN ("/member/login/biLogin.do"),
	MEMER_LOGIN_MODIFYPWD ("/member/login/modifyPwd.do");
	
	private String url;
	
	private Routes(String url) {
		this.setUrl(url);
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
}
