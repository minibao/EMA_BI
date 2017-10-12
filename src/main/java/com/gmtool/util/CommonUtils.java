package com.gmtool.util;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;
import java.util.Map;
import java.util.Random;

public class CommonUtils {

	public static boolean isNumeric(String str){
		for (int i = 0; i < str.length(); i++){
			//System.out.println(str.charAt(i));
			if (!Character.isDigit(str.charAt(i))){
				return false;
			}
		}
		return true;
	}

	/**判断对象是否为空*/
	public static boolean isEmpty(Object o){
		if(o == null || o.toString().equals(""))
			return true;
		return false;
	}

	public static boolean isNotEmpty(Object o){
		return !isEmpty(o);
	}

	public static String getString(Object o){
		if(o == null || o.toString().equals(""))
			return "";
		return o.toString();
	}

	public static boolean checkParameter(String error,Object... o){
		boolean result = true;
		for(Object i:o){
			result = result && isEmpty(i);
		}
		return result;
	}


	/**
	 * 根据订单类型获取订单编号
	 * @param orderType
	 * @return
	 */
	public static String getRandomOrderCode(String orderType){
		String timemills = String.valueOf(System.currentTimeMillis());
		return orderType + timemills + getFixLenthString(5);
	}

	/**
	 * 获取指定位数的随机数
	 * @param strLength 指定的位数
	 * @return 指定位数的随机数
	 */
	public static String getFixLenthString(int strLength) {
		Random rm = new Random();
		// 获得随机数
		double pross = (1 + rm.nextDouble()) * Math.pow(10, strLength);
		// 将获得的获得随机数转化为字符串
		String fixLenthString = String.valueOf(pross);
		// 返回固定的长度的随机数
		return fixLenthString.substring(1, strLength + 1);
	}

	public static Object getResultMethodInvoke(Object obj, String filed) {
		try {
			Class clazz = obj.getClass();
			PropertyDescriptor pd = new PropertyDescriptor(filed, clazz);
			Method getMethod = pd.getReadMethod();//获得get方法
			Object o = getMethod.invoke(obj);//执行get方法返回一个Object
			return o;
		} catch (Exception e) {
			e.printStackTrace();
//			throw new RuntimeException(Thread.currentThread().getStackTrace()[1].getClassName() + "." + Thread.currentThread().getStackTrace()[1].getMethodName()+e.getMessage());
			return null;
		}
	}

	public static void setDataMethodInvoke(Object obj, String filed,Object content) {
		try {
			Class clazz = obj.getClass();
			PropertyDescriptor pd = new PropertyDescriptor(filed, clazz);
			Method writeMethod = pd.getWriteMethod();//获得set方法
			writeMethod.invoke(obj,content);//执行set方法
		} catch (Exception e) {
			e.printStackTrace();
		}
	}


	public static String dateFormat(Date date){
		return dateFormat(date,100);
	}
	/**
	 * 根据指定类型获取日期格式
	 * @param type   指定的日期类型
	 * @return SimpleDateFormat
	 */
	public static String dateFormat(Date date,Integer type){
		String pattern = null;
		switch(type){
			case 0:
				pattern = "yyyy-MM-dd"; //2003-05-19
				break;
			case 1:
				pattern = "yyyy-MM-dd EEE"; //2003-05-19 星期一
				break;
			case 2:
				pattern = "HH_mm_ss"; //16:09:31
				break;
			case 3:
				pattern = "yyyy-MM-dd 'at' HH:mm:ss"; //2003-05-19 at 16:09:31
				break;
			case 4:
				pattern = "M'月'd'日'hh:mm"; //9月1日10:57
				break;
			case 5:
				pattern = "yyyy-MM-dd HH:mm:ss"; //2003-05-19 16:09:31
				break;
			case 6:
				pattern = "yyyyMMddHHmmss"; //20030519160931 black/red list
				break;
			default:
				pattern = "yyyy-MM-dd HH:mm:ss"; //2003-05-19 16:09:31
		}
		SimpleDateFormat formatter = new SimpleDateFormat(pattern);
		String dateString = formatter.format(date);
		return dateString;
	}

	/**
	 * 获得主机IP
	 *
	 * @return String
	 */
	public static boolean isWindowsOS(){
		boolean isWindowsOS = false;
		String osName = System.getProperty("os.name");
		if(osName.toLowerCase().indexOf("windows")>-1){
			isWindowsOS = true;
		}
		return isWindowsOS;
	}

	/**
	 * 获取本机ip地址，并自动区分Windows还是linux操作系统
	 * @return String
	 */
	public static String getLocalIP(){
		String sIP = "";
		InetAddress ip = null;
		try {
			//如果是Windows操作系统
			if(isWindowsOS()){
				ip = InetAddress.getLocalHost();
			}
			//如果是Linux操作系统
			else{
				boolean bFindIP = false;
				Enumeration<NetworkInterface> netInterfaces = (Enumeration<NetworkInterface>) NetworkInterface
						.getNetworkInterfaces();
				while (netInterfaces.hasMoreElements()) {
					if(bFindIP){
						break;
					}
					NetworkInterface ni = (NetworkInterface) netInterfaces.nextElement();
					//----------特定情况，可以考虑用ni.getName判断
					//遍历所有ip
					Enumeration<InetAddress> ips = ni.getInetAddresses();
					while (ips.hasMoreElements()) {
						ip = (InetAddress) ips.nextElement();
						if( ip.isSiteLocalAddress()
								&& !ip.isLoopbackAddress()   //127.开头的都是lookback地址
								&& ip.getHostAddress().indexOf(":")==-1){
							bFindIP = true;
							break;
						}
					}

				}
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}

		if(null != ip){
			sIP = ip.getHostAddress();
		}
		return sIP;
	}

}
