package com.gmtool.service.pfStats.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;

import com.gmtool.service.IMemberInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmtool.constant.SearchConstant;
import com.gmtool.service.pfStats.IPfRealtimeStstsService;
import com.gmtool.service.pfStats.sortClass;
import com.gmtool.util.FastJsonUtils;
import com.gmtool.util.PageData;
import com.gmtool.util.StringUtils;
import com.gmtool.util.Utility;
import com.google.common.base.Preconditions;

@Service("pfRealtimeStstsService")
public class PfRealtimeStstsServiceImpl implements IPfRealtimeStstsService {

	@Autowired
	private IMemberInfoService memberInfoService;

	private SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	
	
	private void setData(Map back,String dateName,String type,List<Map> result){
		List<Map> list = (List<Map>)back.get("data");
		boolean f = false;
		String date = df.format(new Date());
        ListIterator<Map> resultIt;
		for(Map backData:list){
			// String date = ((String)(backData.get("activeDate"))).substring(0, 10) ;
			String time = ((String)(backData.get(dateName))).substring(11);
			String dateTime = date+" "+time;
			resultIt = result.listIterator();
            while (resultIt.hasNext())
            {
            	Map re =resultIt.next();
            	f = ((String)re.get("time")).substring(11).equals(time);
            	if(f){
					Map data = (Map)re.get("data");
					backData.remove("createTs");
					backData.remove("id");
					backData.put(dateName, ((String)(backData.get(dateName))).substring(0, 10));
					data.put(type, backData);
					break;
				}
			}
			
			if(!f){
                Map re = new HashMap<>();
                re.put("time", dateTime);
                Map data = new HashMap<>();
				backData.remove("createTs");
				backData.remove("id");
				backData.put(dateName, ((String)(backData.get(dateName))).substring(0, 10));
                data.put(type, backData);
                re.put("data",data);
                resultIt.add(re);
			}
		}
	}
	
