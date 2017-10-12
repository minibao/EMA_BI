package com.gmtool.controller.stats;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gmtool.controller.base.BaseController;
import com.gmtool.entity.DataStatistic;
import com.gmtool.service.IDataStatisticService;
import com.gmtool.util.PageData;

@Controller("dailyDataController")
@RequestMapping("/game-stats")
public class DataStatisticController extends BaseController{
	
	@Autowired
	private IDataStatisticService dataStatisticService;
	
	@RequestMapping(value="/daily/new")
	@ResponseBody
	public Object dailynew(){
		logBefore(logger, "dailynew");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("result", 0);
		try {
			pd = this.getPageData();
            List<DataStatistic> dailynew = dataStatisticService.findDailyNew(pd);
			map.put("dailynew", dailynew);
		}catch(Exception e) {
			map.put("result", 1);
	        e.printStackTrace();  
	    }
		return map;
	}
	
	@RequestMapping(value="/weekly/new")
    @ResponseBody
    public Object weeklynew(){
        logBefore(logger, "weeklynew");
        PageData pd = new PageData();
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("result", 0);
        try {
            pd = this.getPageData();
            List<DataStatistic> weeklynew = dataStatisticService.findWeeklyNew(pd);
            map.put("weeklynew", weeklynew);
        }catch(Exception e) {
            map.put("result", 1);
            e.printStackTrace();  
        }
        return map;
    }
	
	@RequestMapping(value="/monthly/new")
    @ResponseBody
    public Object monthlynew(){
        logBefore(logger, "monthlynew");
        PageData pd = new PageData();
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("result", 0);
        try {
            pd = this.getPageData();
            List<DataStatistic> monthlynew = dataStatisticService.findMonthlyNew(pd);
            map.put("monthlynew", monthlynew);
        }catch(Exception e) {
            map.put("result", 1);
            e.printStackTrace();  
        }
        return map;
    }
	
	@RequestMapping(value="/daily/active")
    @ResponseBody
    public Object dailyactive(){
        logBefore(logger, "dailyactive");
        PageData pd = new PageData();
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("result", 0);
        try {
            pd = this.getPageData();
            List<DataStatistic> dailyactive = dataStatisticService.findDailyActive(pd);
            map.put("dailyactive", dailyactive);
        }catch(Exception e) {
            map.put("result", 1);
            e.printStackTrace();  
        }
        return map;
    }
	
	@RequestMapping(value="/weekly/active")
    @ResponseBody
    public Object weeklyactive(){
        logBefore(logger, "weeklyactive");
        PageData pd = new PageData();
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("result", 0);
        try {
            pd = this.getPageData();
            List<DataStatistic> weeklyactive = dataStatisticService.findWeeklyActive(pd);
            map.put("weeklyactive", weeklyactive);
        }catch(Exception e) {
            map.put("result", 1);
            e.printStackTrace();  
        }
        return map;
    }
	
	@RequestMapping(value="/monthly/active")
    @ResponseBody
    public Object monthlyactive(){
        logBefore(logger, "monthlyactive");
        PageData pd = new PageData();
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("result", 0);
        try {
            pd = this.getPageData();
            List<DataStatistic> monthlyactive = dataStatisticService.findMonthlyActive(pd);
            map.put("monthlyactive", monthlyactive);
        }catch(Exception e) {
            map.put("result", 1);
            e.printStackTrace();  
        }
        return map;
    }

}
