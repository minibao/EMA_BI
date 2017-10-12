package com.gmtool.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.gmtool.dao.DictionaryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//import com.gmtool.dao.DictionaryChanneltagDao;
import com.gmtool.entity.DictionaryChannel;
import com.gmtool.entity.DictionaryChanneltag;
import com.gmtool.service.IDictionaryService;
import com.gmtool.util.PageData;

@Service("dictionaryService")
public class DictionaryServiceImpl implements IDictionaryService {
	
	@Autowired
	public DictionaryMapper dictionaryMapper;

	@Override
	public Map<String,Object> insOrupdDic(PageData pd) {
		// TODO Auto-generated method stub
		Map<String , Object > map = new HashMap<String, Object>();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
		String result = "0";
		String resultMsg = "成功";
		PageData pg;
		try {
			// channeltagName   channeltagValue     lastTime 
			if(isEmpty(pd.getString("channeltagName"))){
				throw new Exception("渠道名不允许为空");
			}
			if(isEmpty(pd.getString("channeltagValue"))){
				throw new Exception("渠道代码不允许为空");
			}
			String [] channeltagName = pd.getString("channeltagName").split(",");
			String [] channeltagValue = pd.getString("channeltagValue").split(",");
			Date lastTime = null;
			try {
				if(!isEmpty(pd.getString("lastTime"))){ 
					lastTime = sdf.parse(pd.getString("lastTime"));
				}
			} catch (Exception e) {
				// TODO: handle exception
				lastTime = null;
			}
			if(channeltagValue.length != channeltagName.length){
				throw new Exception("子渠道key与value无法对应。");
			}
			for(int i = 0 ; i < channeltagName.length ; i ++){
				pg =  new PageData();
				pg.put("channeltagName", channeltagName[i]);
				pg.put("channeltagValue", channeltagValue[i]);
				pg.put("lastTime", lastTime);
				DictionaryChanneltag dictionaryChanneltag = dictionaryMapper.findDictionarytag(pg);
				if(null == dictionaryChanneltag){
					// 插入
					dictionaryMapper.insertChanneltag(pg);
				}else {
					// 修改
					dictionaryMapper.updateChanneltag(pg);
				}
			}
		} catch (Exception e) {
			result = "1";
			resultMsg = e.toString();
			e.printStackTrace();
		}
		map.put("result", result);
		map.put("resultMsg", resultMsg);
		return map;
	}


	@Override
	public List<DictionaryChanneltag> findAllDictionary(PageData pd) {
		// TODO Auto-generated method stub
		List<DictionaryChanneltag> list = dictionaryMapper.findAllDictionary(pd);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		for(int i = 0 ; i < list.size() ; i++){
			list.get(i).setLastTimeStr(list.get(i).getLastTime() == null ? "" : sdf.format(list.get(i).getLastTime()));
		}
		return list;
	}
	
	
	@Override
	public Map<String, Object> deleteDictionaryChannelTag(PageData pd) {
		// TODO Auto-generated method stub
		Map<String , Object > map = new HashMap<String, Object>();
		try {
			if(isEmpty(pd.getString("id"))){
				throw new Exception("ID不允许为空。");
			}
		    int num = dictionaryMapper.deleteDictionaryChannelTag(java.util.Arrays.asList(pd.getString("id").split(",")));
		    map.put("result", "0");
		    map.put("resultMsg", "删除成功");
		} catch (Exception e) {
			// TODO: handle exception
			map.put("result", "1");
		    map.put("resultMsg", e.toString());
		}
		return map;
	}
	
	
	@Override
	public List<DictionaryChannel> findAllDictionaryChannel(PageData pd) {
		// TODO Auto-generated method stub
		return dictionaryMapper.findAllDictionaryChannel(pd);
	}
	
    /**
     * 自用验空
     * @param
     * @return
     */
    public boolean isEmpty(Object value) {
        if (value == null || value.toString().length() <= 0 || "undefined".equals(value .toString())) {
              return true ;
       } else{
              return false ;
       }
 }

}
