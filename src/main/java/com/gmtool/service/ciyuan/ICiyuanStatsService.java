package com.gmtool.service.ciyuan;

import java.util.List;
import java.util.Map;

import com.gmtool.util.PageData;

public interface ICiyuanStatsService {

	List<Map<String,Object>> getNewbieTaskStatistics(PageData pd);
	
	List<Map<String,Object>> getStatisticsOnlineTime(PageData pd);
	
	List<Map<String,Object>> getUserOnlineNum(PageData pd);
	
	List<Map<String,Object>> getUserOnlineTime(PageData pd);
	
	List<Map<String,Object>> getDauData(PageData pd);
	
	List<Map<String,Object>> getRegData(PageData pd);
	
	List<Map<String,Object>> getUserGold(PageData pd);
	
	List<Map<String,Object>> getUserDiamond(PageData pd);
	
	List<Map<String,Object>> getUserHeroSkin(PageData pd);
	
	List<Map<String,Object>> getUserHero(PageData pd);
	
	List<Map<String,Object>> getTaskEveryDay(PageData pd);
	
	 List<Map<String,Object>> getHeroWin(PageData pd);
	 
	 List<Map<String,Object>> getBattleStats(PageData pd);
	 
	 List<Map<String,Object>> getRetentionStats(PageData pd);
	 
	 List<Map<String,Object>> getPackageInformation(PageData pd);
	 
	 List<Map<String,Object>> getDiamondCost(PageData pd);
		
	List<Map<String,Object>> getLottery(PageData pd);
	
	List<Map<String,Object>> getActivity(PageData pd);
	
	List<Map<String,Object>> getSkinAwaken(PageData pd);

    Object getUserRechargeRecord(PageData pd1);
}
