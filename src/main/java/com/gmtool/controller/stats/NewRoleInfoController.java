package com.gmtool.controller.stats;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gmtool.controller.base.BaseController;
import com.gmtool.entity.RealTimeNewRoleGameTime;
import com.gmtool.service.IRealTimeNewRoleGameTimeService;
import com.gmtool.service.IUserGameExtraInfoActiveService;
import com.gmtool.util.PageData;

@Controller("newRoleInfoController")
@RequestMapping("/game-stats/newRole")
public class NewRoleInfoController  extends BaseController{
	
	@Autowired
	private IRealTimeNewRoleGameTimeService realTimeNewRoleGameTimeService;
	@Autowired
	private IUserGameExtraInfoActiveService userGameExtraInfoActiveService;
	
	@RequestMapping(value="/realTime")
	@ResponseBody
	public Object realTime(){
		logBefore(logger, "realTime");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("result", 0);
		try {
			pd = this.getPageData();
			List<RealTimeNewRoleGameTime> gameTime = realTimeNewRoleGameTimeService.findNewRoleGametime(pd);
			map.put("dailynew", gameTime);
		}catch(Exception e) {
			map.put("result", 1);
	        e.printStackTrace();  
	    }
		return map;
	}
	
	@RequestMapping(value="/dayGameTime")
	@ResponseBody
	public Object dayGameTime(){
		logBefore(logger, "dayGameTime");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("result", 0);
		try {
			pd = this.getPageData();
			List<RealTimeNewRoleGameTime> gameTime = userGameExtraInfoActiveService.findNewRoleDayGametime(pd);
			map.put("dailyactive", gameTime);
		}catch(Exception e) {
			map.put("result", 1);
	        e.printStackTrace();  
	    }
		return map;
	}
	
	
	
}
