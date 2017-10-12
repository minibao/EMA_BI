package com.gmtool.dao;

import java.util.List;

import com.gmtool.entity.UserRetention;
import com.gmtool.util.PageData;

public interface UserRetentionMapper {
	
	public List<UserRetention> findRetention (PageData pd) throws Exception;

}
