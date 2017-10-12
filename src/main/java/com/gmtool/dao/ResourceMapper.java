package com.gmtool.dao;

import java.util.List;

import com.gmtool.entity.DayResourceCirculate;
import com.gmtool.entity.ResourceInOutAmount;
import com.gmtool.util.PageData;

public interface ResourceMapper {
	
	public List<DayResourceCirculate> findResourceCirculate (PageData pd) throws Exception;
	
	public List<ResourceInOutAmount> findResourceDetail (PageData pd) throws Exception;

}
