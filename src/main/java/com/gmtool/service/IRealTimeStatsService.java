package com.gmtool.service;

import java.util.List;

import com.gmtool.entity.DayOnline;
import com.gmtool.entity.RealtimeOnline;

public interface IRealTimeStatsService {
	
	List<DayOnline> findOnlineByDate(String dateInfo, String channel, String container);
	
	List<RealtimeOnline> findRealTimeOnlineNum(String channel, String container, String[] channelList);

}
