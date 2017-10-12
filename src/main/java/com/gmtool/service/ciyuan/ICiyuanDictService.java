package com.gmtool.service.ciyuan;

import java.util.Map;

import com.gmtool.util.PageData;

public interface ICiyuanDictService {
	
	
	Map<String,Object> getServiceAndAlliance(PageData pd);

	Map<String,Object> getSkin(PageData pd);
	
	Map<String,Object> getHero(PageData pd);
	
	Map<String,Object> getTask(PageData pd);
	
	Map<String,Object> getMap(PageData pd);
	
	Map<String,Object> getGoods(PageData pd);
}
