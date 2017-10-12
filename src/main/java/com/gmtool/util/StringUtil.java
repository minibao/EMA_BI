package com.gmtool.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 字符串相关方法
 *
 */
public class StringUtil {
    protected static Logger logger = Logger.getLogger(StringUtil.class);

	/**
	 * 将以逗号分隔的字符串转换成字符串数组
	 * @param valStr
	 * @return String[]
	 */
	public static String[] StrList(String valStr){
	    int i = 0;
	    String TempStr = valStr;
	    String[] returnStr = new String[valStr.length() + 1 - TempStr.replace(",", "").length()];
	    valStr = valStr + ",";
	    while (valStr.indexOf(',') > 0)
	    {
	        returnStr[i] = valStr.substring(0, valStr.indexOf(','));
	        valStr = valStr.substring(valStr.indexOf(',')+1 , valStr.length());
	        
	        i++;
	    }
	    return returnStr;
	}
	
	/**
	 * 获取字符串里面的第一个数�?
	 * 
	 * 
	 * **/
	 public static int getFirstNumber(String ss) {
		  int firstNum = -1 ;
		  Pattern p = Pattern.compile("(\\d+)");  
		  Matcher m = p.matcher(ss);      
		  if(m.find()){
			  String result = m.group(1);
			  firstNum =  Integer.parseInt(result);
			
		  }
		  return firstNum;
		}
	 
	    /**
	     * 判断指定字符串是否为非空
	     * @param str
	     * @return
	     */
	    public static boolean isNotBlank(String str){
	        return str!=null&&!"".equals(str.trim());
	    }
	    
	    /**
	     * 判断指定字符串是否为�?
	     * @param str
	     * @return
	     */
	    public static boolean isBlank(String str){
	        return !isNotBlank(str);
	    }
	    	 
	 
	 public static void main(String[] args) {
		 logger.info(getFirstNumber("文三�?666-88我剪短发222"));
		 
	 }
	
    public static boolean isEmpty(String str) {
        return str == null || str.length() == 0;
    }
    
    public static boolean isNotEmpty(String str) {
        return !isEmpty(str);
    }
    
    
    
}
