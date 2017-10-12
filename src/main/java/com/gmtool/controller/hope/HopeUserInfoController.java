package com.gmtool.controller.hope;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gmtool.controller.base.BaseController;
import com.gmtool.service.hope.IHopeUserInfoService;
import com.gmtool.util.PageData;



@Controller("hopeUserInfoController")
@RequestMapping("/hope-user")
public class HopeUserInfoController extends BaseController{

	@Autowired
	private IHopeUserInfoService hopeUserInfoService;
	

	//Mute duration in seconds, max is 2592000 (30 days). 0 is unmute.
	@RequestMapping(value="/userInfo")
	@ResponseBody
	public Object userInfo(){
		logBefore(logger, "userInfo");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", hopeUserInfoService.selectByRoleId(pd));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		
		return map;
	}
	
	@RequestMapping(value="/userList")
	@ResponseBody
	public Object userList(){
		logBefore(logger, "userList");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", hopeUserInfoService.getUserList(pd));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		
		return map;
	}
	
}
