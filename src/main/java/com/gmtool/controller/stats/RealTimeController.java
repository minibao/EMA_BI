package com.gmtool.controller.stats;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gmtool.controller.base.BaseController;
import com.gmtool.entity.DayOnline;
import com.gmtool.entity.RealtimeOnline;
import com.gmtool.service.IMemberInfoService;
import com.gmtool.service.IRealTimeStatsService;
import com.gmtool.util.AppUtil;
import com.gmtool.util.PageData;

@Controller("realTimeController")
@RequestMapping("/game-stats/real-time")
public class RealTimeController extends BaseController{
	
	@Autowired 
	private IRealTimeStatsService realTimeStatsService;
	
	@Autowired
	private IMemberInfoService memberInfoService;
	
	@RequestMapping(value="/day-online")
	@ResponseBody
	public Object dayOnline(){
		logBefore(logger, "dayOnline");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("result", 0);
		List<DayOnline> dayOnlineList = new ArrayList<DayOnline>();
		try {
			pd = this.getPageData();
			String dateInfo = pd.getString("dateInfo");
			String channel = pd.getString("channel");
			String container = pd.getString("containerName");
			dayOnlineList = realTimeStatsService.findOnlineByDate(dateInfo, channel, container);
		}catch(Exception e) {
			map.put("result", 1);
	        e.printStackTrace();  
	    }

		map.put("dayOnlineList", dayOnlineList);
		return AppUtil.returnObject(pd, map);
	}
	
	@RequestMapping(value="/realtime-online")
	@ResponseBody
	public Object realtimeOnline(){
		logBefore(logger, "realtimeOnline");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("result", 0);
		List<RealtimeOnline> realtimeOnlineList = new ArrayList<RealtimeOnline>();
		try {
			pd = this.getPageData();
			String channel = pd.getString("channel");
			String container = pd.getString("containerName");
			String[] channelList = memberInfoService.getRoles(pd.getString("token"),channel);
			realtimeOnlineList = realTimeStatsService.findRealTimeOnlineNum(channel, container,channelList);
		}catch(Exception e) {
			map.put("result", 1);
			map.put("resultMsg", e);
	        e.printStackTrace();  
	    }		
		map.put("dayOnlineList", realtimeOnlineList);
		return AppUtil.returnObject(pd, map);
	}

}
