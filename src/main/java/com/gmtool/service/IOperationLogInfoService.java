package com.gmtool.service;

import java.util.List;
import java.util.Map;

import com.gmtool.entity.OperationLogInfo;
import com.gmtool.util.PageData;

public interface IOperationLogInfoService {
	
	
	List<Map> selectAll(PageData pd) throws Exception;
	
	void insertLog(PageData pd) throws Exception;

}
