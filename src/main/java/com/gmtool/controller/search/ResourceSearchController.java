package com.gmtool.controller.search;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gmtool.controller.base.BaseController;
import com.gmtool.service.IResourceSearchService;
import com.gmtool.util.PageData;

@Controller("resourceSearchController")
@RequestMapping("/resource")
public class ResourceSearchController extends BaseController{
	@Autowired 
	private IResourceSearchService resourceSearchService;
	@RequestMapping(value="/resourceSearch")
	@ResponseBody
	public Object loadDict(){
		logBefore(logger, "resourceSearch");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();

		try {
			pd = this.getPageData();
			map = resourceSearchService.resourceInfo(pd);
			map.put("result", 0);
		}catch (Exception e) {
			map.put("result", 1);
	        e.printStackTrace(); 			
		}
		return map;
	}

}
