package com.gmtool.service.hope.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmtool.constant.SearchConstant;
import com.gmtool.service.hope.IHopeApiService;
import com.gmtool.service.hope.IHopeUserInfoService;
import com.gmtool.util.EmaUtil;
import com.gmtool.util.FastJsonUtils;
import com.gmtool.util.PageData;
import com.gmtool.util.StringUtils;
import com.gmtool.util.Utility;
import com.google.common.base.Preconditions;

@Service("hopeApiService")
public class HopeApiServiceImpl implements IHopeApiService {
    @Autowired
    private IHopeUserInfoService hopeUserInfoService;
	
	
	@Override
	public Map<String,Object> usersMute(PageData pd){
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("uid")), "uid不能为空");
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("duration")), "时长不能为空");
		Map<String,Object> result = new HashMap<>();
		String params = Utility.getUrlParamsByMap(pd);
		String resultString = Utility.sendPost(SearchConstant.HOPE_URL+SearchConstant.HOPE_MUTE, params);
	    result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		return result;
	}
	
	@Override
	public Map<String,Object> usersMuteStats(PageData pd){
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("uid")), "uid不能为空");
		Map<String,Object> result = new HashMap<>();
		String resultString = Utility.sendGet(SearchConstant.HOPE_URL+SearchConstant.HOPE_MUTE+"?"+ EmaUtil.postParam(pd));
		result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		return result;
	    
	}
	
	
	@Override
	public Map<String,Object> usersQuit(PageData pd){
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("uid")), "uid不能为空");
		Map<String,Object> result = new HashMap<>();
		String params = Utility.getUrlParamsByMap(pd);
		String resultString = Utility.sendPost(SearchConstant.HOPE_URL+SearchConstant.HOPE_QUIT, params);
	    result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		return result;
	}
	
	@Override
	public Map<String,Object> usersInfo(PageData pd){
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("uid")), "uid不能为空");
		Map<String,Object> result = new HashMap<>();
		String resultString = Utility.sendGet(SearchConstant.HOPE_URL+SearchConstant.HOPE_INFO+"?"+ EmaUtil.postParam(pd));
		result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
        Preconditions.checkArgument((Integer)result.get("code") == 0, "用户不存在");
        Map<String,Object> data = (Map<String,Object>)result.get("data");
		Map<String,Object> fames = (Map<String,Object>)data.get("Fames");
	    List famesValue = new ArrayList<>();
        Iterator famesIt = fames.keySet().iterator();  
        while (famesIt.hasNext()) {  
           String key = famesIt.next().toString();  
           famesValue.add(fames.get(key));  
        }
        data.put("Fames", famesValue);
        
		Map<String,Object> cells = (Map<String,Object>)data.get("Cells");
		
		if(cells != null){
		    List cellsValue = new ArrayList<>();
	        Iterator cellsIt = cells.keySet().iterator();  
	        while (cellsIt.hasNext()) {  
	           String key = cellsIt.next().toString();  
	           cellsValue.add(((Map)cells.get(key)).get("Content"));  
	        }
	        data.put("Cells", cellsValue);
		}
        try{
        	Map<String,Object> muteStats = usersMuteStats(pd);
    		if(muteStats.get("code").toString().equals("0")){
    			Map<String,Object> dataM = (Map<String,Object>)muteStats.get("data");
    			data.put("isMute",dataM.get("Muting"));
    		}else{
    			data.put("isMute","-");
    		}
        }catch(Exception e){
			data.put("isMute","-");
        }
        
        try{
        	pd.put("roleId", pd.getString("uid"));
        	Map<String,Object> ip = hopeUserInfoService.getUserIp(pd);
    		if(ip.get("status").toString().equals("0")){
    			Map<String,Object> dataIp = (Map<String,Object>)ip.get("data");
    			data.put("lastLoginIp",dataIp.get("lastLoginIp"));
    			data.put("createRoleIp",dataIp.get("createRoleIp"));
    			data.put("createRoleTime",dataIp.get("createRoleTime"));
    		}else{
    			data.put("lastLoginIp","-");
    			data.put("createRoleIp","-");
    			data.put("createRoleTime","-");
    		}
        }catch(Exception e){
			data.put("lastLoginIp","-");
			data.put("createRoleIp","-");
			data.put("createRoleTime","-");
        }
        
		return data;
	}
	
	
	
	@Override
	public Map<String,Object> usersUid(PageData pd){
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("name")), "名字不能为空");
		Map<String,Object> result = new HashMap<>();
		try{
		String resultString = Utility.sendGet(SearchConstant.HOPE_LOGIN_URL+SearchConstant.HOPE_LOGIN_EMALOOKUP+"?"+ EmaUtil.postParam(pd));
		result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		result.put("name", pd.getString("name"));
		}catch(Exception e){
		result = new HashMap<>();
		}
		return result;
		
	}
	
	@Override
	public Map<String,Object> usersName(PageData pd){
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("uid")), "uid不能为空");
		Map<String,Object> result = new HashMap<>();
		try{
			String resultString = Utility.sendGet(SearchConstant.HOPE_LOGIN_URL+SearchConstant.HOPE_LOGIN_EMALOOKUP+"?"+ EmaUtil.postParam(pd));
			result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
			result.put("uid", pd.getString("uid"));
		}catch(Exception e){
			result = new HashMap<>();
		}
		return result;
		
	}
	
	@Override
	public List<Map> usersPf(PageData pd){
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("allianceId"))&&StringUtils.isNotEmpty(pd.getString("allianceUid")), "参数不能为空");
        List<Map> result = new ArrayList<>();
		try{
			String resultString = Utility.sendGet(SearchConstant.HOPE_LOGIN_URL+SearchConstant.HOPE_LOGIN_EMALOOKUP+"?"+ EmaUtil.postParam(pd));
			result = FastJsonUtils.convertJSONString2Object(resultString, List.class);
			for(Map m:result){
				m.put("allianceId", pd.getString("allianceId"));
				m.put("allianceUid", pd.getString("allianceUid"));
			}
		}catch(Exception e){
			result = new ArrayList<>();
		}
		return result;
	}

	
	@Override
	public Map<String,Object> mail(PageData pd){
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("uid")), "uid不能为空");
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("title")), "title不能为空");
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("body")), "body不能为空");
        pd.put("uids", pd.getString("uid"));
		Map<String,Object> result = new HashMap<>();
		String params = Utility.getUrlParamsByMap(pd);
		String resultString = Utility.sendPost(SearchConstant.HOPE_URL+SearchConstant.HOPE_MAIL, params);
	    result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		return result;
	}
	
	@Override
	public Map<String,Object> announceAdd(PageData pd){
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("id")), "id不能为空");
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("content")), "content不能为空");
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("priority")), "priority不能为空");
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("num")), "num不能为空");
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("interval")), "interval不能为空");
		Map<String,Object> result = new HashMap<>();
		String params = Utility.getUrlParamsByMap(pd);
		String resultString = Utility.sendPost(SearchConstant.HOPE_URL+SearchConstant.HOPE_ANNOUNCE_ADD, params);
	    result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		return result;
	}
	
	@Override
	public Map<String,Object> announceDel(PageData pd){
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("id")), "id不能为空");
		Map<String,Object> result = new HashMap<>();
		String params = Utility.getUrlParamsByMap(pd);
		String resultString = Utility.sendPost(SearchConstant.HOPE_URL+SearchConstant.HOPE_ANNOUNCE_DEL, params);
	    result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		return result;
	}

	@Override
	public Map<String,Object> announceGet(PageData pd){
		Map<String,Object> result = new HashMap<>();
		String resultString = Utility.sendGet(SearchConstant.HOPE_URL+SearchConstant.HOPE_ANNOUNCE_GET);
		result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		return result;
	}
}
