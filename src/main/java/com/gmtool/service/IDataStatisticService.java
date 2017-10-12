package com.gmtool.service;

import java.util.List;
import java.util.Map;

import com.gmtool.entity.DataStatistic;
import com.gmtool.util.PageData;

public interface IDataStatisticService {
	
	public List<DataStatistic> findDailyNew(PageData pd);
	
	public List<DataStatistic> findWeeklyNew(PageData pd);
	
	public List<DataStatistic> findMonthlyNew(PageData pd);
	
	public List<DataStatistic> findDailyActive(PageData pd);
	
	public List<DataStatistic> findWeeklyActive(PageData pd);
	
	public List<DataStatistic> findMonthlyActive(PageData pd);

}
