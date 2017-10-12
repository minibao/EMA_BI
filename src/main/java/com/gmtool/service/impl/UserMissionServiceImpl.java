package com.gmtool.service.impl;

import java.util.ArrayList;
//import java.util.HashMap;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmtool.dao.UserMissionMapper;
import com.gmtool.entity.UserMission;
import com.gmtool.service.IUserMissionService;
import com.gmtool.util.PageData;

@Service("userMissionService")
public class UserMissionServiceImpl implements IUserMissionService {
	
	@Autowired
	private UserMissionMapper userMissionMapper;

	@Override
	public List<UserMission> findMission(PageData pd) {
		// TODO Auto-generated method stub
		List<UserMission> result = new ArrayList<UserMission>();
		try {
			if (pd.containsKey("channelTag")&& !"".equals(pd.get("channelTag"))) {
				List<String> channelTagPool = Arrays.asList(pd.getString("channelTag").split(","));
				pd.put("channelTag",channelTagPool);
			}
			String timeType = (String)pd.get("timeType");
			switch(timeType){
			case "0":
				result = userMissionMapper.findMission(pd);
				break;
			case "1":
				result = userMissionMapper.findMissionByCreateTime(pd);
				break;
			default:
				break;
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return result;
	}

	
}
