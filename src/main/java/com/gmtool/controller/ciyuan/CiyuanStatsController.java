package com.gmtool.controller.ciyuan;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gmtool.controller.base.BaseController;
import com.gmtool.service.ciyuan.ICiyuanStatsService;
import com.gmtool.util.PageData;
import com.gmtool.util.StringUtils;
import com.google.common.base.Preconditions;


@Controller("ciyuanStatsController")
@RequestMapping("/ciyuan-stats")
public class CiyuanStatsController extends BaseController{

	@Autowired
	private ICiyuanStatsService ciyuanStatsService;
	
	@RequestMapping(value="/newbieTask")
	@ResponseBody
	public Object newbieTask(){
		logBefore(logger, "newbieTask");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")), "时间不能为空");
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("endD")), "时间不能为空");
	        PageData pd1 = new PageData();
	        if(StringUtils.isNotEmpty(pd.getString("server"))){
		        pd1.put("server", pd.getString("server"));
	        }
	        if(StringUtils.isNotEmpty(pd.getString("channel"))){
		        pd1.put("alliance", pd.getString("channel"));
	        }
	        pd1.put("startDate", pd.getString("startD"));
	        pd1.put("endDate", pd.getString("endD"));
			map.put("data", ciyuanStatsService.getNewbieTaskStatistics(pd1));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		
		return map;
	}

	
	@RequestMapping(value="/onlineNum")
	@ResponseBody
	public Object getUserOnlineNum(){
		logBefore(logger, "onlineNum");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
	        if(StringUtils.isEmpty(pd.getString("startD")) || StringUtils.isEmpty(pd.getString("endD"))){
	        	String toDay =new SimpleDateFormat("yyyy-MM-dd").format(new Date());
	        	pd.put("startD", toDay+" 00:00:00");
	        	pd.put("endD", toDay+" 23:59:59");
	        }
	        PageData pd1 = new PageData();
	        if(StringUtils.isNotEmpty(pd.getString("server"))){
		        pd1.put("server", pd.getString("server"));
	        }
	        if(StringUtils.isNotEmpty(pd.getString("channel"))){
		        pd1.put("alliance", pd.getString("channel"));
	        }
	        pd1.put("startDate", pd.getString("startD"));
	        pd1.put("endDate", pd.getString("endD"));
			map.put("data", ciyuanStatsService.getUserOnlineNum(pd1));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		return map;
	}
	
	@RequestMapping(value="/userOnlineTime")
	@ResponseBody
	public Object userOnlineTime(){
		logBefore(logger, "userOnlineTime");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")), "时间不能为空");
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("endD")), "时间不能为空");
	        PageData pd1 = new PageData();
	        if(StringUtils.isNotEmpty(pd.getString("server"))){
		        pd1.put("server", pd.getString("server"));
	        }
	        if(StringUtils.isNotEmpty(pd.getString("channel"))){
		        pd1.put("alliance", pd.getString("channel"));
	        }
	        pd1.put("startDate", pd.getString("startD"));
	        pd1.put("endDate", pd.getString("endD"));
			map.put("data", ciyuanStatsService.getUserOnlineTime(pd1));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		return map;
	}
	
	
	@RequestMapping(value="/getDauData")
	@ResponseBody
	public Object getDauData(){
		logBefore(logger, "getDauData");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")), "时间不能为空");
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("endD")), "时间不能为空");
	        PageData pd1 = new PageData();
	        if(StringUtils.isNotEmpty(pd.getString("server"))){
		        pd1.put("server", pd.getString("server"));
	        }
	        if(StringUtils.isNotEmpty(pd.getString("channel"))){
		        pd1.put("alliance", pd.getString("channel"));
	        }
	        pd1.put("startDate", pd.getString("startD"));
	        pd1.put("endDate", pd.getString("endD"));
			map.put("data", ciyuanStatsService.getDauData(pd1));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		return map;
	}
	
	@RequestMapping(value="/getRegData")
	@ResponseBody
	public Object getRegData(){
		logBefore(logger, "getRegData");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")), "时间不能为空");
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("endD")), "时间不能为空");
	        PageData pd1 = new PageData();
	        if(StringUtils.isNotEmpty(pd.getString("server"))){
		        pd1.put("server", pd.getString("server"));
	        }
	        if(StringUtils.isNotEmpty(pd.getString("channel"))){
		        pd1.put("alliance", pd.getString("channel"));
	        }
	        pd1.put("startDate", pd.getString("startD"));
	        pd1.put("endDate", pd.getString("endD"));
			map.put("data", ciyuanStatsService.getRegData(pd1));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		return map;
	}
	
	@RequestMapping(value="/getUserGold")
	@ResponseBody
	public Object getUserGold(){
		logBefore(logger, "getUserGold");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")), "时间不能为空");
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("endD")), "时间不能为空");
	        PageData pd1 = new PageData();
	        if(StringUtils.isNotEmpty(pd.getString("server"))){
		        pd1.put("server", pd.getString("server"));
	        }
	        if(StringUtils.isNotEmpty(pd.getString("channel"))){
		        pd1.put("alliance", pd.getString("channel"));
	        }
	        pd1.put("startDate", pd.getString("startD"));
	        pd1.put("endDate", pd.getString("endD"));
			map.put("data", ciyuanStatsService.getUserGold(pd1));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		return map;
	}
	
	@RequestMapping(value="/getUserDiamond")
	@ResponseBody
	public Object getUserDiamond(){
		logBefore(logger, "getUserDiamond");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")), "时间不能为空");
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("endD")), "时间不能为空");
	        PageData pd1 = new PageData();
	        if(StringUtils.isNotEmpty(pd.getString("server"))){
		        pd1.put("server", pd.getString("server"));
	        }
	        if(StringUtils.isNotEmpty(pd.getString("channel"))){
		        pd1.put("alliance", pd.getString("channel"));
	        }
	        pd1.put("startDate", pd.getString("startD"));
	        pd1.put("endDate", pd.getString("endD"));
			map.put("data", ciyuanStatsService.getUserDiamond(pd1));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		return map;
	}
	
	@RequestMapping(value="/getUserHeroSkin")
	@ResponseBody
	public Object getUserHeroSkin(){
		logBefore(logger, "getUserHeroSkin");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")), "时间不能为空");
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("endD")), "时间不能为空");
	        PageData pd1 = new PageData();
	        if(StringUtils.isNotEmpty(pd.getString("server"))){
		        pd1.put("server", pd.getString("server"));
	        }
	        if(StringUtils.isNotEmpty(pd.getString("channel"))){
		        pd1.put("alliance", pd.getString("channel"));
	        }
	        if(StringUtils.isNotEmpty(pd.getString("buyType"))){
		        pd1.put("buyType", pd.getString("buyType"));
	        }
	        pd1.put("startDate", pd.getString("startD"));
	        pd1.put("endDate", pd.getString("endD"));
			map.put("data", ciyuanStatsService.getUserHeroSkin(pd1));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		return map;
	}
	
	@RequestMapping(value="/getUserHero")
	@ResponseBody
	public Object getUserHero(){
		logBefore(logger, "getUserHero");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")), "时间不能为空");
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("endD")), "时间不能为空");
	        PageData pd1 = new PageData();
	        if(StringUtils.isNotEmpty(pd.getString("server"))){
		        pd1.put("server", pd.getString("server"));
	        }
	        if(StringUtils.isNotEmpty(pd.getString("channel"))){
		        pd1.put("alliance", pd.getString("channel"));
	        }
	        if(StringUtils.isNotEmpty(pd.getString("buyType"))){
		        pd1.put("buyType", pd.getString("buyType"));
	        }
	        pd1.put("startDate", pd.getString("startD"));
	        pd1.put("endDate", pd.getString("endD"));
			map.put("data", ciyuanStatsService.getUserHero(pd1));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		return map;
	}
	
	@RequestMapping(value="/getTaskEveryDay")
	@ResponseBody
	public Object getTaskEveryDay(){
		logBefore(logger, "getTaskEveryDay");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")), "时间不能为空");
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("endD")), "时间不能为空");
	        PageData pd1 = new PageData();
	        if(StringUtils.isNotEmpty(pd.getString("server"))){
		        pd1.put("server", pd.getString("server"));
	        }
	        if(StringUtils.isNotEmpty(pd.getString("channel"))){
		        pd1.put("alliance", pd.getString("channel"));
	        }
	        if(StringUtils.isNotEmpty(pd.getString("taskCode"))){
		        pd1.put("taskCode", pd.getString("taskCode"));
	        }
	        pd1.put("startDate", pd.getString("startD"));
	        pd1.put("endDate", pd.getString("endD"));
			map.put("data", ciyuanStatsService.getTaskEveryDay(pd1));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		return map;
	}
	
	
	@RequestMapping(value="/getHeroWin")
	@ResponseBody
	public Object getHeroWin(){
		logBefore(logger, "getHeroWin");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")), "时间不能为空");
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("endD")), "时间不能为空");
	        PageData pd1 = new PageData();
	        if(StringUtils.isNotEmpty(pd.getString("server"))){
		        pd1.put("server", pd.getString("server"));
	        }
	        if(StringUtils.isNotEmpty(pd.getString("channel"))){
		        pd1.put("alliance", pd.getString("channel"));
	        }
	        if(StringUtils.isNotEmpty(pd.getString("mapId"))){
		        pd1.put("mapId", pd.getString("mapId"));
	        }
	        if(StringUtils.isNotEmpty(pd.getString("result"))){
		        pd1.put("result", pd.getString("result"));
	        }
	        pd1.put("startDate", pd.getString("startD"));
	        pd1.put("endDate", pd.getString("endD"));
			map.put("data", ciyuanStatsService.getHeroWin(pd1));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		return map;
	}
	
	@RequestMapping(value="/getBattleStats")
	@ResponseBody
	public Object getBattleStats(){
		logBefore(logger, "getBattleStats");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")), "时间不能为空");
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("endD")), "时间不能为空");
	        PageData pd1 = new PageData();
	        if(StringUtils.isNotEmpty(pd.getString("server"))){
		        pd1.put("server", pd.getString("server"));
	        }
	        if(StringUtils.isNotEmpty(pd.getString("channel"))){
		        pd1.put("alliance", pd.getString("channel"));
	        }
	        if(StringUtils.isNotEmpty(pd.getString("mapId"))){
		        pd1.put("mapId", pd.getString("mapId"));
	        }
	        
	        pd1.put("startDate", pd.getString("startD"));
	        pd1.put("endDate", pd.getString("endD"));
			map.put("data", ciyuanStatsService.getBattleStats(pd1));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		return map;
	}
	
	@RequestMapping(value="/getRetentionStats")
	@ResponseBody
	public Object getRetentionStats(){
		logBefore(logger, "getRetentionStats");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")), "时间不能为空");
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("endD")), "时间不能为空");
	        PageData pd1 = new PageData();
	        if(StringUtils.isNotEmpty(pd.getString("server"))){
		        pd1.put("server", pd.getString("server"));
	        }
	        if(StringUtils.isNotEmpty(pd.getString("channel"))){
		        pd1.put("alliance", pd.getString("channel"));
	        }
	        if(StringUtils.isNotEmpty(pd.getString("mapId"))){
		        pd1.put("mapId", pd.getString("mapId"));
	        }
	        pd1.put("days", pd.getString("returnDays"));
	        pd1.put("startDate", pd.getString("startD"));
	        pd1.put("endDate", pd.getString("endD"));
			map.put("data", ciyuanStatsService.getRetentionStats(pd1));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		return map;
	}
	
	
	@RequestMapping(value="/getPackageInformation")
	@ResponseBody
	public Object getPackageInformation(){
		logBefore(logger, "getPackageInformation");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")), "时间不能为空");
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("endD")), "时间不能为空");
	        PageData pd1 = new PageData();
	        if(StringUtils.isNotEmpty(pd.getString("server"))){
		        pd1.put("server", pd.getString("server"));
	        }
	        if(StringUtils.isNotEmpty(pd.getString("channel"))){
		        pd1.put("alliance", pd.getString("channel"));
	        }
	        pd1.put("startDate", pd.getString("startD"));
	        pd1.put("endDate", pd.getString("endD"));
			map.put("data", ciyuanStatsService.getPackageInformation(pd1));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		return map;
	}
	
	
	@RequestMapping(value="/getDiamondCost")
	@ResponseBody
	public Object getDiamondCost(){
		logBefore(logger, "getDiamondCost");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")), "时间不能为空");
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("endD")), "时间不能为空");
	        PageData pd1 = new PageData();
	        if(StringUtils.isNotEmpty(pd.getString("server"))){
		        pd1.put("server", pd.getString("server"));
	        }
	        if(StringUtils.isNotEmpty(pd.getString("channel"))){
		        pd1.put("alliance", pd.getString("channel"));
	        }
	        if(StringUtils.isNotEmpty(pd.getString("reason"))){
		        pd1.put("reason", pd.getString("reason"));
	        }
	        pd1.put("startDate", pd.getString("startD"));
	        pd1.put("endDate", pd.getString("endD"));
			map.put("data", ciyuanStatsService.getDiamondCost(pd1));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		return map;
	}
	@RequestMapping(value="/getLottery")
	@ResponseBody
	public Object getLottery(){
		logBefore(logger, "getLottery");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")), "时间不能为空");
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("endD")), "时间不能为空");
	        PageData pd1 = new PageData();
	        if(StringUtils.isNotEmpty(pd.getString("server"))){
		        pd1.put("server", pd.getString("server"));
	        }
	        if(StringUtils.isNotEmpty(pd.getString("channel"))){
		        pd1.put("alliance", pd.getString("channel"));
	        }
	        pd1.put("startDate", pd.getString("startD"));
	        pd1.put("endDate", pd.getString("endD"));
			map.put("data", ciyuanStatsService.getLottery(pd1));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		return map;
	}
	
	@RequestMapping(value="/getActivity")
	@ResponseBody
	public Object getActivity(){
		logBefore(logger, "getActivity");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")), "时间不能为空");
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("endD")), "时间不能为空");
	        PageData pd1 = new PageData();
	        if(StringUtils.isNotEmpty(pd.getString("server"))){
		        pd1.put("server", pd.getString("server"));
	        }
	        if(StringUtils.isNotEmpty(pd.getString("channel"))){
		        pd1.put("alliance", pd.getString("channel"));
	        }
	        if(StringUtils.isNotEmpty(pd.getString("activityCode"))){
		        pd1.put("activityCode", pd.getString("activityCode"));
	        }
	        pd1.put("startDate", pd.getString("startD"));
	        pd1.put("endDate", pd.getString("endD"));
			map.put("data", ciyuanStatsService.getActivity(pd1));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		return map;
	}
	
	@RequestMapping(value="/getSkinAwaken")
	@ResponseBody
	public Object getSkinAwaken(){
		logBefore(logger, "getSkinAwaken");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")), "时间不能为空");
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("endD")), "时间不能为空");
	        PageData pd1 = new PageData();
	        if(StringUtils.isNotEmpty(pd.getString("server"))){
		        pd1.put("server", pd.getString("server"));
	        }
	        if(StringUtils.isNotEmpty(pd.getString("channel"))){
		        pd1.put("alliance", pd.getString("channel"));
	        }
	        if(StringUtils.isNotEmpty(pd.getString("activityCode"))){
		        pd1.put("activityCode", pd.getString("activityCode"));
	        }
	        pd1.put("startDate", pd.getString("startD"));
	        pd1.put("endDate", pd.getString("endD"));
			map.put("data", ciyuanStatsService.getSkinAwaken(pd1));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		return map;
	}

	@RequestMapping(value="/getUserRechargeRecord")
	@ResponseBody
	public Object getUserRechargeRecord(){
		logBefore(logger, "getUserRechargeRecord");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			PageData pd1 = new PageData();
			if(StringUtils.isNotEmpty(pd.getString("uid"))){
				pd1.put("uid", pd.getString("uid"));
			}
			map.put("data", ciyuanStatsService.getUserRechargeRecord(pd1));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
			e.printStackTrace();
		}
		return map;
	}
	
	
}
