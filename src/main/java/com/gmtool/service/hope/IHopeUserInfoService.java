package com.gmtool.service.hope;

import java.util.Map;

import com.gmtool.entity.HopeUserInfo;
import com.gmtool.util.PageData;

public interface IHopeUserInfoService {

	HopeUserInfo selectByRoleId(PageData pd);
	
	Map<String,Object> getUserList(PageData pd);
	
	Map<String,Object> getUserIp(PageData pd);
}
