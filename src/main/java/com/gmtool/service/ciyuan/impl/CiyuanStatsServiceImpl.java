package com.gmtool.service.ciyuan.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.gmtool.constant.SearchConstant;
import com.gmtool.service.ciyuan.ICiyuanStatsService;
import com.gmtool.util.DESUtil;
import com.gmtool.util.FastJsonUtils;
import com.gmtool.util.PageData;
import com.gmtool.util.Utility;

@Service("ciyuanStatsService")
public class CiyuanStatsServiceImpl implements ICiyuanStatsService {
	
	@Override
	public 	List<Map<String,Object>> getNewbieTaskStatistics(PageData pd){
		List<Map<String,Object>> result = new ArrayList<>();
		try{
			DESUtil.getCiyuanToken(pd);
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.CIYUAN_URL+SearchConstant.CIYUAN_NEW_TASK, params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		    if(call.get("resultCode").toString().equals("200")){
		    	result = (List)call.get("data");
		    }
		}catch(Exception e){
	    	result = new ArrayList<>();
		}
		return result;
	}

	@Override
	public 	List<Map<String,Object>> getStatisticsOnlineTime(PageData pd){
		List<Map<String,Object>> result = new ArrayList<>();
		try{
			DESUtil.getCiyuanToken(pd);
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.CIYUAN_URL+SearchConstant.CIYUAN_ONLINE_TIME, params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		    if(call.get("resultCode").toString().equals("200")){
		    	result = (List)call.get("data");
		    }
		}catch(Exception e){
	    	result = new ArrayList<>();
		}
		return result;
	}
	
	@Override
	public 	List<Map<String,Object>> getUserOnlineNum(PageData pd){
		List<Map<String,Object>> result = new ArrayList<>();
		try{
			DESUtil.getCiyuanToken(pd);
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.CIYUAN_URL+SearchConstant.CIYUAN_USER_ONLINE_NUM, params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		    if(call.get("resultCode").toString().equals("200")){
		    	result = (List)call.get("data");
		    }
		}catch(Exception e){
	    	result = new ArrayList<>();
		}
		return result;
	}
	
	@Override
	public 	List<Map<String,Object>> getUserOnlineTime(PageData pd){
		List<Map<String,Object>> result = new ArrayList<>();
		try{
			DESUtil.getCiyuanToken(pd);
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.CIYUAN_URL+SearchConstant.CIYUAN_USER_ONLINE_TIME, params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		    if(call.get("resultCode").toString().equals("200")){
		    	result = (List)call.get("data");
		    }
		}catch(Exception e){
	    	result = new ArrayList<>();
		}
		return result;
	}
	
	@Override
	public 	List<Map<String,Object>> getDauData(PageData pd){
		List<Map<String,Object>> result = new ArrayList<>();
		try{
			DESUtil.getCiyuanToken(pd);
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.CIYUAN_URL+SearchConstant.CIYUAN_DAU, params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		    if(call.get("resultCode").toString().equals("200")){
		    	result = (List)call.get("data");
		    }
		}catch(Exception e){
	    	result = new ArrayList<>();
		}
		return result;
	}
	
	@Override
	public  List<Map<String,Object>> getRegData(PageData pd){
		List<Map<String,Object>> result = new ArrayList<>();
		try{
			DESUtil.getCiyuanToken(pd);
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.CIYUAN_URL+SearchConstant.CIYUAN_REG, params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		    if(call.get("resultCode").toString().equals("200")){
		    	result = (List)call.get("data");
		    }
		}catch(Exception e){
	    	result = new ArrayList<>();
		}
		return result;
	}
	
	@Override
	public  List<Map<String,Object>> getUserGold(PageData pd){
		List<Map<String,Object>> result = new ArrayList<>();
		try{
			DESUtil.getCiyuanToken(pd);
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.CIYUAN_URL+SearchConstant.CIYUAN_USER_GOLD, params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		    if(call.get("resultCode").toString().equals("200")){
		    	result = (List)call.get("data");
		    }
		}catch(Exception e){
	    	result = new ArrayList<>();
		}
		return result;
	}
	
	@Override
	public  List<Map<String,Object>> getUserDiamond(PageData pd){
		List<Map<String,Object>> result = new ArrayList<>();
		try{
			DESUtil.getCiyuanToken(pd);
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.CIYUAN_URL+SearchConstant.CIYUAN_USER_DIAMOND, params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		    if(call.get("resultCode").toString().equals("200")){
		    	result = (List)call.get("data");
		    }
		}catch(Exception e){
	    	result = new ArrayList<>();
		}
		return result;
	}
	
	@Override
	public  List<Map<String,Object>> getUserHeroSkin(PageData pd){
		List<Map<String,Object>> result = new ArrayList<>();
		try{
			DESUtil.getCiyuanToken(pd);
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.CIYUAN_URL+SearchConstant.CIYUAN_USER_HERO_SKIN, params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		    if(call.get("resultCode").toString().equals("200")){
		    	result = (List)call.get("data");
		    }
		}catch(Exception e){
	    	result = new ArrayList<>();
		}
		return result;
	}
	
	
	@Override
	public  List<Map<String,Object>> getUserHero(PageData pd){
		List<Map<String,Object>> result = new ArrayList<>();
		try{
			DESUtil.getCiyuanToken(pd);
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.CIYUAN_URL+SearchConstant.CIYUAN_USER_HERO, params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		    if(call.get("resultCode").toString().equals("200")){
		    	result = (List)call.get("data");
		    }
		}catch(Exception e){
	    	result = new ArrayList<>();
		}
		return result;
	}

