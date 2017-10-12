package com.gmtool.service;

import java.util.List;

import com.gmtool.entity.RealTimeNewRoleGameTime;
import com.gmtool.util.PageData;

public interface IUserGameExtraInfoActiveService {
	
	 List<RealTimeNewRoleGameTime> findNewRoleDayGametime(PageData pd) throws Exception;
}
