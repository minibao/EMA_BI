package com.gmtool.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmtool.dao.UserGameExtraInfoActiveMapper;
import com.gmtool.entity.RealTimeNewRoleGameTime;
import com.gmtool.service.IUserGameExtraInfoActiveService;
import com.gmtool.util.PageData;


@Service("userGameExtraInfoActiveService")
public class UserGameExtraInfoActiveServiceImpl implements IUserGameExtraInfoActiveService {
	
	@Autowired
	private UserGameExtraInfoActiveMapper userGameExtraInfoActiveMapper;
	
	@Override
	public 	 List<RealTimeNewRoleGameTime> findNewRoleDayGametime(PageData pd) throws Exception{
		List<RealTimeNewRoleGameTime> list = new ArrayList<>();
		
		try{
			if (pd.containsKey("channelTag")&& !"".equals(pd.get("channelTag"))) {
				List<String> channelTagPool = Arrays.asList(pd.getString("channelTag").split(","));
				pd.put("channelTag",channelTagPool);
			}
			list = userGameExtraInfoActiveMapper.findNewRoleDayGametime(pd);
        }catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

}
