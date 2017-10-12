package com.gmtool.util;

import com.gmtool.listener.WebAppContextListener;
import com.gmtool.service.IAuthService;
import com.gmtool.service.IOperationLogInfoService;
import com.gmtool.service.IRedisService;
import com.gmtool.service.ISystemService;

/**
 * @author Administrator
 * 获取Spring容器中的service bean
 */
public final class ServiceHelper {
	
	public static Object getService(String serviceName){
		return WebAppContextListener.getApplicationContext().getBean(serviceName);
	}
	
	public static ISystemService getSystemService(){
		return (ISystemService) getService("systemService");
	}
	
	public static IRedisService getRedisService(){
		return (IRedisService) getService("redisService");
	}
	
	public static IAuthService getAuthService(){
		return (IAuthService) getService("authService");
	}
	
	public static IOperationLogInfoService getOperationLogInfoService(){
		return (IOperationLogInfoService) getService("operationLogInfoService");
	}
}
