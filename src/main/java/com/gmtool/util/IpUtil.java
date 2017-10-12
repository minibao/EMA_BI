/**
 * Copyright ; 2015 HangZhou Laundry Co. Ltd.
 * All right reserved.
 */
package com.gmtool.util;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;


/**
 * Ip
 * @author jacky_zhou
 * @date 2011-5-25
 * @version $id$
 */
public class IpUtil {
    
    public static final String IP_HEADER_DEFAULT = "X-Forwarded-For";
    public static final String IP_HEADER_BALANCE = "CLIENT_IP";
    
    /**
     *
     * @param ip
     * @return
     */
    public static Long ip2Long(String ip) {
        InetAddress address;
        try {
            address = InetAddress.getByName(ip);
        } catch (UnknownHostException e) {
            return null;
        }

        byte[] bytes = address.getAddress();
        long a, b, c, d;
        a = byte2int(bytes[0]);
        b = byte2int(bytes[1]);
        c = byte2int(bytes[2]);
        d = byte2int(bytes[3]);
        long result = (a << 24) | (b << 16) | (c << 8) | d;
        return result;
    }
    
    private static int byte2int(byte b) {
        int l = b & 0x07f;
        if (b < 0) {
            l |= 0x80;
        }
        return l;
    }  

    public static boolean isValid(String ip){
    	  if(StringUtil.isBlank(ip)){
    		  return false;
    	  }
    	
    	  boolean flag=false;
    	  try{
    	//   String regex="[0-9]+[.][0-9]+[.][0-9]+[.][0-9]+";
    	   String regex="^((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]|[*])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]|[*])$";
    	   //
    	//String regex="^((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]|[*])$";
    	//   String regex="\\b((?!\\d\\d\\d)\\d+|1\\d\\d|2[0-4]\\d|25[0-5])\\.((?!\\d\\d\\d)\\d+|1\\d\\d|2[0-4]\\d|25[0-5])\\.((?!\\d\\d\\d)\\d+|1\\d\\d|2[0-4]\\d|25[0-5])\\.((?!\\d\\d\\d)\\d+|1\\d\\d|2[0-4]\\d|25[0-5])\\b";
    	   Pattern p=Pattern.compile(regex);
    	   Matcher m=p.matcher(ip);
    	   if(m.find()){
    	     flag = true;
    	   }
    	  }catch(Exception e){
    	   e.printStackTrace();
    	  }
    	  
//    	  if(ip.startsWith("192.168.")||ip.startsWith("127.0.")){
//    		  flag = false;
//    	  }
    	  if(ip.startsWith("127.0.")){
		  	flag = false;
	  	  }
    	  //System.out.println(flag);
    	  
    	  return flag;
    	 }
    
    public static boolean isPayValid(String ip){
  	  if(StringUtil.isBlank(ip)){
  		  return false;
  	  }
  	
  	  boolean flag=false;
  	  try{
  	//   String regex="[0-9]+[.][0-9]+[.][0-9]+[.][0-9]+";
  	   String regex="^((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]|[*])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]|[*])$";
  	   //
  	//String regex="^((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]|[*])$";
  	//   String regex="\\b((?!\\d\\d\\d)\\d+|1\\d\\d|2[0-4]\\d|25[0-5])\\.((?!\\d\\d\\d)\\d+|1\\d\\d|2[0-4]\\d|25[0-5])\\.((?!\\d\\d\\d)\\d+|1\\d\\d|2[0-4]\\d|25[0-5])\\.((?!\\d\\d\\d)\\d+|1\\d\\d|2[0-4]\\d|25[0-5])\\b";
  	   Pattern p=Pattern.compile(regex);
  	   Matcher m=p.matcher(ip);
  	   if(m.find()){
  	     flag = true;
  	   }
  	  }catch(Exception e){
  	   e.printStackTrace();
  	  }
  	  
  	  if(ip.startsWith("192.168.")||ip.startsWith("127.0.")){
  		  flag = false;
  	  }
  	  
  	  return flag;
  	 }    
    

    public static boolean match(String ip,String ipSector){    
        String[] ipmasks =ipSector.split("/");
        if(ipmasks.length==1){
            if(ip.equals(ipSector)){
                return true;
            }else{
                return false;
            }
        }else if(ipmasks.length==2){
            try{
                int maskdigit = Integer.parseInt(ipmasks[1]);
                long mask = maskToLong(maskdigit);
                long ipLong =ip2Long(ip);
                long ipLongSector =ip2Long(ipmasks[0]);
                long yuIpLong =ipLong&mask;
                long yuLongSector =ipLongSector&mask;
                if(yuIpLong==yuLongSector){
                    return true;
                }else{
                    return false;
                }                
            }catch(NumberFormatException e){
                return false;
            }
        }       
        
        return false;
    }
    

    public  static long maskToLong(int mask){
        return (long)(Math.pow(2, 32)-Math.pow(2, 32-mask));     
    }


	/**
	 *
	 * 
	 * @return
	 */
	public static String getRequestDomain(HttpServletRequest request) {
		String domain = "";
		String contextPath = request.getContextPath();
		String headerReferer = request.getHeader("Referer");
		if (StringUtil.isNotBlank(headerReferer)) {
			domain = headerReferer.substring(0,
							headerReferer.indexOf(contextPath) + contextPath.length() + 1)
					.replaceAll("http://", "").replaceAll("https://", "")
					.replaceAll(contextPath, "").replaceAll("/", "");
		}
		return domain;
	}    
    
	/**
	 * 
	 * 
	 * @return
	 */
	public static String getRequestReferer(HttpServletRequest request) {
		String referer = request.getHeader("Referer");
		return referer;
	}
    public static String getRemoteHost(HttpServletRequest request){
        String ip = request.getHeader("x-forwarded-for");
        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)){
            ip = request.getHeader("Proxy-Client-IP");
        }
        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)){
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)){
            ip = request.getRemoteAddr();
        }
        return ip.equals("0:0:0:0:0:0:0:1")?"127.0.0.1":ip;
    }
}
