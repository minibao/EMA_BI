package com.gmtool.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.gmtool.constant.SearchConstant;
import com.gmtool.service.IResourceSearchService;
import com.gmtool.util.FastJsonUtils;
import com.gmtool.util.PageData;
import com.gmtool.util.Utility;


@Service("resourceSearchService")
public class ResourceSearchServiceImpl implements IResourceSearchService {

	
	public Map resourceInfo(PageData pd){
		
		
		Map result = new HashMap<>();
		try {
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.BI_URL+SearchConstant.BI_RESOURCE_SEARCH, params);
			result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
}
