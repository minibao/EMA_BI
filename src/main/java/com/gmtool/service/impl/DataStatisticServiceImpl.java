package com.gmtool.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
//import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmtool.dao.DataStatisticMapper;
import com.gmtool.entity.DataStatistic;
import com.gmtool.service.IDataStatisticService;
import com.gmtool.util.PageData;

@Service("dailyDataService")
public class DataStatisticServiceImpl implements IDataStatisticService {
	
	@Autowired
	private DataStatisticMapper dataStatisticMapper;

	@Override
	public List<DataStatistic> findDailyNew(PageData pd) {
		// TODO Auto-generated method stub
		List<DataStatistic> result = new ArrayList<DataStatistic>();
        try {
            if (pd.containsKey("channelTag")&& !"".equals(pd.get("channelTag"))) {
                List<String> channelTagPool = Arrays.asList(pd.getString("channelTag").split(","));
                pd.put("channelTag",channelTagPool);
            }
            result = dataStatisticMapper.findDailyNew(pd);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

		return result;
	}
	
	@Override
    public List<DataStatistic> findWeeklyNew(PageData pd) {
        // TODO Auto-generated method stub
        List<DataStatistic> result = new ArrayList<DataStatistic>();
        try {
            if (pd.containsKey("channelTag")&& !"".equals(pd.get("channelTag"))) {
                List<String> channelTagPool = Arrays.asList(pd.getString("channelTag").split(","));
                pd.put("channelTag",channelTagPool);
            }
            result = dataStatisticMapper.findWeeklyNew(pd);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
        return result;
    }
	
	@Override
    public List<DataStatistic> findMonthlyNew(PageData pd) {
        // TODO Auto-generated method stub
        List<DataStatistic> result = new ArrayList<DataStatistic>();
        try {
            if (pd.containsKey("channelTag")&& !"".equals(pd.get("channelTag"))) {
                List<String> channelTagPool = Arrays.asList(pd.getString("channelTag").split(","));
                pd.put("channelTag",channelTagPool);
            }
            result = dataStatisticMapper.findMonthlyNew(pd);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
        return result;
    }
	
	@Override
    public List<DataStatistic> findDailyActive(PageData pd) {
        // TODO Auto-generated method stub
        List<DataStatistic> result = new ArrayList<DataStatistic>();
        try {
            if (pd.containsKey("channelTag")&& !"".equals(pd.get("channelTag"))) {
                List<String> channelTagPool = Arrays.asList(pd.getString("channelTag").split(","));
                pd.put("channelTag",channelTagPool);
            }
            result = dataStatisticMapper.findDailyActive(pd);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
        return result;
    }
	
	@Override
    public List<DataStatistic> findWeeklyActive(PageData pd) {
        // TODO Auto-generated method stub
        List<DataStatistic> result = new ArrayList<DataStatistic>();
        try {
            if (pd.containsKey("channelTag")&& !"".equals(pd.get("channelTag"))) {
                List<String> channelTagPool = Arrays.asList(pd.getString("channelTag").split(","));
                pd.put("channelTag",channelTagPool);
            }
            result = dataStatisticMapper.findWeeklyActive(pd);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
        return result;
    }
	
	@Override
    public List<DataStatistic> findMonthlyActive(PageData pd) {
        // TODO Auto-generated method stub
        List<DataStatistic> result = new ArrayList<DataStatistic>();
        try {
            if (pd.containsKey("channelTag")&& !"".equals(pd.get("channelTag"))) {
                List<String> channelTagPool = Arrays.asList(pd.getString("channelTag").split(","));
                pd.put("channelTag",channelTagPool);
            }
            result = dataStatisticMapper.findMonthlyActive(pd);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
        return result;
    }

	
}
