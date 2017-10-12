package com.gmtool.service.ad;

import java.util.List;
import java.util.Map;

import com.gmtool.util.PageData;

public interface IHotCloudService {
	
	List<Map<String,Object>> hotCloudList(PageData pd);
	
	List<Map<String,Object>> hotCloudAdPf(PageData pd);

	Map<String,Object> updateShortKey(PageData pd);

	Map<String,Object> updateDailyCost(PageData pd);

	Map<String,Object> addKey(PageData pd);
	
	List<Map<String,Object>> hotCloudPayment(PageData pd);
	
	List<Map<String,Object>> hotCloudRr(PageData pd);

	List<Map<String,Object>> hotCloudUserRr(PageData pd);
	
	List<Map<String,Object>> hotCloudReg(PageData pd);

	List<Map<String,Object>> hotCloudPr(PageData pd);
	
}
