package com.gmtool.service;

import java.util.List;
import java.util.Map;

import com.gmtool.entity.DayResourceCirculate;
import com.gmtool.entity.ResourceInOutAmount;
//import com.gmtool.entity.UserRetention;
import com.gmtool.util.PageData;

public interface IUserStatsService {
	
	public List<Map> findRetention(PageData pd);
	
	public List<DayResourceCirculate> findResourceCirculate(PageData pd);
	
	public List<ResourceInOutAmount> findResourceDetail(PageData pd);

}
