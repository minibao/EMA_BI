package com.gmtool.controller.stats;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gmtool.controller.base.BaseController;
//import com.gmtool.entity.UserRetention;
import com.gmtool.service.IUserStatsService;
import com.gmtool.util.PageData;

@Controller("userStatsController")
@RequestMapping("/game-stats/user")
public class UserStatsController extends BaseController{
	
	@Autowired
	private IUserStatsService userStatsService;
	
	@RequestMapping(value="/retention")
	@ResponseBody
	public Object retention(){
		logBefore(logger, "retention");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("result", 0);
		try {
			pd = this.getPageData();
			List<Map> retentions = userStatsService.findRetention(pd);
			map.put("retentions", retentions);
		}catch(Exception e) {
			map.put("result", 1);
	        e.printStackTrace();  
	    }
		return map;
	}

}
