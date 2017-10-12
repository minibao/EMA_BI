package com.gmtool.controller.stats;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gmtool.controller.base.BaseController;
import com.gmtool.entity.UserMission;
import com.gmtool.service.IUserMissionService;
import com.gmtool.util.PageData;

@Controller("userMissionController")
@RequestMapping("/game-stats/user")
public class UserMissionController extends BaseController{
	
	@Autowired
	private IUserMissionService userMissionService;
	
	@RequestMapping(value="/mission")
	@ResponseBody
	public Object mission(){
		logBefore(logger, "mission");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("result", 0);
		try {
			pd = this.getPageData();
			List<UserMission> mission = userMissionService.findMission(pd);
			map.put("mission", mission);
		}catch(Exception e) {
			map.put("result", 1);
	        e.printStackTrace();  
	    }
		return map;
	}

}
