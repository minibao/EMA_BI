package com.gmtool.service;

import java.util.List;
import java.util.Map;

import com.gmtool.entity.SysMenu;
import com.gmtool.util.PageData;

public interface ISystemService {
	
	public Map<String, Object> loadDictionaryData(PageData pd);
	
	public List<Map> loadContainerInfo(PageData pd);
	
	public Map<String, Object> loadDictResource(PageData pd);
	
	public List<SysMenu> loadAllSysMenu();

}
