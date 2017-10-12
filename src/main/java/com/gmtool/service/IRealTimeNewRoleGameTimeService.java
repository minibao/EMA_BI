package com.gmtool.service;

import java.util.List;

import com.gmtool.entity.RealTimeNewRoleGameTime;
import com.gmtool.util.PageData;

public interface IRealTimeNewRoleGameTimeService {
	
	 List<RealTimeNewRoleGameTime> findNewRoleGametime(PageData pd) throws Exception;

}
