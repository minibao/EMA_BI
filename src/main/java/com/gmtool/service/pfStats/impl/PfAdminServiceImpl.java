package com.gmtool.service.pfStats.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.gmtool.constant.SearchConstant;
import com.gmtool.service.pfStats.IPfAdminService;
import com.gmtool.util.FastJsonUtils;
import com.gmtool.util.PageData;
import com.gmtool.util.Utility;

@Service("sfAdminService")
public class PfAdminServiceImpl implements IPfAdminService {
	@Override
	public List<Map<String,Object>> userInfo(PageData pd){
		List result = new ArrayList<>();
		try{
			pd.put("server", "bi");
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.PF_ADMIN_URL+SearchConstant.PF_ADMIN_QUERY_BASIC_INFO, params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
			result = (List)call.get("data");
		}catch(Exception e){
			result = new ArrayList<>();
		}
		return result;
	}
	
	@Override
	public Map<String,Object> changeUserInfo(PageData pd){
		Map result = new HashMap<Object, Object>();
		try{
			pd.put("server", "bi");
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.PF_ADMIN_URL+SearchConstant.PF_ADMIN_CHANGE_BASIC_INFO, params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
			result.put("msg",call.get("message"));
		}catch(Exception e){
			result.put("msg","补单失败");
		}
		return result;
	}
	
	@Override
	public List<Map<String,Object>> getOrderMiss(PageData pd){
		List result = new ArrayList<>();
		try{
			pd.put("server", "bi");
			pd.put("orderStatus", "4");
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.PF_ADMIN_URL+SearchConstant.PF_ADMIN_GET_ORDER, params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
			result = (List)call.get("data");
		}catch(Exception e){
			result = new ArrayList<>();
		}
		return result;
	}
	
	@Override
	public Map<String,Object> supplyOrderAgain(PageData pd){
		Map result = new HashMap<Object, Object>();
		try{
			pd.put("server", "bi");
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.PF_ADMIN_URL+SearchConstant.PF_ADMIN_SUPPLY_ORDER_AGAIN, params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
			result.put("msg",call.get("message"));
		}catch(Exception e){
			result.put("msg","补单失败");
		}
		return result;
	}
	
