package com.gmtool.util;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Iterator;

public class EmaUtil {

	
	public static String postParam(PageData pd) {
        StringBuffer buffer = new StringBuffer();
        Iterator i = pd.entrySet().iterator();
        while(i.hasNext()){
        	java.util.Map.Entry entry = (java.util.Map.Entry)i.next();
        	String key = entry.getKey().toString();
        	String value = entry.getValue().toString();
        	if(!(key.equals("mid")||key.equals("token"))){
                if (0 < buffer.length()) { 
                    buffer.append("&");
                    }
                  try {
					buffer.append(key+"="+URLEncoder.encode(value, "UTF-8"));
				} catch (UnsupportedEncodingException e) {
					e.printStackTrace();
				}
        	}
        }
		return buffer.toString();
    }
}
