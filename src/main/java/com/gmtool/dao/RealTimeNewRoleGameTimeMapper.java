package com.gmtool.dao;

import java.util.List;

import com.gmtool.entity.RealTimeNewRoleGameTime;
import com.gmtool.util.PageData;

public interface RealTimeNewRoleGameTimeMapper {
	
	 List<RealTimeNewRoleGameTime> findNewRoleGametime(PageData pd) throws Exception;

}
