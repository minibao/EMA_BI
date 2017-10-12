package com.gmtool.controller.hope;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.gmtool.controller.base.BaseController;
import com.gmtool.service.hope.IHopeApiService;
import com.gmtool.service.hope.IHopeUidSearchService;
import com.gmtool.util.PageData;


@Controller("hopeApiController")
@RequestMapping("/hope-api")
public class HopeApiController extends BaseController{

	@Autowired
	private IHopeApiService hopeApiService;
	@Autowired
	private IHopeUidSearchService hopeUidSearchService;
	
	//Mute duration in seconds, max is 2592000 (30 days). 0 is unmute.
	@RequestMapping(value="/users/mute")
	@ResponseBody
	public Object usersMute(){
		logBefore(logger, "usersMute");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", hopeApiService.usersMute(pd));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		
		return map;
	}

	@RequestMapping(value="/users/muteStats")
	@ResponseBody
	public Object muteStats(){
		logBefore(logger, "usersmuteStats");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", hopeApiService.usersMuteStats(pd));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		
		return map;
	}
	
	@RequestMapping(value="/users/quit")
	@ResponseBody
	public Object usersQuit(){
		logBefore(logger, "usersQuit");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", hopeApiService.usersQuit(pd));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		
		return map;
	}
	
	
	@RequestMapping(value="/users/info")
	@ResponseBody
	public Object usersinfo(){
		logBefore(logger, "usersinfo");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", hopeApiService.usersInfo(pd));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		
		return map;
	}
	
	@RequestMapping(value="/mail")
	@ResponseBody
	public Object mail(){
		logBefore(logger, "mail");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", hopeApiService.mail(pd));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		
		return map;
	}
	
	@RequestMapping(value="/announceAdd")
	@ResponseBody
	public Object announceAdd(){
		logBefore(logger, "announceAdd");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", hopeApiService.announceAdd(pd));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		
		return map;
	}
	
	
	@RequestMapping(value="/announceDel")
	@ResponseBody
	public Object announceDel(){
		logBefore(logger, "mail");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", hopeApiService.announceDel(pd));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		
		return map;
	}
	
	@RequestMapping(value="/announceGet")
	@ResponseBody
	public Object announceGet(){
		logBefore(logger, "mail");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", hopeApiService.announceGet(pd));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		return map;
	}
	
	
	@RequestMapping(value="/users/userInfoSearch")
	@ResponseBody
	public Object usersUid(){
		logBefore(logger, "userInfoSearch");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map = hopeUidSearchService.uidSearch(pd);
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		
		return map;
	}
	
	
}
