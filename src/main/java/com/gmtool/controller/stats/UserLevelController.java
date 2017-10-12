package com.gmtool.controller.stats;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gmtool.controller.base.BaseController;
import com.gmtool.entity.UserLevel;
import com.gmtool.service.IUserLevelService;
import com.gmtool.util.PageData;

@Controller("userLevelController")
@RequestMapping("/game-stats/user")
public class UserLevelController extends BaseController{
	
	@Autowired
	private IUserLevelService userLevelService;
	
	@RequestMapping(value="/level")
	@ResponseBody
	public Object level(){
		logBefore(logger, "level");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("result", 0);
		try {
			pd = this.getPageData();
			List<UserLevel> level = userLevelService.findLevel(pd);
			map.put("level", level);
		}catch(Exception e) {
			map.put("result", 1);
	        e.printStackTrace();  
	    }
		return map;
	}

}
