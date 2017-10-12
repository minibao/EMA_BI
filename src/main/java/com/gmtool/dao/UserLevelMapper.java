package com.gmtool.dao;

import java.util.List;

import com.gmtool.entity.UserLevel;
import com.gmtool.util.PageData;

public interface UserLevelMapper {
	
	 List<UserLevel> findLevel (PageData pd) throws Exception;
	
	 List<UserLevel> findLevelByCreateTime (PageData pd) throws Exception;

}
