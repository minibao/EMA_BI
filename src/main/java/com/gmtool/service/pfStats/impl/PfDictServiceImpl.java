package com.gmtool.service.pfStats.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.gmtool.entity.SysRole;
import com.gmtool.entity.TokenModel;
import com.gmtool.service.IMemberInfoService;
import com.gmtool.util.ServiceHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmtool.constant.SearchConstant;
import com.gmtool.service.pfStats.IPfDictService;
import com.gmtool.util.FastJsonUtils;
import com.gmtool.util.PageData;
import com.gmtool.util.Utility;

@Service("pfDictService")
public class PfDictServiceImpl implements IPfDictService {


	@Autowired
	private IMemberInfoService memberInfoService;


	@Override
	public List<Map> pfDict(PageData pd) {
		Map result = new HashMap<Object, Object>();
		String params = Utility.getUrlParamsByMap(pd);
		String resultString = Utility.sendPost(SearchConstant.PF_BI_URL+SearchConstant.PF_BI_DICT, params);
	    result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
        List<Map> appInfo= new ArrayList<Map>();
		List<Map> appInfoS= new ArrayList<Map>();
        List<Map> res = (List<Map>)result.get("data");
        
        for (Map str : res)
        {
        	appInfo.add(FastJsonUtils.convertJSONString2Object(str.get("channelData").toString(), Map.class));
        }
		try {
			String token = pd.getString("token");
			TokenModel tokenModel = ServiceHelper.getRedisService().get(token, TokenModel.class);
			SysRole sysRole = null;
			sysRole = memberInfoService.getInterfaces(tokenModel.getAuthRoleId() == null ? 0 : tokenModel.getAuthRoleId());
			if(null == sysRole){
				return null;
			}
			if(null != sysRole.getAppId() && !"".equals(sysRole.getAppId())){
				String[] appIds = sysRole.getAppId().split(",");
				JSONArray jsonArray = null;
				for(int j = 0 ; j < appInfo.size() ; j++){
					jsonArray = new JSONArray();
					boolean del = true;
					for(String appId : appIds){
						System.out.println(appInfo.get(j).get("appId"));
						if (appId.equals(appInfo.get(j).get("appId").toString().trim())){
							appInfoS.add(appInfo.get(j));
						}
					}
				}
				appInfo = appInfoS;
			}
			if(null != sysRole.getInterfaces() && !"".equals(sysRole.getInterfaces())) {
				String[] interfaces = sysRole.getInterfaces().split(",");
				JSONArray jsonArray = null;
				for(int j = 0 ; j < appInfo.size() ; j++){
					jsonArray = new JSONArray();
					for(int i = 0 ; i < ((JSONArray)appInfo.get(j).get("allianceData")).size(); i++){
						for(String interfacea : interfaces){
							if (interfacea.equals(((JSONObject)((JSONArray)appInfo.get(j).get("allianceData")).get(i)).get("allianceId").toString())){
								jsonArray.add(((JSONObject) ((JSONArray)appInfo.get(j).get("allianceData")).get(i)));
							}
						}
					}
					appInfo.get(j).put("allianceData",jsonArray);
				}
			}
			if(null != sysRole.getChannelTag() && !"".equals(sysRole.getChannelTag())) {
				String[] channelTags = sysRole.getChannelTag().split(",");
				JSONArray jsonArray = null;
				for(int j = 0 ; j < appInfo.size() ; j++){
					jsonArray = new JSONArray();
					for(int i = 0 ; i < ((JSONArray)appInfo.get(j).get("allianceData")).size(); i++){
						for(int a = 0; a < ((JSONArray)(((JSONObject)(((JSONArray)appInfo.get(j).get("allianceData")).get(i))).get("chnTag"))).size(); a++){
//							JSONArray a1 = (JSONArray) appInfo.get(j).get("allianceData");
//							JSONObject a2 = (JSONObject)((JSONArray)appInfo.get(j).get("allianceData")).get(i);
//							JSONArray j1 = (JSONArray) ((JSONObject) ((JSONArray)appInfo.get(j).get("allianceData")).get(i)).get("chnTag");
//							JSONObject j2 = (JSONObject) ((JSONArray) ((JSONObject) ((JSONArray)appInfo.get(j).get("allianceData")).get(i)).get("chnTag")).get(a);
							for(String channelTag : channelTags){
								if (channelTag.equals(((JSONObject)((JSONArray)(((JSONObject)(((JSONArray)appInfo.get(j).get("allianceData")).get(i))).get("chnTag"))).get(a)).get("channeltagValue") == null ? "" :   ((JSONObject)((JSONArray)(((JSONObject)(((JSONArray)appInfo.get(j).get("allianceData")).get(i))).get("chnTag"))).get(a)).get("channeltagValue").toString())){
									jsonArray.add(((JSONObject)((JSONArray)(((JSONObject)(((JSONArray)appInfo.get(j).get("allianceData")).get(i))).get("chnTag"))).get(a)));
								}
							}

						}
						((JSONObject)((JSONArray)appInfo.get(j).get("allianceData")).get(i)).put("chnTag",jsonArray);
						jsonArray = new JSONArray();
					}

				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
			return null;
		}

		return appInfo;
	
	}
	
	
}
