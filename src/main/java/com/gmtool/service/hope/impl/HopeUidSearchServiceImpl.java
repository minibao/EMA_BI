package com.gmtool.service.hope.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmtool.service.hope.IHopeApiService;
import com.gmtool.service.hope.IHopeUidSearchService;
import com.gmtool.util.PageData;
import com.gmtool.util.StringUtils;
import com.google.common.base.Preconditions;


@Service("hopeUidSearchService")
public class HopeUidSearchServiceImpl implements IHopeUidSearchService {
	
	@Autowired
	private IHopeApiService hopeApiService;
	
	@Override
	public Map<String,Object> uidSearch(PageData pd){
		Map<String,Object> result = new HashMap<>();
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("type")), "参数不能为空");
		PageData p = new PageData();
        switch (pd.getString("type")){
		case "userName":
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("info")), "参数不能为空");
			p.put("name", pd.getString("info"));
			result.put("data", hopeApiService.usersUid(p));
			break;
		case "uid":
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("info")), "参数不能为空");
			p.put("uid", pd.getString("info"));
			result.put("data", hopeApiService.usersName(p));

			break;
		case "pfUid":
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("allianceId"))&&StringUtils.isNotEmpty(pd.getString("allianceUid")), "参数不能为空");
			p.put("allianceId", pd.getString("allianceId"));
			p.put("allianceUid", pd.getString("allianceUid"));
			result.put("data", hopeApiService.usersPf(p));
			break;
		}
	
		return result;
	}

}
