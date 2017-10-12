package com.gmtool.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gmtool.controller.base.BaseController;
import com.gmtool.entity.SysRole;
import com.gmtool.service.IAuthService;
import com.gmtool.service.IMemberInfoService;
import com.gmtool.service.IOperationLogInfoService;
import com.gmtool.service.IRedisService;
import com.gmtool.util.AppUtil;
import com.gmtool.util.Const;
import com.gmtool.util.FastJsonUtils;
import com.gmtool.util.PageData;
import com.gmtool.util.StringUtils;
import com.gmtool.util.TokenUtils;
import com.gmtool.util.Tools;


@Controller("authController")
@RequestMapping("/auth")
public class AuthController extends BaseController{
	@Autowired
	private IAuthService authService;
	
	@Autowired
	private IRedisService redisService;
	
	@Autowired
	private IMemberInfoService memberInfoService;
	
	@Autowired
	private IOperationLogInfoService operationLogInfoService;
	
	@RequestMapping(value="/group-list")
	@ResponseBody
	public Object groupList(){
		logBefore(logger, "group add");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			List<SysRole> sysRoleList = authService.listSysRole(pd);
			map.put("sysRoleList", sysRoleList);
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		
		return AppUtil.returnObject(pd, map);
	}

	@RequestMapping(value="/group-detail")
	@ResponseBody
	public Object groupDetail(){
		logBefore(logger, "group detail");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			SysRole role = authService.sysRoleDetail(pd);
			map.put("role", role);
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		
		return AppUtil.returnObject(pd, map);
	}
	
	@RequestMapping(value="/group-edit")
	@ResponseBody
	public Object groupEdit(){
		logBefore(logger, "group edit");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			String menuIds = pd.getString("menuIds");
			String id = pd.getString("id");
			String groupName = pd.getString("groupName");
			String groupStatus = pd.getString("groupStatus");
			String interfaces = pd.getString("interfaces");
			if(Tools.isEmpty(id) || Tools.isEmpty(groupName) || Tools.isEmpty(menuIds)|| Tools.isEmpty(groupStatus)){
				map.put("result", 1);
				map.put("msg", "缺少参数");
				return AppUtil.returnObject(pd, map);
			}
			
			authService.updateRole(pd);
			
			redisService.set(Const.REDIS_SYS_ROLE, authService.listSysRole(null));
			
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		
		return AppUtil.returnObject(pd, map);
	}
	
