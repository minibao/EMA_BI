package com.gmtool.service.hope;

import java.util.List;
import java.util.Map;

import com.gmtool.util.PageData;

public interface IHopeLogDetailService {
	
	Map<String,Object> loginDetail(PageData pd);
	
	Map<String,Object> logoutDetail(PageData pd);
	
	Map<String,Object> GoldDetail(PageData pd);
	
	Map<String,Object> DiamondDetail(PageData pd);

}
