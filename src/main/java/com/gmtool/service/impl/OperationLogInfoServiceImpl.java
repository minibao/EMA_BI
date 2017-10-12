package com.gmtool.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmtool.dao.OperationLogInfoMapper;
import com.gmtool.service.IOperationLogInfoService;
import com.gmtool.util.PageData;

@Service("operationLogInfoService")
public class OperationLogInfoServiceImpl implements IOperationLogInfoService {

	@Autowired
	private OperationLogInfoMapper operationLogInfoMapper;
	
	@Override
	public List<Map> selectAll(PageData pd) throws Exception{
		return operationLogInfoMapper.selectAll(pd);
	}
	
	@Override
	public void insertLog(PageData pd) throws Exception{
		operationLogInfoMapper.insertLog(pd);
	}
}
