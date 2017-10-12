package com.gmtool.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmtool.dao.RealTimeNewRoleGameTimeMapper;
import com.gmtool.entity.RealTimeNewRoleGameTime;
import com.gmtool.service.IRealTimeNewRoleGameTimeService;
import com.gmtool.util.PageData;

@Service("realTimeNewRoleGameTimeService")
public class RealTimeNewRoleGameTimeServiceImpl implements IRealTimeNewRoleGameTimeService {
	@Autowired
	private RealTimeNewRoleGameTimeMapper realTimeNewRoleGameTimeMapper;
	
	@Override
	public 	 List<RealTimeNewRoleGameTime> findNewRoleGametime(PageData pd) throws Exception{
		List<RealTimeNewRoleGameTime> list = new ArrayList<>();
		
		try{
			if (pd.containsKey("channelTag")&& !"".equals(pd.get("channelTag"))) {
				List<String> channelTagPool = Arrays.asList(pd.getString("channelTag").split(","));
				pd.put("channelTag",channelTagPool);
			}
			list = realTimeNewRoleGameTimeMapper.findNewRoleGametime(pd);
        }catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

}
