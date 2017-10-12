package com.gmtool.service.hope.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmtool.constant.SearchConstant;
import com.gmtool.dao.HopeUserInfoMapper;
import com.gmtool.entity.HopeUserInfo;
import com.gmtool.service.hope.IHopeUserInfoService;
import com.gmtool.util.FastJsonUtils;
import com.gmtool.util.PageData;
import com.gmtool.util.StringUtils;
import com.gmtool.util.Utility;
import com.google.common.base.Preconditions;

@Service("hopeUserInfoService")
public class HopeUserInfoServiceImpl implements IHopeUserInfoService {
    @Autowired
    private HopeUserInfoMapper hopeUserInfoMapper;

	@Override
	public HopeUserInfo selectByRoleId(PageData pd){
		HopeUserInfo info = new HopeUserInfo();
		try {
			info = hopeUserInfoMapper.findUserInfo(pd);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return info;
	}
	
	
	@Override
	public Map<String,Object> getUserList(PageData pd){
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("containerName")), "服务器不能为空");
		Map<String,Object> result = new HashMap<>();
        if(pd.size() > 3){
    		String params = Utility.getUrlParamsByMap(pd);
    		String resultString = Utility.sendPost(SearchConstant.BI_URL+SearchConstant.BI_USERLIST, params);
    	    result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
        }
		return result;
	}
	
	@Override
	public Map<String,Object> getUserIp(PageData pd){
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("roleId")), "uid不能为空");
		Map<String,Object> result = new HashMap<>();
    		String params = Utility.getUrlParamsByMap(pd);
    		String resultString = Utility.sendPost(SearchConstant.BI_URL+SearchConstant.BI_USERIP, params);
    	    result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		return result;
	}
	
}
