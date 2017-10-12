package com.gmtool.controller.hope;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gmtool.controller.base.BaseController;
import com.gmtool.service.hope.IHopeLogDetailService;
import com.gmtool.util.PageData;

@Controller("hopeLogDetailController")
@RequestMapping("/hope-log")
public class HopeLogDetailController extends BaseController{
	
	@Autowired
	IHopeLogDetailService hopeLogDetailService;
	
	@RequestMapping(value="/login")
	@ResponseBody
	public Object login(){
		logBefore(logger, "login");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map = hopeLogDetailService.loginDetail(pd);
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		
		return map;
	}

	@RequestMapping(value="/logout")
	@ResponseBody
	public Object logout(){
		logBefore(logger, "logout");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map = hopeLogDetailService.logoutDetail(pd);
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		
		return map;
	}
	
	@RequestMapping(value="/gold")
	@ResponseBody
	public Object gold(){
		logBefore(logger, "gold");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map = hopeLogDetailService.GoldDetail(pd);
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		
		return map;
	}
	
	
	@RequestMapping(value="/diamond")
	@ResponseBody
	public Object diamond(){
		logBefore(logger, "diamond");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map = hopeLogDetailService.DiamondDetail(pd);
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		
		return map;
	}
}
