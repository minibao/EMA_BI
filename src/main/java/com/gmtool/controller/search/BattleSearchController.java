package com.gmtool.controller.search;


import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gmtool.controller.base.BaseController;
import com.gmtool.service.IBattleSearchService;
import com.gmtool.util.PageData;

@Controller("battleSearchController")
@RequestMapping("/battle")
public class BattleSearchController  extends BaseController{
	
	@Autowired 
	private IBattleSearchService battleSearchService;
	
	@RequestMapping(value="/battleSearch")
	@ResponseBody
	public Object loadDict(){
		logBefore(logger, "battleSearch");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		 
		try {
			pd = this.getPageData();
			map = battleSearchService.battleInfo(pd);
			map.put("result", 0);
		}catch (Exception e) {
			map.put("result", 1);
	        e.printStackTrace(); 			
		}
		
		return map;
	}

}
