package com.gmtool.service.ciyuan.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.gmtool.constant.SearchConstant;
import com.gmtool.service.ciyuan.ICiyuanDictService;
import com.gmtool.util.DESUtil;
import com.gmtool.util.FastJsonUtils;
import com.gmtool.util.PageData;
import com.gmtool.util.Utility;

@Service("ciyuanDictService")
public class CiyuanDictServiceImpl implements ICiyuanDictService {

	@Override
	public Map<String,Object> getServiceAndAlliance(PageData pd){
		Map<String,Object> result = new HashMap<>();
		try{
			DESUtil.getCiyuanToken(pd);
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.CIYUAN_URL+SearchConstant.CIYUAN_DICT_SERVER,params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		    if(call.get("resultCode").toString().equals("200")){
		    	result.put("serviceList", call.get("serviceList"));
		    	result.put("allianceList", call.get("allianceList"));
		    }
		}catch(Exception e){
	    	result.put("serviceList", null);
	    	result.put("allianceList", null);
		}

		return result;
	}
	
	@Override
	public Map<String,Object> getSkin(PageData pd){
		Map<String,Object> result = new HashMap<>();
		try{
			DESUtil.getCiyuanToken(pd);
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.CIYUAN_URL+SearchConstant.CIYUAN_DICT_SKIN,params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		    if(call.get("resultCode").toString().equals("200")){
		    	result.put("skinList", call.get("serviceList"));
		    }
		}catch(Exception e){
	    	result.put("skinList", null);
		}
		return result;
	}
	
	@Override
	public Map<String,Object> getHero(PageData pd){
		Map<String,Object> result = new HashMap<>();
		try{
			DESUtil.getCiyuanToken(pd);
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.CIYUAN_URL+SearchConstant.CIYUAN_DICT_HERO,params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		    if(call.get("resultCode").toString().equals("200")){
		    	result.put("heroList", call.get("serviceList"));
		    }
		}catch(Exception e){
	    	result.put("heroList", null);
		}
		return result;
	}
	
	@Override
	public Map<String,Object> getTask(PageData pd){
		Map<String,Object> result = new HashMap<>();
		try{
			DESUtil.getCiyuanToken(pd);
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.CIYUAN_URL+SearchConstant.CIYUAN_DICT_TASK,params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		    if(call.get("resultCode").toString().equals("200")){
		    	result.put("taskList", call.get("serviceList"));
		    }
		}catch(Exception e){
	    	result.put("taskList", null);
		}
		return result;
	}
	
	@Override
	public Map<String,Object> getMap(PageData pd){
		Map<String,Object> result = new HashMap<>();
		try{
			DESUtil.getCiyuanToken(pd);
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.CIYUAN_URL+SearchConstant.CIYUAN_DICT_MAP,params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		    if(call.get("resultCode").toString().equals("200")){
		    	result.put("mapList", call.get("serviceList"));
		    }
		}catch(Exception e){
	    	result.put("mapList", null);
		}
		return result;
	}
	
	@Override
	public Map<String,Object> getGoods(PageData pd){
		Map<String,Object> result = new HashMap<>();
		try{
			DESUtil.getCiyuanToken(pd);
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.CIYUAN_URL+SearchConstant.CIYUAN_DICT_GOODS,params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		    if(call.get("resultCode").toString().equals("200")){
		    	result.put("mapList", call.get("serviceList"));
		    }
		}catch(Exception e){
	    	result.put("mapList", null);
		}
		return result;
	}
}
