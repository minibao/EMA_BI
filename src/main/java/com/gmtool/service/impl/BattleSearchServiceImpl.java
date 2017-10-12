package com.gmtool.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.gmtool.constant.SearchConstant;
import com.gmtool.service.IBattleSearchService;
import com.gmtool.util.FastJsonUtils;
import com.gmtool.util.PageData;
import com.gmtool.util.Utility;

@Service("battleSearchService")
public class BattleSearchServiceImpl implements IBattleSearchService {
	
	public Map battleInfo(PageData pd){
		
		Map result = new HashMap<>();
		try {
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.BI_URL+SearchConstant.BI_BATTLE_SEARCH, params);
			result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}

}
