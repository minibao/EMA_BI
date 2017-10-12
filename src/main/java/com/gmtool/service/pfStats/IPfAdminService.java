package com.gmtool.service.pfStats;

import java.util.List;
import java.util.Map;

import com.gmtool.util.PageData;

public interface IPfAdminService {
	
	List<Map<String,Object>> userInfo(PageData pd);
	
	Map<String,Object> changeUserInfo(PageData pd);

	List<Map<String,Object>> getOrderMiss(PageData pd);
	
	Map<String,Object> supplyOrderAgain(PageData pd);
	
	 Map<String,Object> userStatus(PageData pd);
	 
	 Map<String,Object> changeUserStatus(PageData pd);
	 
	 Map<String,Object> getTransaction(PageData pd);
	 
	 Map<String,Object> queryAliPay(PageData pd);
	 
	 Map<String,Object> resetPfAdmin(PageData pd);
	 
	 List<Map<String,Object>> whiteListAlliance(PageData pd);
	 
	 Map<String,Object> changeWhiteListAlliance(PageData pd);
	 
	 List<Map<String,Object>> whiteListUid(PageData pd);
	 
	 Map<String,Object> changeWhiteListUid(PageData pd);

	//TODO 2017-05-03
	List getOrderInfo(PageData pd) throws Exception;
	Map<String,Object> supplyOrderForGame(PageData pd) throws Exception;
	Map<String,Object> getUserInfo(PageData pd) throws Exception;
	Map<String,Object> updateUserInfo(PageData pd) throws Exception;
}
