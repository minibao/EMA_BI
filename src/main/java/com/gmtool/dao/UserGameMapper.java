package com.gmtool.dao;

import java.util.List;

import com.gmtool.entity.UserGameBasicInfo;
import com.gmtool.util.PageData;

public interface UserGameMapper {
	
	List<UserGameBasicInfo> findUserByServerAndChannel(PageData pd) throws Exception;

}
