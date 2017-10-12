package com.gmtool.dao;

import java.util.List;

import com.gmtool.entity.DataStatistic;
import com.gmtool.util.PageData;

public interface DataStatisticMapper {
	
	public List<DataStatistic> findDailyNew (PageData pd) throws Exception;
	
	public List<DataStatistic> findWeeklyNew (PageData pd) throws Exception;
	
	public List<DataStatistic> findMonthlyNew (PageData pd) throws Exception;
	
	public List<DataStatistic> findDailyActive (PageData pd) throws Exception;
	
	public List<DataStatistic> findWeeklyActive (PageData pd) throws Exception;
	
	public List<DataStatistic> findMonthlyActive (PageData pd) throws Exception;

}
