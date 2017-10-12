package com.gmtool.service.hope;

import java.util.List;
import java.util.Map;

import com.gmtool.util.PageData;

public interface IHopeApiService {
	
	Map<String,Object> usersMute(PageData pd);
	
	Map<String,Object> usersMuteStats(PageData pd);
	
	Map<String,Object> usersQuit(PageData pd);
	
	Map<String,Object> usersInfo(PageData pd);
	
	Map<String,Object> usersUid(PageData pd);

	Map<String,Object> usersName(PageData pd);
	
	List<Map> usersPf(PageData pd);
	
	Map<String,Object> mail(PageData pd);

	Map<String,Object> announceAdd(PageData pd);
	
	Map<String,Object> announceDel(PageData pd);
	
	Map<String,Object> announceGet(PageData pd);
}