	@Override
	public Map<String,Object> userStatus(PageData pd){
		Map result = new HashMap<Object, Object>();
		try{
			pd.put("server", "bi");
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.PF_ADMIN_URL+SearchConstant.PF_ADMIN_USER_STATUS, params);
			Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
			result = (Map)call.get("data");
			result.put("msg", "查询成功");
		}catch(Exception e){
			result.put("msg", "查询失败");
		}
		return result;
	}
	
	@Override
	public Map<String,Object> changeUserStatus(PageData pd){
		Map result = new HashMap<Object, Object>();
		Map<String,Object> call = new HashMap<>();
		String resultString = null;
		try{
			pd.put("server", "bi");
			String params = Utility.getUrlParamsByMap(pd);
			switch (pd.getString("type")){
				case "pf":
					resultString = Utility.sendPost(SearchConstant.PF_ADMIN_URL+SearchConstant.PF_ADMIN_CHANGE_USER_PF_STATUS, params);
					call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
					 if("0".equals(call.get("status").toString())){
						 result.put("msg", "修改成功");
					 }else{
						 result.put("msg", call.get("message").toString());
					 }
					break;
				case "pay":
					resultString = Utility.sendPost(SearchConstant.PF_ADMIN_URL+SearchConstant.PF_ADMIN_CHANGE_USER_PAY__STATUS, params);
					call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
					 if("0".equals(call.get("status").toString())){
						 result.put("msg", "修改成功");
					 }else{
						 result.put("msg", call.get("message").toString());
					 }
					break;
			}
		}catch(Exception e){
			 result.put("msg", "修改失败");
		}
		return result;
	}
	
	@Override
	public Map<String,Object> getTransaction(PageData pd){
		Map result = new HashMap<Object, Object>();
		Map<String,Object> call = new HashMap<>();
		String resultString = null;
		try{
			pd.put("server", "bi");
			String params = Utility.getUrlParamsByMap(pd);
			resultString = Utility.sendPost(SearchConstant.PF_ADMIN_URL+SearchConstant.PF_ADMIN_TRANSACTION, params);
			call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
			result =(Map)((List)call.get("data")).get(0);
			result.put("msg", "查询成功");
		}catch(Exception e){
			result.put("ChannelCallBack", new ArrayList<>());
			result.put("IosPay", new ArrayList<>());
		 	result.put("OrderInfo", new ArrayList<>());
		 	result.put("Payment", new ArrayList<>());
		 	result.put("msg", "查询失败");
		}
		return result;
	}
	
	@Override
	public Map<String,Object> queryAliPay(PageData pd){
		Map result = new HashMap<Object, Object>();
		Map<String,Object> call = new HashMap<>();
		String resultString = null;
		try{
			pd.put("server", "bi");
			String params = Utility.getUrlParamsByMap(pd);
			resultString = Utility.sendPost(SearchConstant.PF_ADMIN_URL+SearchConstant.PF_ADMIN_QUERY_ALIPAY, params);
			call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
			result =(Map)call.get("data");
			result.put("msg", "查询成功");
		}catch(Exception e){
		 	result.put("msg", "查询失败");
		}
		return result;
	}
	
	@Override
	public Map<String,Object> resetPfAdmin(PageData pd){
		Map result = new HashMap<Object, Object>();
		Map<String,Object> call = new HashMap<>();
		String resultString = null;
		try{
			pd.put("server", "bi");
			pd.put("adminKey", "emaAdmin-12345678");			
			String params = Utility.getUrlParamsByMap(pd);
			resultString = Utility.sendPost(SearchConstant.PF_ADMIN_URL+SearchConstant.PF_ADMIN_RESET_PFADMIN, params);
			call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
			result =(Map)call.get("data");
			result.put("msg", call.get("message"));
		}catch(Exception e){
		 	result.put("msg", "更新失败");
		}
		return result;
	}
	
	@Override
	public List<Map<String,Object>> whiteListAlliance(PageData pd){
		List result = new ArrayList<>();
		Map<String,Object> call = new HashMap<>();
		String resultString = null;
		try{
			pd.put("server", "bi");
			String params = Utility.getUrlParamsByMap(pd);
			resultString = Utility.sendPost(SearchConstant.PF_ADMIN_URL + SearchConstant.PF_ADMIN_WHITE_LIST_ALLIANCE,
					params);
			call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
			result =(List)call.get("data");
		}catch(Exception e){
			result = new ArrayList<>();
		}
		return result;
	}
	
	@Override
	public Map<String,Object> changeWhiteListAlliance(PageData pd){
		Map result = new HashMap<Object, Object>();
		Map<String,Object> call = new HashMap<>();
		String resultString = null;
		try{
			pd.put("server", "bi");
			String params = Utility.getUrlParamsByMap(pd);
			resultString = Utility.sendPost(SearchConstant.PF_ADMIN_URL+SearchConstant.PF_ADMIN_CHANGE_WHITE_LIST_ALLIANCE, params);
			call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
			result =(Map)call.get("data");
			result.put("msg", call.get("message"));
		}catch(Exception e){
		 	result.put("msg", "更新失败");
		}
		return result;
	}
	
	@Override
	public List<Map<String,Object>> whiteListUid(PageData pd){
		List result = new ArrayList<>();
		Map<String,Object> call = new HashMap<>();
		String resultString = null;
		try{
			pd.put("server", "bi");
			String params = Utility.getUrlParamsByMap(pd);
			resultString = Utility.sendPost(SearchConstant.PF_ADMIN_URL + SearchConstant.PF_ADMIN_WHITE_LIST_UID,
					params);
			call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
			result =(List)call.get("data");
		}catch(Exception e){
			result = new ArrayList<>();
		}
		return result;
	}

	@Override
	public Map<String,Object> changeWhiteListUid(PageData pd){
		Map result = new HashMap<Object, Object>();
		Map<String,Object> call = new HashMap<>();
		String resultString = null;
		try{
			pd.put("server", "bi");
			String params = Utility.getUrlParamsByMap(pd);
			resultString = Utility.sendPost(SearchConstant.PF_ADMIN_URL+SearchConstant.PF_ADMIN_CHANGE_WHITE_LIST_UID, params);
			call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
			result =(Map)call.get("data");
			result.put("msg", call.get("message"));
		}catch(Exception e){
		 	result.put("msg", "更新失败");
		}
		return result;
	}

	@Override
	public List getOrderInfo(PageData pd) throws Exception {
		List result = new ArrayList<>();
		Map<String,Object> call = new HashMap<>();
		String resultString = null;
		try{
			pd.put("server", "bi");
			String params = Utility.getUrlParamsByMap(pd);
			resultString = Utility.sendPost(SearchConstant.PF_ADMIN_URL + SearchConstant
					.PF_ADMIN_GET_ORDER_INFO, params);
			call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
			String status = (String)call.get("status");
			if(status.equals("0")){
				result =(List)call.get("data");
			}else {
				throw new Exception((String)call.get("message"));
			}
		}catch(Exception e){
			throw new Exception(e.getMessage());
		}
		return result;
	}

	@Override
	public Map<String,Object> supplyOrderForGame(PageData pd) throws Exception{
		Map<String,Object> result = new HashMap<>();
		Map<String,Object> call = new HashMap<>();
		String resultString = null;
		try{
			pd.put("server", "bi");
			String params = Utility.getUrlParamsByMap(pd);
			resultString = Utility.sendPost(SearchConstant.PF_ADMIN_URL + SearchConstant
					.PF_ADMIN_SUPPLY_ORDER_FOR_GAME, params);
			call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
			String status = (String)call.get("status");
			if(status.equals("0")){
				result.put("msg", call.get("message"));
			}else {
				throw new Exception((String)call.get("message"));
			}
		}catch(Exception e){
			throw new Exception(e.getMessage());
		}
		return result;
	}

	@Override
	public Map<String,Object> getUserInfo(PageData pd) throws Exception{
		Map<String,Object> result = new HashMap<>();
		Map<String,Object> call = new HashMap<>();
		String resultString = null;
		try{
			pd.put("server", "bi");
			String params = Utility.getUrlParamsByMap(pd);
			resultString = Utility.sendPost(SearchConstant.PF_ADMIN_URL + SearchConstant
					.PF_ADMIN_USER_INFO, params);
			call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
			String status = (String)call.get("status");
			if(status.equals("0")){
				result.put("data", call.get("data"));
			}else {
				throw new Exception((String)call.get("message"));
			}
		}catch(Exception e){
			throw new Exception(e.getMessage());
		}
		return result;
	}

	@Override
	public Map<String,Object> updateUserInfo(PageData pd) throws Exception{
		Map<String,Object> result = new HashMap<>();
		Map<String,Object> call = new HashMap<>();
		String resultString = null;
		try{
			pd.put("server", "bi");
			String params = Utility.getUrlParamsByMap(pd);
			resultString = Utility.sendPost(SearchConstant.PF_ADMIN_URL + SearchConstant
					.PF_ADMIN_UPDATE_USER_INFO, params);
			call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
			String status = (String)call.get("status");
			if(status.equals("0")){
				result.put("msg", call.get("message"));
			}else {
				throw new Exception((String)call.get("message"));
			}
		}catch(Exception e){
			throw new Exception(e.getMessage());
		}
		return result;
	}
}