	@Override
	public  List<Map<String,Object>> getTaskEveryDay(PageData pd){
		List<Map<String,Object>> result = new ArrayList<>();
		try{
			DESUtil.getCiyuanToken(pd);
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.CIYUAN_URL+SearchConstant.CIYUAN_TASK_EVERYDAY, params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		    if(call.get("resultCode").toString().equals("200")){
		    	result = (List)call.get("data");
		    }
		}catch(Exception e){
	    	result = new ArrayList<>();
		}
		return result;
	}

	
	@Override
	public  List<Map<String,Object>> getHeroWin(PageData pd){
		List<Map<String,Object>> result = new ArrayList<>();
		try{
			DESUtil.getCiyuanToken(pd);
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.CIYUAN_URL+SearchConstant.CIYUAN_HERO_WIN, params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		    if(call.get("resultCode").toString().equals("200")){
		    	result = (List)call.get("data");
		    }
		}catch(Exception e){
	    	result = new ArrayList<>();
		}
		return result;
	}
	
	@Override
	public  List<Map<String,Object>> getBattleStats(PageData pd){
		List<Map<String,Object>> result = new ArrayList<>();
		try{
			DESUtil.getCiyuanToken(pd);
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.CIYUAN_URL+SearchConstant.CIYUAN_BATTLE_STATS, params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		    if(call.get("resultCode").toString().equals("200")){
		    	result = (List)call.get("data");
		    }
		}catch(Exception e){
	    	result = new ArrayList<>();
		}
		return result;
	}
	
	@Override
	public  List<Map<String,Object>> getRetentionStats(PageData pd){
		List<Map<String,Object>> result = new ArrayList<>();
		try{
			DESUtil.getCiyuanToken(pd);
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.CIYUAN_URL+SearchConstant.CIYUAN_RETENTION, params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		    if(call.get("resultCode").toString().equals("200")){
		    	result = (List)call.get("data");
		    }
		}catch(Exception e){
	    	result = new ArrayList<>();
		}
		return result;
	}
	 
	
	@Override
	public  List<Map<String,Object>> getPackageInformation(PageData pd){
		List<Map<String,Object>> result = new ArrayList<>();
		try{
			DESUtil.getCiyuanToken(pd);
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.CIYUAN_URL+SearchConstant.CIYUAN_PACKAGE, params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		    if(call.get("resultCode").toString().equals("200")){
		    	result = (List)call.get("data");
		    }
		}catch(Exception e){
	    	result = new ArrayList<>();
		}
		return result;
	}
	
	@Override
	public  List<Map<String,Object>> getDiamondCost(PageData pd){
		List<Map<String,Object>> result = new ArrayList<>();
		try{
			DESUtil.getCiyuanToken(pd);
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.CIYUAN_URL+SearchConstant.CIYUAN_DIAMOND_COST, params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		    if(call.get("resultCode").toString().equals("200")){
		    	result = (List)call.get("data");
		    }
		}catch(Exception e){
	    	result = new ArrayList<>();
		}
		return result;
	}
	
	@Override
	public  List<Map<String,Object>> getLottery(PageData pd){
		List<Map<String,Object>> result = new ArrayList<>();
		try{
			DESUtil.getCiyuanToken(pd);
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.CIYUAN_URL+SearchConstant.CIYUAN_LOTTERY, params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		    if(call.get("resultCode").toString().equals("200")){
		    	result = (List)call.get("data");
		    }
		}catch(Exception e){
	    	result = new ArrayList<>();
		}
		return result;
	}
	
	@Override
	public  List<Map<String,Object>> getActivity(PageData pd){
		List<Map<String,Object>> result = new ArrayList<>();
		try{
			DESUtil.getCiyuanToken(pd);
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.CIYUAN_URL+SearchConstant.CIYUAN_ACTIVITY, params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		    if(call.get("resultCode").toString().equals("200")){
		    	result = (List)call.get("data");
		    }
		}catch(Exception e){
	    	result = new ArrayList<>();
		}
		return result;
	}

	@Override
	public Object getUserRechargeRecord(PageData pd) {
		List<Map<String,Object>> result = new ArrayList<>();
		try{
			DESUtil.getCiyuanToken(pd);
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.CIYUAN_URL+SearchConstant.CIYUAN_RECHARGE_RECORD, params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
			if(call.get("resultCode").toString().equals("200")){
				result = (List)call.get("data");
			}
		}catch(Exception e){
			result = new ArrayList<>();
		}
		return result;
	}
	
	@Override
	public  List<Map<String,Object>> getSkinAwaken(PageData pd){
		List<Map<String,Object>> result = new ArrayList<>();
		try{
			DESUtil.getCiyuanToken(pd);
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.CIYUAN_URL+SearchConstant.CIYUAN_SKIN_AWAKEN, params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		    if(call.get("resultCode").toString().equals("200")){
		    	result = (List)call.get("data");
		    }
		}catch(Exception e){
	    	result = new ArrayList<>();
		}
		return result;
	}




}
