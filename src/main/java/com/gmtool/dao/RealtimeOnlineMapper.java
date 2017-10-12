package com.gmtool.dao;

import java.util.List;

import com.gmtool.entity.RealtimeOnline;
import com.gmtool.util.PageData;

public interface RealtimeOnlineMapper {
	
	public List<RealtimeOnline> findRealTimeOnlineNum(PageData pd) throws Exception;

}
