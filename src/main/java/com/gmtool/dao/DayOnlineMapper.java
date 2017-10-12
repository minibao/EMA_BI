package com.gmtool.dao;

import java.util.List;

import com.gmtool.entity.DayOnline;
import com.gmtool.util.PageData;

public interface DayOnlineMapper {
	
	List<DayOnline> findOnline(PageData pd) throws Exception;

}