	@Override
	public List<Map> pfDauRealtime(PageData pd){
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("compareD")), "日期不能为空");
		List<Map> result = new ArrayList<>();
		List<Map> result1 = new ArrayList<>();

		Date compareD;
		String compareStartD = null;
		String compareEndD = null;
		try {
			 compareD = df.parse(pd.getString("compareD"));
			compareStartD = df.format(compareD);
			compareEndD = compareStartD+" 23:59:59";
		} catch (ParseException e) {
			e.printStackTrace();
		}

		pd.put("startD", compareStartD);
		pd.put("endD", compareEndD);
		try {
			String[] channelList = memberInfoService.getRoles(pd.getString("token"),pd.get("allianceId") == null ? "" : pd.get("allianceId").toString());
			if(channelList !=null && 0 != channelList.length){
				pd.put("allianceId",channelList[0]);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		String params = Utility.getUrlParamsByMap(pd);
		String resultString = Utility.sendPost(SearchConstant.PF_BI_URL+SearchConstant.PF_BI_DAUREALTIME, params);
		Map resultCompare = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		setData(resultCompare,"activeDate","result",result);
		
        sortClass sort = new sortClass();  
        Collections.sort(result,sort);  
        for(int i=0;i<result.size();i++){  
        	result1.add((Map)result.get(i));  
        }  
		
		return result1;
	}

	
	@Override
	public 	List<Map> pfRegRealtime(PageData pd){
		Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("compareD")), "日期不能为空");
		List<Map> result = new ArrayList<>();
		List<Map> result1 = new ArrayList<>();
		Date compareD;
		String compareStartD = null;
		String compareEndD = null;
		try {
			 compareD = df.parse(pd.getString("compareD"));
			compareStartD = df.format(compareD);
			compareEndD = compareStartD+" 23:59:59";
		} catch (ParseException e) {
			e.printStackTrace();
		}
		pd.put("startD", compareStartD);
		pd.put("endD", compareEndD);
		try {
			String[] channelList = memberInfoService.getRoles(pd.getString("token"),pd.get("allianceId") == null ? "" : pd.get("allianceId").toString());
			if(channelList !=null && 0 != channelList.length){
				pd.put("allianceId",channelList[0]);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		String params = Utility.getUrlParamsByMap(pd);
		String resultString = Utility.sendPost(SearchConstant.PF_BI_URL+SearchConstant.PF_BI_REGREALTIME, params);
		Map resultCompare = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		setData(resultCompare,"regDate","result",result);
		
        sortClass sort = new sortClass();  
        Collections.sort(result,sort);  
        for(int i=0;i<result.size();i++){  
        	result1.add((Map)result.get(i));  
        }  
		
		return result1;
		
	}
	
	@Override
	public List<Map> pfPaymentRealtime(PageData pd){
		
		Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("compareD")), "日期不能为空");
		List<Map> result = new ArrayList<>();
		List<Map> result1 = new ArrayList<>();
		Date compareD;
		String compareStartD = null;
		String compareEndD = null;
		try {
			 compareD = df.parse(pd.getString("compareD"));
			compareStartD = df.format(compareD);
			compareEndD = compareStartD+" 23:59:59";
		} catch (ParseException e) {
			e.printStackTrace();
		}

		pd.put("startD", compareStartD);
		pd.put("endD", compareEndD);
		try {
			String[] channelList = memberInfoService.getRoles(pd.getString("token"),pd.get("allianceId") == null ? "" : pd.get("allianceId").toString());
			if(channelList !=null && 0 != channelList.length){
				pd.put("allianceId",channelList[0]);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		String params = Utility.getUrlParamsByMap(pd);
		String resultString = Utility.sendPost(SearchConstant.PF_BI_URL+SearchConstant.PF_BI_PAYMENTREALTIME, params);
		Map resultCompare = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		setData(resultCompare,"calcDate","result",result);
		
        sortClass sort = new sortClass();  
        Collections.sort(result,sort);  
        for(int i=0;i<result.size();i++){  
        	result1.add((Map)result.get(i));  
        }  
		
		return result1;
		
	}
	

	@Override
	public List<Map> pfRetentionRealtime(PageData pd){

		Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("compareD")), "日期不能为空");
		List<Map> result = new ArrayList<>();
		List<Map> result1 = new ArrayList<>();
		Date compareD;
		String compareStartD = null;
		String compareEndD = null;
		try {
			compareD = df.parse(pd.getString("compareD"));
			compareStartD = df.format(compareD);
			compareEndD = compareStartD+" 23:59:59";
		} catch (ParseException e) {
			e.printStackTrace();
		}

		pd.put("startD", compareStartD);
		pd.put("endD", compareEndD);
		try {
			String[] channelList = memberInfoService.getRoles(pd.getString("token"),pd.get("allianceId") == null ? "" : pd.get("allianceId").toString());
			if(channelList !=null && 0 != channelList.length){
				pd.put("allianceId",channelList[0]);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		String params = Utility.getUrlParamsByMap(pd);
		String resultString = Utility.sendPost(SearchConstant.PF_BI_URL+SearchConstant.PF_BI_RETENTIONREALTIME, params);
		Map resultCompare = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
		setData(resultCompare,"visitDate","result",result);

		sortClass sort = new sortClass();
		Collections.sort(result,sort);
		for(int i=0;i<result.size();i++){
			result1.add((Map)result.get(i));
		}

		return result1;

	}


	@Override
	public List<Map> pfUserPaymentStatics(PageData pd){
		Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")) && StringUtils.isNotEmpty(pd.getString("endD")), "日期不能为空");
		List<Map> result = new ArrayList<>();
		try {
			String[] channelList = memberInfoService.getRoles(pd.getString("token"),pd.get("allianceId") == null ? "" : pd.get("allianceId").toString());
			if(channelList !=null && 0 != channelList.length){
				pd.put("allianceId",channelList[0]);
			}
			String params = Utility.getUrlParamsByMap(pd);
			String resultString = Utility.sendPost(SearchConstant.PF_BI_URL+SearchConstant.PF_BI_PAYMENTSTATICS, params);
			Map resultMap = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
			result = (List)resultMap.get("data");
		} catch (Exception e) {
			e.printStackTrace();
		}

		return result;

	}


}
