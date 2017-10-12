package com.gmtool.service.impl;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmtool.dao.ConfigMapper;
import com.gmtool.dao.ResourceMapper;
import com.gmtool.dao.UserRetentionMapper;
import com.gmtool.entity.DayResourceCirculate;
import com.gmtool.entity.ResourceInOutAmount;
import com.gmtool.entity.Dictionary;
import com.gmtool.entity.UserRetention;
import com.gmtool.service.IUserStatsService;
import com.gmtool.util.PageData;

@Service("userStatsService")
public class UserStatsServiceImpl implements IUserStatsService {
	
	@Autowired
	private UserRetentionMapper userRetentionMapper;
	
	@Autowired
	private ResourceMapper resourceMapper;
	
	@Autowired
	private ConfigMapper configMapper;

	@Override
	public List<Map> findRetention(PageData pd) {
		// TODO Auto-generated method stub
		List<Map> list = new ArrayList<Map>();
        boolean flag = false;
		    try {
				List<UserRetention> result = new ArrayList<UserRetention>();
				if (pd.containsKey("channelTag")&& !"".equals(pd.get("channelTag"))) {
					List<String> channelTagPool = Arrays.asList(pd.getString("channelTag").split(","));
					pd.put("channelTag",channelTagPool);
				}
                result = userRetentionMapper.findRetention(pd);
                for(UserRetention domain :result){
                	String key = domain.getDateInfo()+domain.getContainerName()+domain.getChannel()+domain.getChannelTag();
                	flag = false;
                	for(Map map :list){
                		if(map.get("key").equals(key)){
                			map.put("reNum"+domain.getReDay(), domain.getReNum());
                			map.put("rePercent"+domain.getReDay(), domain.getRePercent());
                			flag = true;
                			}
                		}
                    if(!flag){
            			Map m = new HashMap<>();
            			m.put("key",key);
            			m.put("dateInfo", domain.getDateInfo());
            			m.put("containerName", domain.getContainerName());
            			m.put("channel", domain.getChannel());
               			m.put("channelTag", domain.getChannelTag());
               			m.put("newRole", domain.getNewRole());
               			m.put("reNum"+domain.getReDay(), domain.getReNum());
               			m.put("rePercent"+domain.getReDay(), domain.getRePercent());
               			list.add(m);
                    }	
                }
                for(Map map :list){
                	map.remove("key");
                }
            }
		    catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
		
		return list;
	}

	@Override
	public List<DayResourceCirculate> findResourceCirculate(PageData pd) {
		// TODO Auto-generated method stub
		
		//String dictType = pd.getString("resouceType");
		//String dictName = pd.getString("resouceName");
		List<Dictionary> dictionaryList = new ArrayList<Dictionary>();
		List<DayResourceCirculate> resourceList = new ArrayList<DayResourceCirculate>();
		try {
			dictionaryList = configMapper.findDictResource(pd);
			if (dictionaryList.size() == 1) {
				Dictionary dict = dictionaryList.get(0);
				String dictValue = dict.getDictValue();
				pd.put("category", dictValue);
			}
			if (pd.containsKey("channelTag")&& !"".equals(pd.get("channelTag"))) {
				List<String> channelTagPool = Arrays.asList(pd.getString("channelTag").split(","));
				pd.put("channelTag",channelTagPool);
			}
			resourceList = resourceMapper.findResourceCirculate(pd);

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return resourceList;
	}
	
    @Override
    public List<ResourceInOutAmount> findResourceDetail(PageData pd) {
        // TODO Auto-generated method stub
        List<ResourceInOutAmount> result = new ArrayList<ResourceInOutAmount>();
        try {
			if (pd.containsKey("channelTag")&& !"".equals(pd.get("channelTag"))) {
				List<String> channelTagPool = Arrays.asList(pd.getString("channelTag").split(","));
				pd.put("channelTag",channelTagPool);
			}
            result = resourceMapper.findResourceDetail(pd);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
        return result;
    }

	
}
