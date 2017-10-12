package com.gmtool.service;

import java.util.List;
import java.util.Map;

import com.gmtool.entity.DictionaryChannel;
import com.gmtool.entity.DictionaryChanneltag;
import com.gmtool.util.PageData;

public interface IDictionaryService {

	public Map<String,Object> insOrupdDic(PageData pd);

	public List<DictionaryChanneltag> findAllDictionary(PageData pd);

	public Map<String, Object> deleteDictionaryChannelTag(PageData pd);

	public List<DictionaryChannel> findAllDictionaryChannel(PageData pd);
	
}
