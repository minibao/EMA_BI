package com.gmtool.service.pfStats;

import java.util.List;
import java.util.Map;

import com.gmtool.util.PageData;

public interface IPfDictService {
	
	List<Map> pfDict(PageData pd) throws Exception;
	
}
