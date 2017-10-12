package com.gmtool.controller.member;


import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gmtool.controller.base.BaseController;
import com.gmtool.entity.TokenModel;
import com.gmtool.service.IMemberInfoService;
import com.gmtool.util.AppUtil;
import com.gmtool.util.PageData;

@Controller("memberController")
@RequestMapping("/member/login")
public class MemberController extends BaseController{

	@Autowired 
	private IMemberInfoService memberInfoService;
	
	@RequestMapping(value="/biLogin")
	@ResponseBody
	public Object biLogin() throws Exception{
		logBefore(logger, "biLogin");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("result", 0);
		TokenModel tokenModel = new TokenModel();
		try {
			pd = this.getPageData();
			String name = pd.getString("name");
			String password = pd.getString("password");
			tokenModel = memberInfoService.login(name,password);
		}catch(Exception e) {
			map.put("result", 1);
	        e.printStackTrace();  
	    }
		map.put("token", tokenModel);
		logAfter(logger);
		return AppUtil.returnObject(pd, map);
	}
	
	@RequestMapping(value="/checkLogin")
	@ResponseBody
	public Object checkLogin(){
		logBefore(logger, "checkLogin");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("result", 0);
        boolean check = false;
		try {
			pd = this.getPageData();
			String token = pd.getString("token");
			String name = pd.getString("name");
			check = memberInfoService.checkLogin(name,token);

		}catch(Exception e) {
			map.put("result", 1);
	        e.printStackTrace();  
	    }
		map.put("check", check);
		logAfter(logger);
		return AppUtil.returnObject(pd, map);
	}
	
    @RequestMapping(value="/modifyPwd")
	@ResponseBody
    public Object modifyPwd() {
		logBefore(logger, "modifyPwd");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("result", 0);
        boolean modify = false;
		try {
			pd = this.getPageData();
			String token = pd.getString("token");
			String oldPwd = pd.getString("oldPwd");
			String pwd = pd.getString("pwd");
			modify = memberInfoService.modifyPwd(token,oldPwd,pwd);
		}catch(Exception e) {
			map.put("result", 1);
	        e.printStackTrace();  
	    }		
		map.put("modify", modify);
		logAfter(logger);
		return AppUtil.returnObject(pd, map);
    }

}
