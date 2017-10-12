package com.gmtool.dao;

import java.util.List;
import java.util.Map;

import com.gmtool.entity.DictionaryChannel;
import com.gmtool.entity.DictionaryChanneltag;
import com.gmtool.util.PageData;

public interface DictionaryMapper {
	
	public DictionaryChanneltag findDictionarytag(PageData pd) throws Exception;
	
	public void insertChanneltag(PageData pd) throws Exception;
	
	public void updateChanneltag(PageData pd) throws Exception;

	public List<DictionaryChanneltag> findAllDictionary(PageData pd);

	public int deleteDictionaryChannelTag(List<String> list);

	public List<DictionaryChannel> findAllDictionaryChannel(PageData pd);
	 
}
