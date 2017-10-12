package com.gmtool.service.pfStats;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Comparator;
import java.util.Map;  
  
public class sortClass implements Comparator{  
	
	private SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
    public int compare(Object arg0,Object arg1){  
    	Map user0 = (Map)arg0;  
    	Map user1 = (Map)arg1;  
        int flag = 0;
		try {
			flag = (df.parse(user0.get("time").toString())).compareTo(df.parse(user1.get("time").toString()));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  
        return flag;  
    }
   
}  