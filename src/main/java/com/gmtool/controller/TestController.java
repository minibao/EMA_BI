package com.gmtool.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gmtool.constant.SearchConstant;
import com.gmtool.controller.base.BaseController;
import com.gmtool.util.DESUtil;
import com.gmtool.util.FastJsonUtils;
import com.gmtool.util.PageData;
import com.gmtool.util.Utility;

@Controller("testController")
@RequestMapping("/test")
public class TestController extends BaseController{
	
	
	@RequestMapping(value="/test")
	@ResponseBody
	public Object test(){
		logBefore(logger, "test");
		PageData pd = new PageData();
		Map<String,Object> call = new HashMap<>();
		try {
			pd = this.getPageData();
			DESUtil.getCiyuanToken(pd);
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.CIYUAN_URL+SearchConstant.CIYUAN_DICT_TASK,params);
			call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
			pd.put("result", 0);
		}catch (Exception e) {
			pd.put("result", 1);
	        e.printStackTrace(); 			
		}
		
		return call;
	}

}
