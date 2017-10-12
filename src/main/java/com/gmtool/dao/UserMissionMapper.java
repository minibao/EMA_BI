package com.gmtool.dao;

import java.util.List;

import com.gmtool.entity.UserMission;
import com.gmtool.util.PageData;

public interface UserMissionMapper {
	
	 List<UserMission> findMission (PageData pd) throws Exception;
	
	 List<UserMission> findMissionByCreateTime (PageData pd) throws Exception;

}
