package com.gmtool.dao;

import com.gmtool.entity.HopeUserInfo;
import com.gmtool.util.PageData;

public interface HopeUserInfoMapper {
	
	HopeUserInfo findUserInfo(PageData pd) throws Exception;

}
