package com.gmtool.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmtool.dao.DayOnlineMapper;
import com.gmtool.dao.RealtimeOnlineMapper;
import com.gmtool.entity.DayOnline;
import com.gmtool.entity.RealtimeOnline;
import com.gmtool.service.IRealTimeStatsService;
import com.gmtool.util.PageData;

@Service("realTimeStatsService")
public class RealTimeStatsServiceImpl implements IRealTimeStatsService {
	@Autowired
	private DayOnlineMapper dayOnlineMapper;
	@Autowired
	private RealtimeOnlineMapper realtimeOnlineMapper;
	
	private SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd");

	@Override
	public List<DayOnline> findOnlineByDate(String dateInfo, String channel, String container) {
		// TODO Auto-generated method stub
		if(dateInfo == null) {
			Calendar calendar = Calendar.getInstance();
			dateInfo = sd.format(calendar.getTime());
		}
		
		List<DayOnline> dayOnlineList = new ArrayList<DayOnline>();
		try {
			PageData pd = new PageData();
			pd.put("dateInfo", dateInfo);
			pd.put("channel", channel);
			pd.put("containerName", container);
			dayOnlineList = dayOnlineMapper.findOnline(pd);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return dayOnlineList;
	}

	@Override
	public List<RealtimeOnline> findRealTimeOnlineNum(String channel, String container,String[] channelList) {
		// TODO Auto-generated method stub
		
		List<RealtimeOnline> realtimeOnlineList = new ArrayList<RealtimeOnline>();
		
		try {
			PageData pd = new PageData();
			pd.put("channel", channel);
			pd.put("containerName", container);
			pd.put("channelList", channelList);
			realtimeOnlineList = realtimeOnlineMapper.findRealTimeOnlineNum(pd);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return realtimeOnlineList;
	}

}
