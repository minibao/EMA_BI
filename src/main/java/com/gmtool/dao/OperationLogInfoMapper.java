package com.gmtool.dao;

import java.util.List;
import java.util.Map;

import com.gmtool.entity.OperationLogInfo;
import com.gmtool.util.PageData;

public interface OperationLogInfoMapper {
	
	List<Map> selectAll(PageData pd) throws Exception;
	
	void insertLog(PageData pd) throws Exception;

}
