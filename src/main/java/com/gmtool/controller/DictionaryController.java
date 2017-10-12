package com.gmtool.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gmtool.controller.base.BaseController;
import com.gmtool.service.IDictionaryService;
import com.gmtool.util.AppUtil;
import com.gmtool.util.PageData;

@Controller("dictionaryController")
@RequestMapping("/dictionary")
public class DictionaryController extends BaseController{
	
	@Autowired
	private IDictionaryService dictionaryService;

	/**
	* @Title: insOrupdDic
	* @author zhaoxianglong
	* @Description: 新增或修改渠道
	* @param @return
	* @param @throws Exception    
	* @return Object    
	* @throws
	*/ 
	@RequestMapping(value="/updateDic")
	@ResponseBody
	public Object insOrupdDic() throws Exception{
		logBefore(logger, "insOrupdDic");
		Map<String,Object> map = new HashMap<String,Object>();
		PageData pd = new PageData();
		String channeltagName;
		String channeltagValue;
		String lastTime;
		try {
			pd = this.getPageData();
			map.put("data", dictionaryService.insOrupdDic(pd));
			map.put("result", 0);
		}catch(Exception e) {
			map.put("result", 1);
	        e.printStackTrace();  
	    }
		logAfter(logger);
		return AppUtil.returnObject(pd, map);
	}
	
	/**
	* @Title: findAllDictionary
	* @author zhaoxianglong
	* @Description: 查询全部渠道接口
	* @param @return
	* @param @throws Exception    
	* @return Object    
	* @throws
	*/ 
	@RequestMapping(value="/findAllDictionary")
	@ResponseBody
	public Object findAllDictionary() throws Exception{
		logBefore(logger, "findAllDictionary");
		Map<String,Object> map = new HashMap<String,Object>();
		PageData pd = new PageData();
		try {
			pd = this.getPageData();
			map.put("data", dictionaryService.findAllDictionary(pd)) ;
			map.put("result", 0);
		}catch(Exception e) {
			map.put("result", 1);
	        e.printStackTrace();  
	    }
		logAfter(logger);
		return map;
	}
	
	
	@RequestMapping(value="/deleteDictionaryChannelTag")
	@ResponseBody
	public Object deleteDictionaryChannelTag(){
		logBefore(logger,"deleteDictionaryChannelTag");
		Map<String, Object> map = new HashMap<String, Object>();
		PageData pd = new PageData();
		try {
			pd = this.getPageData();
			map.put("data",dictionaryService.deleteDictionaryChannelTag(pd));
			map.put("result", 0);
		} catch (Exception e) {
			// TODO: handle exception
			map.put("result", 1);
			e.printStackTrace();
		}
		logAfter(logger);
		return AppUtil.returnObject(pd, map);
	}
	
	/**
	* @Title: findAllDictionaryChannel
	* @author zhaoxianglong
	* @Description: 查询全部渠道
	* @param @return
	* @param @throws Exception    
	* @return Object    
	* @throws
	*/ 
	@RequestMapping(value="/findAllDictionaryChannel")
	@ResponseBody
	public Object findAllDictionaryChannel() throws Exception{
		logBefore(logger, "findAllDictionaryChannel");
		Map<String,Object> map = new HashMap<String,Object>();
		PageData pd = new PageData();
		try {
			pd = this.getPageData();
			map.put("data", dictionaryService.findAllDictionaryChannel(pd)) ;
			map.put("result", 0);
		}catch(Exception e) {
			map.put("result", 1);
	        e.printStackTrace();  
	    }
		logAfter(logger);
		return map;
	}
	
	
	
}