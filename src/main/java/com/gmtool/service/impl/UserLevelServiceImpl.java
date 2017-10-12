package com.gmtool.service.impl;

import java.util.ArrayList;
//import java.util.HashMap;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmtool.dao.UserLevelMapper;
import com.gmtool.entity.UserLevel;
import com.gmtool.service.IUserLevelService;
import com.gmtool.util.PageData;

@Service("userLevelService")
public class UserLevelServiceImpl implements IUserLevelService {
	
	@Autowired
	private UserLevelMapper userLevelMapper;

	@Override
	public List<UserLevel> findLevel(PageData pd) {
		// TODO Auto-generated method stub
		List<UserLevel> result = new ArrayList<UserLevel>();
		try {
			if (pd.containsKey("channelTag")&& !"".equals(pd.get("channelTag"))) {
				List<String> channelTagPool = Arrays.asList(pd.getString("channelTag").split(","));
				pd.put("channelTag",channelTagPool);
			}
			String timeType = (String)pd.get("timeType");
			switch(timeType){
			case "0":
				result = userLevelMapper.findLevel(pd);
				break;
			case "1":
				result = userLevelMapper.findLevelByCreateTime(pd);
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
