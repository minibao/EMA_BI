package com.gmtool.service.hope.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.gmtool.constant.SearchConstant;
import com.gmtool.service.hope.IHopeLogDetailService;
import com.gmtool.util.FastJsonUtils;
import com.gmtool.util.PageData;
import com.gmtool.util.StringUtils;
import com.gmtool.util.Utility;
import com.google.common.base.Preconditions;

@Service("hopeLogDetailService")
public class HopeLogDetailServiceImpl implements IHopeLogDetailService {
	
	@Override
	public Map<String,Object> loginDetail(PageData pd){
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("uid")), "uid不能为空");
        pd.put("roleId", pd.get("uid"));
        pd.put("type", "login");
		Map<String,Object> result  = new HashMap<>();
		String params = Utility.getUrlParamsByMap(pd);
		String resultString = Utility.sendPost(SearchConstant.BI_URL+SearchConstant.BI_LOG, params);
	    result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		return result;
	}
	@Override
	public Map<String,Object> logoutDetail(PageData pd){
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("uid")), "uid不能为空");
        pd.put("roleId", pd.get("uid"));
        pd.put("type", "logout");
		Map<String,Object> result  = new HashMap<>();
		String params = Utility.getUrlParamsByMap(pd);
		String resultString = Utility.sendPost(SearchConstant.BI_URL+SearchConstant.BI_LOG, params);
	    result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		return result;
	}
	@Override
	public Map<String,Object> GoldDetail(PageData pd){
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("uid")), "uid不能为空");
        pd.put("roleId", pd.get("uid"));
        pd.put("type", "resource");
        pd.put("category","99");
		Map<String,Object> result  = new HashMap<>();
		String params = Utility.getUrlParamsByMap(pd);
		String resultString = Utility.sendPost(SearchConstant.BI_URL+SearchConstant.BI_LOG, params);
	    result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		return result;
	}
	
	@Override
	public Map<String,Object> DiamondDetail(PageData pd){
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("uid")), "uid不能为空");
        pd.put("roleId", pd.get("uid"));
        pd.put("type", "resource");
        pd.put("category","98");
		Map<String,Object> result  = new HashMap<>();
		String params = Utility.getUrlParamsByMap(pd);
		String resultString = Utility.sendPost(SearchConstant.BI_URL+SearchConstant.BI_LOG, params);
	    result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		return result;
	}
}
