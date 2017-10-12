package com.gmtool.service.ad.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.gmtool.constant.SearchConstant;
import com.gmtool.service.ad.IHotCloudService;
import com.gmtool.util.FastJsonUtils;
import com.gmtool.util.PageData;
import com.gmtool.util.StringUtils;
import com.gmtool.util.Utility;
import com.google.common.base.Preconditions;

@Service("hotCloudService")
public class HotCloudServiceImpl implements IHotCloudService {
	
	@Override
	public 	List<Map<String,Object>> hotCloudList(PageData pd){
		List<Map<String,Object>> result = new ArrayList<>();
		try{
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.AD_URL+SearchConstant.AD_SEARCH, params);
			result = FastJsonUtils.convertJSONString2Object(resultString, List.class);
		}catch(Exception e){
			result  = new ArrayList<>();
		}
		return result;
	}

	@Override
	public 	List<Map<String,Object>> hotCloudAdPf(PageData pd){
		List<Map<String,Object>> result = new ArrayList<>();
		try{
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.AD_URL+SearchConstant.AD_ADPF, params);
			result = FastJsonUtils.convertJSONString2Object(resultString, List.class);
		}catch(Exception e){
			result  = new ArrayList<>();
		}
		return result;
	}

	@Override
	public Map<String,Object> updateShortKey(PageData pd){
		Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("shortUrl")), "shortUrl不能为空");
		Map<String,Object> result = new HashMap<>();
		try{
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.AD_URL+SearchConstant.AD_SHORTKEY, params);
			result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		}catch(Exception e){
			result  = new HashMap<>();
		}
		return result;

	}

	@Override
	public Map<String,Object> updateDailyCost(PageData pd){
		Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("spreadurl")), "spreadurl不能为空");
		Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("calcDate")), "calcDate不能为空");
		Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("appId")), "appId不能为空");
		Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("allianceId")), "allianceId不能为空");
		Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("cost")), "cost不能为空");
		Map<String,Object> result = new HashMap<>();
		try{
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.AD_URL+SearchConstant.AD_DAILYCOST, params);
			result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		}catch(Exception e){
			result  = new HashMap<>();
		}
		return result;

	}



	@Override
	public Map<String,Object> addKey(PageData pd){
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("gameId")), "gameId不能为空");
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("hotAppKey")), "hotAppKey不能为空");
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("type")), "type不能为空");
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("shortUrl")), "shortUrl不能为空");
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("urlName")), "urlName不能为空");
		Map<String,Object> result = new HashMap<>();
		try{
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.AD_URL+SearchConstant.AD_INFO, params);
			result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		}catch(Exception e){
			result  = new HashMap<>();
		}
		return result;
		
	}
	
	
	@Override
	public List<Map<String,Object>> hotCloudPayment(PageData pd){
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")), "startD不能为空");
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("endD")), "endD不能为空");
		List<Map<String,Object>> result = new ArrayList<>();
		try{
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.AD_URL + SearchConstant.AD_PAYMENT, params);
			Map<String,Object> map = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
			result = (List)map.get("data");
		}catch(Exception e){
			result  = new ArrayList<>();
		}
		return result;
	}
	
	

	@Override
	public List<Map<String,Object>> hotCloudPr(PageData pd){
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")), "startD不能为空");
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("endD")), "endD不能为空");
		Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("returnDays")), "returnDays不能为空");
		List<Map<String,Object>> result = new ArrayList<>();
		try{
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.PF_BI_URL+SearchConstant.AD_BI_PR, params);
			Map<String,Object> map = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
			result = (List)map.get("data");
		}catch(Exception e){
			result  = new ArrayList<>();
		}
		return result;
	}

	@Override
	public List<Map<String,Object>> hotCloudReg(PageData pd){
		Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")), "startD不能为空");
		Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("endD")), "endD不能为空");
		List<Map<String,Object>> result = new ArrayList<>();
		try{
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.AD_URL+SearchConstant.AD_REG, params);
			Map<String,Object> map = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
			result = (List)map.get("data");
		}catch(Exception e){
			result  = new ArrayList<>();
		}
		return result;
	}

	@Override
	public List<Map<String,Object>> hotCloudUserRr(PageData pd){
		Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")), "startD不能为空");
		Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("endD")), "endD不能为空");
		Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("returnDays")), "returnDays不能为空");
		List<Map<String,Object>> result = new ArrayList<>();
		try{
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.AD_URL+SearchConstant.AD_UserRR, params);
			Map<String,Object> map = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
			result = (List)map.get("data");
		}catch(Exception e){
			result  = new ArrayList<>();
		}
		return result;
	}


	@Override
	public List<Map<String,Object>> hotCloudRr(PageData pd){
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")), "startD不能为空");
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("endD")), "endD不能为空");
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("returnDays")), "returnDays不能为空");
		Map<String,Object> call = new HashMap<>();
		String params = Utility.getUrlParamsByMap(pd);
		String callString = Utility.sendPost(SearchConstant.AD_URL+SearchConstant.AD_RR, params);
		call = FastJsonUtils.convertJSONString2Object(callString, Map.class);
		List<Map<String,Object>> r = new ArrayList<>();
        boolean flag = false;
	    try{

		    List<Map> list = (List<Map>)call.get("data");
		    for(Map domain :list){
	        	String key = ""+domain.get("regDate")+domain.get("appId")+domain.get("chId")+domain.get("spreadUrl")+domain.get("returnDays");
	        	flag = false;
	        	for(Map<String,Object> map :r){
	        		if(map.get("key").equals(key)){
	        			getRr(map,domain);
	        			flag = true;
	        			}
	        		}
	            if(!flag){
	    			Map<String,Object> m = new HashMap<>();
	    			m.put("key",key);
	    			m.put("regDate", domain.get("regDate"));
	    			m.put("appId", domain.get("appId"));
	    			m.put("chId", domain.get("chId"));
	       			m.put("spreadurl", domain.get("spreadUrl"));
	       			m.put("spreadName", domain.get("spreadName"));
	       			m.put("regMemberCount", domain.get("regMemberCount"));
					m.put("installCount", domain.get("installCount"));
					m.put("cost", domain.get("cost"));
					m.put("dailyAmount", domain.get("dailyAmount"));
	    			getRr(m,domain);
	       			r.add(m);
	            }	
	        }
	        for(Map<String,Object> map :r){
	        	map.remove("key");
	        }

	    	
	    }catch(Exception e){
	    	r = new ArrayList<>();
	    }
		return r;
	}
	
	private void getRr(Map<String,Object> map, Map domain){
		map.put("ReNum"+domain.get("returnDays"), domain.get("visitMemberCount"));
		map.put("RePercent"+domain.get("returnDays"), domain.get("returnRate"));

	}
}
