package com.gmtool.service.impl;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.gmtool.dao.MemberInfoMapper;
import com.gmtool.entity.TokenModel;
import com.gmtool.service.IMemberInfoService;
import com.gmtool.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gmtool.dao.AuthMapper;
import com.gmtool.dao.ConfigMapper;
import com.gmtool.entity.Member;
import com.gmtool.entity.SysMenu;
import com.gmtool.entity.SysRole;
import com.gmtool.service.IAuthService;
import com.gmtool.service.IRedisService;

@Service("authService")
public class AuthServiceImpl implements IAuthService {
	@Autowired
	private AuthMapper authMapper;
	
	@Autowired
	private ConfigMapper configMapper;
	
	@Autowired
	private MemberInfoMapper memberInfoMapper;
	
	@Autowired
	private IRedisService redisService;


	@Override
	public List<SysRole> listSysRole(PageData pd) {
		List<SysRole> sysRoleList = new ArrayList<SysRole>();
		try {
			sysRoleList = authMapper.findSysRole(pd);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return sysRoleList;
	}

	@Override
	public SysRole sysRoleDetail(PageData pd) {
		// TODO Auto-generated method stub
		List<SysRole> sysRoleList = new ArrayList<SysRole>();
		SysRole role = new SysRole();
		try {
			List<SysMenu> allMenus = configMapper.findSysMenu(pd);
			sysRoleList = authMapper.findSysRole(pd);
			if (sysRoleList.size() == 1 ) {
				role = sysRoleList.get(0);
				if (Tools.notEmpty(role.getRights())) {
					String readableRights = "";
					for(SysMenu menu : allMenus){
						if (RightsHelper.testRights(role.getRights(), (int)menu.getId())){
							readableRights += (menu.getId()+",");
						}
					}
					System.out.println(readableRights);
					role.setReadableRights(readableRights);
				}
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return role;
	}

	@Override
	public Map sysRoleMemberDetail(PageData pd) {
		// TODO Auto-generated method stub
		Map<String, Object> returnMap = new HashMap<String, Object>();
		try {
			List<Member> allMembers = memberInfoMapper.selectAllMember();
			List<Member> freeMembers = memberInfoMapper.selectFreeMember();
			List<SysRole> sysRoleList = authMapper.findSysRole(pd);
			if (sysRoleList.size() == 1 ) {
				SysRole role = sysRoleList.get(0);
				role.setMembers(new ArrayList<Member>());
				for (Member member: allMembers) {
					if (member.getAuthRoleId() == role.getId()) {
						role.getMembers().add(member);
					}
				}
				returnMap.put("role", role);
			}
			returnMap.put("freeMembers", freeMembers);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return returnMap;
	}

	@Override
	@Transactional
	public void updateRole(PageData pd) {
		// TODO Auto-generated method stub
		SysRole role = new SysRole();
		
		try {
			role.setId(Long.parseLong(pd.getString("id")));
			role.setRoleId(Long.parseLong(pd.getString("id")));
			role.setRoleStatus(Integer.parseInt(pd.getString("groupStatus")));
			role.setRoleName(pd.getString("groupName"));
			role.setInterfaces(pd.getString("interfaces"));
			String menuIds = pd.getString("menuIds");
			BigInteger rights = RightsHelper.sumRights(Tools.str2StrArray(menuIds));
			role.setRights(rights.toString());
			authMapper.updateRole(role);
			
			List<SysMenu> allMenus = configMapper.findSysMenu(null);
			redisService.set(Const.REDIS_SYS_MENU, allMenus);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public void editRoleMember(PageData pd) {
		// TODO Auto-generated method stub
		
		try {
			String id = pd.getString("id");
			pd.put("authRoleId", 0);
			pd.put("roleId", id);
			memberInfoMapper.updateMemberRole(pd);
			
			if (Tools.notEmpty(pd.getString("mUids"))) {
				
				String[] mUids = pd.getString("mUids").split(",");
				
				List<String> mUidArr = new ArrayList<String>();
				for(String uid: mUids) {
					mUidArr.add(uid);
				}
				pd.remove("roleId");
				pd.put("mUidArr", mUidArr);
				pd.put("authRoleId", id);
				memberInfoMapper.updateMemberRole(pd);
			}

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	@Transactional
	public void deleteRole(PageData pd) {
		// TODO Auto-generated method stub
		try {
			authMapper.deleteRoleById(pd.getString("id"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public boolean addRightsGroup(String menuIds, String groupStatus, String groupName) {
		// TODO Auto-generated method stub
		try {
			BigInteger rights = RightsHelper.sumRights(Tools.str2StrArray(menuIds));
			List<SysRole> sysRoleList = authMapper.findSysRole(null);
			Long id = 0l;
			if (sysRoleList != null && sysRoleList.size() > 0) {
				id = sysRoleList.get(0).getId();
			}
			
			PageData pd = new PageData();
			pd.put("roleName", groupName);
			sysRoleList = authMapper.findSysRole(pd);
			if (sysRoleList == null || sysRoleList.size()==0) {
				SysRole sysRole = new SysRole();
				sysRole.setId(id+1);
				sysRole.setRoleId(id+1);
				sysRole.setRoleName(groupName);
				sysRole.setRoleStatus(Integer.parseInt(groupStatus));
				sysRole.setRights(rights.toString());
				authMapper.addSysRole(sysRole);
				System.out.println(sysRole.getId());
			}else {
				return false;
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public SysRole getRoleNameByRoleId(String roleId) {
		return authMapper.getRoleNameByRoleId(roleId);
	}

	@Override
	public PageData verification(PageData pd, String token) {
		TokenModel tokenModel = ServiceHelper.getRedisService().get(token, TokenModel.class);
		SysRole sysRole = authMapper.getRoleNameByRoleId(tokenModel.getAuthRoleId().toString());
		List appIdList = new ArrayList();
		List allianceIdList = new ArrayList();
		List channelTagList = new ArrayList();
		String[] appIdSysStrs = sysRole.getAppId() == null ? new String[0] : sysRole.getAppId().split(",");
		String[] allianceIdSysStrs = sysRole.getInterfaces()== null ? new String[0] : sysRole.getInterfaces().split(",");
		String[] channelTagSysStrs = sysRole.getChannelTag() == null ? new String[0] : sysRole.getChannelTag().split(",");
		String[] a = pd.get("appId") == null ? new String[0] : pd.get("appId").toString().split(",");
		String[] b = pd.get("allianceId") == null ? new String[0] : pd.get("allianceId").toString().split(",");
		String[] c = pd.get("channelTag") == null ? new String[0] : pd.get("channelTag").toString().split(",");
		if(StringUtils.isEmpty(pd.get("appId") == null ? "" : pd.get("appId").toString())){
			if(null != sysRole.getAppId()){
				for(int i = 0 ; i < sysRole.getAppId().split(",").length ; i++){
					appIdList.add(sysRole.getAppId().split(",")[i]);
				}
			}else{
				pd.put("appId","");
			}
		}else{
			for(int j = 0 ; j < a.length; j++){
				if(0 != appIdSysStrs.length){
					for(int i = 0 ; i < appIdSysStrs.length ; i++){
						if(appIdSysStrs[i].equals(a[j])){
							appIdList.add(a[j]);
						}
					}
				}else{
					appIdList.add(a[j]);
				}
			}
			pd.put("appId",formatList(appIdList));
		}

		if(StringUtils.isEmpty(pd.get("allianceId") == null ? "" : pd.get("allianceId").toString())){
			if(null != sysRole.getInterfaces()){
				for(int i = 0 ; i < sysRole.getInterfaces().split(",").length ; i++){
					allianceIdList.add(sysRole.getInterfaces().split(",")[i]);
				}
			}else{
				pd.put("allianceId","");
			}
		}else{
			for(int j = 0 ; j < b.length; j++){
				if(0 != allianceIdSysStrs.length){
					for(int i = 0 ; i < allianceIdSysStrs.length ; i++){
						if(allianceIdSysStrs[i].equals(b[j])){
							allianceIdList.add(b[j]);
						}
					}
				}else{
					allianceIdList.add(b[j]);
				}
			}
			pd.put("allianceId",formatList(allianceIdList));
		}

		if(StringUtils.isEmpty(pd.get("channelTag") == null ? "" : pd.get("channelTag").toString())){
			if(null != sysRole.getChannelTag()){
				for(int i = 0 ; i < sysRole.getChannelTag().split(",").length ; i++){
					channelTagList.add(sysRole.getChannelTag().split(",")[i]);
				}
			}else{
				pd.put("channelTag","");
			}
		}else{
			for(int j = 0 ; j < c.length; j++){
				if(0 != channelTagSysStrs.length){
					for(int i = 0 ; i < channelTagSysStrs.length ; i++){
						if(channelTagSysStrs[i].equals(c[j])){
							channelTagList.add(c[j]);
						}
					}
				}else{
					channelTagList.add(c[j]);
				}
			}
			pd.put("channelTag",formatList(channelTagList));
		}

		return pd;
	}

	public String formatList(List<?> list) {
		StringBuilder b = new StringBuilder();
		for(Object o : list) {
			b.append(o+",");
		}
		return b.toString().length() > 0 ? b.toString().substring(0,b.length()-1) : "null";
	}


	@Override
	public SysRole findSysRoleById(Integer authRoleId, List<SysMenu> allMenus) {
		if (authRoleId == null) {
			return null;
		}
		PageData pd = new PageData();
		pd.put("id", authRoleId.toString());
		
		List<SysRole> sysRoleList = new ArrayList<SysRole>();
		try {
			sysRoleList = redisService.get(Const.REDIS_SYS_ROLE, List.class);
			if (sysRoleList == null || sysRoleList.size() == 0) {
				sysRoleList = authMapper.findSysRole(null);
				redisService.set(Const.REDIS_SYS_ROLE, sysRoleList);
			}
			
			SysRole role = null;
			for (SysRole sysRole : sysRoleList) {
				if (sysRole.getId() == Long.parseLong(pd.getString("id"))){
					role = sysRole;
				}
			}
			
			//sysRoleList = authMapper.findSysRole(pd);
			if (role == null) {
				sysRoleList = authMapper.findSysRole(null);
				redisService.set(Const.REDIS_SYS_ROLE, sysRoleList);
				return null;
			}
			//SysRole role = sysRoleList.get(0);
			if (Tools.notEmpty(role.getRights())) {
				String readableRights = "";
				for(SysMenu menu : allMenus){
					if (RightsHelper.testRights(role.getRights(), (int)menu.getId())){
						readableRights += (menu.getId()+",");
					}
				}
				System.out.println(readableRights);
				role.setReadableRights(readableRights);
			}
			return role;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return null;
	}

}