	@RequestMapping(value="/group-delete")
	@ResponseBody
	public Object groupDelete(){
		logBefore(logger, "group delete");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			String id = pd.getString("id");
			if(Tools.isEmpty(id)){
				map.put("result", 1);
				map.put("msg", "缺少参数");
				return AppUtil.returnObject(pd, map);
			}
			authService.deleteRole(pd);
			redisService.set(Const.REDIS_SYS_ROLE, authService.listSysRole(null));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}
		return AppUtil.returnObject(pd, map);
	}
	
	@RequestMapping(value="/group-add")
	@ResponseBody
	public Object groupAdd(){
		logBefore(logger, "group add");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();

		try {
			pd = this.getPageData();

			String menuIds = pd.getString("menuIds");
			String groupStatus = pd.getString("groupStatus");
			String groupName = pd.getString("groupName");
			if(Tools.isEmpty(menuIds) || Tools.isEmpty(groupStatus)|| Tools.isEmpty(groupName)){
				map.put("result", 1);
				map.put("msg", "缺少参数");
				return AppUtil.returnObject(pd, map);
			}
			if (!authService.addRightsGroup(menuIds, groupStatus, groupName)) {
				map.put("result", 1);
				map.put("msg", "内部错误");
				return AppUtil.returnObject(pd, map);
			}
			redisService.set(Const.REDIS_SYS_ROLE, authService.listSysRole(null));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		
		return AppUtil.returnObject(pd, map);
	}
	
	@RequestMapping(value="/group-member")
	@ResponseBody
	public Object groupMember(){
		logBefore(logger, "group member");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			String id = pd.getString("id");
			if(Tools.isEmpty(id)){
				map.put("result", 1);
				map.put("msg", "缺少参数");
				return AppUtil.returnObject(pd, map);
			}
			map = authService.sysRoleMemberDetail(pd);
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		
		return AppUtil.returnObject(pd, map);
	}
	
	@RequestMapping(value="/group-member-edit")
	@ResponseBody	
	public Object groupMemberEdit(){
		logBefore(logger, "group member edit");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			String id = pd.getString("id");
			String mUids = pd.getString("mUids");
			if(Tools.isEmpty(id)){
				map.put("result", 1);
				map.put("msg", "缺少参数");
				return AppUtil.returnObject(pd, map);
			}
			
			authService.editRoleMember(pd);
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		
		return AppUtil.returnObject(pd, map);
	}
	
	@RequestMapping(value="/admin-list")
	@ResponseBody
	public Object adminList(){
		logBefore(logger, "admin list");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			
			map.put("members", memberInfoService.listAllMember(pd));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}
		return AppUtil.returnObject(pd, map);
	}
	
	@RequestMapping(value="/admin-add")
	@ResponseBody
	public Object adminAdd(){
		logBefore(logger, "admin add");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			String uid = pd.getString("uid");
			String name = pd.getString("name");
			String password = pd.getString("password");
			String email = pd.getString("email");
			String mobile = pd.getString("mobile");
			String authRoleId = pd.getString("authRoleId");
			
			if(Tools.isEmpty(name) || Tools.isEmpty(password)){
				map.put("result", 1);
				map.put("msg", "缺少参数");
				return AppUtil.returnObject(pd, map);
			}
			if(Tools.isEmpty(authRoleId)){
				pd.put("authRoleId", 0);
			}
			
			pd.put("password", TokenUtils.geTokenMd5Des(password));
			memberInfoService.addMember(pd);
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}
		return AppUtil.returnObject(pd, map);
	}
	
	@RequestMapping(value="/admin-delete")
	@ResponseBody
	public Object adminDelete(){
		logBefore(logger, "admin add");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			String uid = pd.getString("uid");
			if(Tools.isEmpty(uid)){
				map.put("result", 1);
				map.put("msg", "缺少参数");
				return AppUtil.returnObject(pd, map);
			}
			memberInfoService.deleteMember(pd);
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}
		return AppUtil.returnObject(pd, map);
	}
	
	@RequestMapping(value="/admin-edit")
	@ResponseBody
	public Object adminEdit(){
		logBefore(logger, "admin edit");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			String uid = pd.getString("uid");
			if(Tools.isEmpty(uid)){
				map.put("result", 1);
				map.put("msg", "缺少参数");
				return AppUtil.returnObject(pd, map);
			}
			String password = pd.getString("password");
			String rptpassword = pd.getString("rptpassword");
			if((Tools.isEmpty(password) && !Tools.isEmpty(rptpassword)) ||
					(!Tools.isEmpty(password) && Tools.isEmpty(rptpassword))){
				map.put("result", 1);
				map.put("msg", "缺少密码参数");
				if ((password.length() <6 || password.length() >20) || !password.equals(rptpassword)) {
					map.put("msg", "密码不对应或者格式不对");
				}
				return AppUtil.returnObject(pd, map);
			}
			memberInfoService.updateMember(pd);
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}
		return AppUtil.returnObject(pd, map);
	}
	
	@RequestMapping(value="/log-all")
	@ResponseBody
	public Object logAll(){
		logBefore(logger, "log all");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			List<Map> list = operationLogInfoService.selectAll(pd);
			for(Map log: list){
				String p = (String)log.get("params");
				List params = StringUtils.isEmpty(p)? new ArrayList<>() :FastJsonUtils.convertJSONString2Object(p, List.class);
				log.put("params",params);
			}
			map.put("logHist", list);
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}
		return AppUtil.returnObject(pd, map);
	}
	
	@RequestMapping(value="/log-my")
	@ResponseBody
	public Object logMy(){
		logBefore(logger, "log my");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			HttpServletRequest request = this.getRequest();
			pd.put("name", request.getAttribute("name"));
			pd.put("authRoleId", request.getAttribute("authRoleId"));
			List<Map> list = operationLogInfoService.selectAll(pd);
			for(Map log: list){
				String p = (String)log.get("params");
				List params = StringUtils.isEmpty(p)? new ArrayList<>() :FastJsonUtils.convertJSONString2Object(p, List.class);
				log.put("params",params);
			}
			map.put("logHist", list);
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}
		return AppUtil.returnObject(pd, map);
	}	
}
