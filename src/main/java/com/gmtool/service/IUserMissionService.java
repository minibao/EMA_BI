package com.gmtool.service;

import java.util.List;

import com.gmtool.entity.UserMission;
import com.gmtool.util.PageData;

public interface IUserMissionService {
	
	public List<UserMission> findMission(PageData pd);

}
