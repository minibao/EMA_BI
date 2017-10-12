package com.gmtool.service.pfStats;

import java.util.List;
import java.util.Map;

import com.gmtool.util.PageData;

public interface IPfStatsService {

	Map<String,Object> pfDau(PageData pd);
	
	Map<String,Object> pfPayment(PageData pd);
	
	Map<String,Object> pfReg(PageData pd);
	
	List<Map> pfRr(PageData pd);

	Map<String,Object> pfPr(PageData pd);

	List pfLTV(PageData pd);

	List pfFirstOrderRR(PageData pd);

	List pfMonth(PageData pd);
}
