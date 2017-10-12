package com.gmtool.filter;

import java.io.IOException;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;



import com.gmtool.constant.Routes;

import com.gmtool.entity.SysMenu;
import com.gmtool.entity.SysRole;
import com.gmtool.entity.TokenModel;
import com.gmtool.util.Logger;
import com.gmtool.util.ServiceHelper;
import com.gmtool.util.Tools;

public class MenuFilter implements Filter{
	
	
	protected Logger logger = Logger.getLogger(this.getClass());

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		System.out.println("destroy");
		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		// TODO Auto-generated method stub

		HttpServletRequest httpRequest = (HttpServletRequest) request;
		String path =  httpRequest.getServletPath();
		System.out.println(path);
		
		boolean checkFlag = true;
		Routes[] excludeUrls = Routes.values();
		for (Routes route : excludeUrls) {
			System.out.println(route.getUrl());
			if (path.equalsIgnoreCase(route.getUrl()) || path.contains(route.getUrl()) && !route.getUrl().equals("/") ){
				//logger.info("bypass url :" + path);
				checkFlag = false;
			}
		}
		
		if (checkFlag) {
			try {
				String mid = request.getParameter("mid");
				if (Tools.isEmpty(mid)) {
					throw new Exception("缺少参数mid");
				}
				String token = request.getParameter("token");
				if (Tools.isEmpty(token)) {
					throw new Exception("缺少参数token");
				}
				TokenModel tokenModel = ServiceHelper.getRedisService().get(token, TokenModel.class);
				if (tokenModel == null) {
					throw new Exception("token不存在或者已经过期");
				}
				if (tokenModel.getAuthRoleId() == 0) {
					throw new Exception("没有访问权限，请联系管理员");
				}
				//if (Tools.isEmpty(tokenModel.getAccessMenus())) {
					String authName = tokenModel.getName();
					Integer authRoleId = tokenModel.getAuthRoleId();
					request.setAttribute("authRoleId", authRoleId+"");
					request.setAttribute("name", authName+"");
					List<SysMenu> allMenus = ServiceHelper.getSystemService().loadAllSysMenu();
					SysRole sysRole = ServiceHelper.getAuthService().findSysRoleById(authRoleId, allMenus);
					if (Tools.isEmpty(authName) || authRoleId == null) {
						throw new Exception("内部错误");
					}
					if (sysRole == null) {
						throw new Exception("角色不存在，请联系管理员");
					}
					if(null != sysRole.getInterfaces() || "".equals(sysRole.getInterfaces())){
//						if(null == request.getParameter("channel") && null == request.getParameter("allianceId")){
//							throw new Exception("没有访问权限，请联系管理员");
//						}
//						if(!sysRole.getInterfaces().contains(request.getParameter("channel") == null ? "null" : request.getParameter("channel")) && !sysRole.getInterfaces().contains(request.getParameter("allianceId") == null ? "null" : request.getParameter("allianceId")) ){
//							throw new Exception("没有访问权限，请联系管理员");
//						}
					}
					String readableRights = sysRole.getReadableRights();
					//tokenModel.setAccessMenus(readableRights);
					ServiceHelper.getRedisService().set(token, tokenModel);
				//}

				boolean pass = false;
				String[] accessMenus = readableRights.split(",");
				for (String menuId: accessMenus) {
					if (menuId.equals(mid)) {
						pass = true;
					}
				}
				if (!pass) {
					throw new Exception("没有访问权限，请联系管理员");
				}
			}catch (Exception ex) {
				response.setContentType("text/html;charset=UTF-8");
				response.getWriter().print("{\"result\":\"99\",\"msg\":\""+ex.getMessage()+"\"}");
				return;	
			}
			
		}

		chain.doFilter(request, response);
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub
		System.out.println("doFilter");
	}

}
