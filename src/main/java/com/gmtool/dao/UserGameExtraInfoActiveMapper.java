package com.gmtool.dao;

import java.util.List;

import com.gmtool.entity.RealTimeNewRoleGameTime;
import com.gmtool.util.PageData;

public interface UserGameExtraInfoActiveMapper {
	
	 List<RealTimeNewRoleGameTime> findNewRoleDayGametime(PageData pd) throws Exception;

}
