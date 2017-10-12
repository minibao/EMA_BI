package com.gmtool.interceptor;

import java.text.SimpleDateFormat;
import java.util.Calendar;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.gmtool.constant.LogRoutes;
import com.gmtool.util.Logger;
import com.gmtool.util.PageData;
import com.gmtool.util.ServiceHelper;
import com.gmtool.util.FastJsonUtils;
import com.gmtool.util.IpUtil;

public class RightsHandlerInterceptor extends HandlerInterceptorAdapter{
	
	protected Logger logger = Logger.getLogger(this.getClass());
	
	private final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		
		String authRoleId = (String) request.getAttribute("authRoleId");
		String name = (String) request.getAttribute("name");
		String ip = IpUtil.getRemoteHost(request);
		String path = request.getServletPath();
		
		LogRoutes[] excludeUrls = LogRoutes.values();
		for (LogRoutes route : excludeUrls) {
			if (path.equalsIgnoreCase(route.getUrl()) || path.contains(route.getUrl())){
				Calendar calendar = Calendar.getInstance();
				String timefmt = sdf.format(calendar.getTime());
				
				PageData pd = new PageData();
				
				pd.put("path", path);
				pd.put("ip", ip);
				pd.put("authRoleId", authRoleId);
				pd.put("name", name);
				pd.put("time", timefmt);
				pd.put("params", FastJsonUtils.convertObject2JSONString(request.getParameterMap().entrySet()));
				ServiceHelper.getOperationLogInfoService().insertLog(pd);
				return true;
			}
		}
		
//		ServiceHelper.getRedisService().hset(Const.REDIS_SYS_LOG, timefmt, logJsonStr);
//		ServiceHelper.getRedisService().append(Const.REDIS_SYS_LOG, logJsonStr);
//		Set<String> logJsonSet = ServiceHelper.getRedisService().keys(Const.REDIS_SYS_LOG, Set.class);
//		for(String bs: logJsonSet){
//			logger.info(bs);
//			logJsonStr = ServiceHelper.getRedisService().get(bs, String.class);
//			logJsonMap = FastJsonUtils.convertJSONString2Object(logJsonStr, Map.class);
//			logger.info(logJsonStr);
//			logger.info(logJsonMap);
//		}

		logger.info("bypass url :" + path);
		return true;
	}
}
