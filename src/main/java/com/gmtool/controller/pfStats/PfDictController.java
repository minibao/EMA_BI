package com.gmtool.controller.pfStats;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gmtool.controller.base.BaseController;
import com.gmtool.service.pfStats.IPfDictService;
import com.gmtool.util.PageData;


@Controller("pfDictController")
@RequestMapping("/pf-sys")
public class PfDictController extends BaseController{
	@Autowired 
	private IPfDictService pfDictService;
	
	@RequestMapping(value="/loadAppInfo")
	@ResponseBody
	public Object loadAppInfo(){
		logBefore(logger, "loadAppInfo");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data",pfDictService.pfDict(pd));
			map.put("result", 0);
		}catch(Exception e) {
			map.put("result", 1);
	        e.printStackTrace();  
	    }
		return map;
	}
	
}
