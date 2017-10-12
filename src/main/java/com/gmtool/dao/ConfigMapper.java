package com.gmtool.dao;

import java.util.List;

import com.gmtool.entity.Dictionary;
import com.gmtool.entity.SysMenu;
import com.gmtool.util.PageData;

public interface ConfigMapper {
	public List<Dictionary> findDictChannels() throws Exception;
	
	public List<Dictionary> findDictContainers() throws Exception;
	
	public List<Dictionary> findDictData(PageData pd) throws Exception;
	
	public List<Dictionary> findDictResource(PageData pd) throws Exception;
	
	public List<String> findContainerInfo(PageData pd) throws Exception;
	
	public List<SysMenu> findSysMenu(PageData pd) throws Exception;
	
}
