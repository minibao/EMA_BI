package com.gmtool.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gmtool.controller.base.BaseController;
import com.gmtool.service.IRedisService;
import com.gmtool.service.ISystemService;
import com.gmtool.util.PageData;

@Controller("systemController")
@RequestMapping("/sys")
public class SystemController  extends BaseController{
	
	@Autowired 
	private ISystemService systemService;
	
	@Autowired
	private IRedisService redisService;
	
	@RequestMapping(value="/loadDict")
	@ResponseBody
	public Object loadDict(){
		logBefore(logger, "loadDict");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();

		try {
			pd = this.getPageData();
//			String token = pd.getString("token");
//			TokenModel tokenModel = redisService.get(token, TokenModel.class);
//			pd.put("accessMenus", tokenModel.getAccessMenus());
			
			map = systemService.loadDictionaryData(pd);
			map.put("result", 0);
		}catch (Exception e) {
			map.put("result", 1);
	        e.printStackTrace(); 			
		}
		
		return map;
	}
	
	@RequestMapping(value="/loadContainerInfo")
	@ResponseBody
    public Object loadContainerInfo(){
        logBefore(logger, "loadContainerInfo");
        PageData pd = new PageData();
        Map<String,Object> map = new HashMap<String,Object>();
        try {
            pd = this.getPageData();
            map.put("data", systemService.loadContainerInfo(pd));
            map.put("result", 0);
        }catch (Exception e) {
            map.put("result", 1);
            e.printStackTrace();            
        }
        return map;
    }
	
	@RequestMapping(value="/loadDictResource")
    @ResponseBody
    public Object loadDictResource(){
        logBefore(logger, "loadDictResource");
        PageData pd = new PageData();
        Map<String,Object> map = new HashMap<String,Object>();

        try {
            pd = this.getPageData();
            map.put("data", systemService.loadDictResource(pd));
            map.put("result", 0);
        }catch (Exception e) {
            map.put("result", 1);
            e.printStackTrace();            
        }
        
        return map;
    }

}
