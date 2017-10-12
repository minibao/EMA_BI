package com.gmtool.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gmtool.controller.base.BaseController;
import com.gmtool.entity.User;
import com.gmtool.service.IUserService;
import com.gmtool.util.AppUtil;
import com.gmtool.util.PageData;

@Controller("userController")
@RequestMapping("/test")
public class UserController extends BaseController{
	
	@Autowired
	private IUserService userService;
	
	@RequestMapping("index")
	public String index(){
		return "index";
	}

	@RequestMapping(value="/add")
	@ResponseBody
	public Object addUser() throws Exception{
		logBefore(logger, "addUser");
		Map<String,Object> map = new HashMap<String,Object>();
		PageData pd = new PageData();
		try {
			pd = this.getPageData();
			String nickname = pd.getString("nickname");
			userService.insertUser(nickname);			
		}catch(Exception e) {
	        e.printStackTrace();  
	    }
		map.put("result", 0);
		logAfter(logger);
		return AppUtil.returnObject(pd, map);
	}
	
	@RequestMapping(value="/find")
	@ResponseBody
	public Object findAllUser() throws Exception{
		logBefore(logger, "findAllUser");
		Map<String,Object> map = new HashMap<String,Object>();
		PageData pd = new PageData();
		pd = this.getPageData();
		List<User> userList = userService.findAllUser();
		map.put("userList", userList);
		logAfter(logger);
		return AppUtil.returnObject(pd, map);
	}
	
}