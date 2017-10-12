package com.gmtool.service;

import java.util.List;

import com.gmtool.entity.UserLevel;
import com.gmtool.util.PageData;

public interface IUserLevelService {
	
	public List<UserLevel> findLevel(PageData pd);

}
