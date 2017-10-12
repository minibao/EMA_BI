package com.gmtool.service.pfStats;

import java.util.List;
import java.util.Map;

import com.gmtool.util.PageData;

public interface IPfRealtimeStstsService {

	List<Map> pfDauRealtime(PageData pd);
	
	List<Map> pfRegRealtime(PageData pd);
	
	List<Map> pfPaymentRealtime(PageData pd);

	List<Map> pfRetentionRealtime(PageData pd);

	List<Map> pfUserPaymentStatics(PageData pd);
}
