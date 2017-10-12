package com.gmtool.service;

import java.util.List;
import java.util.Map;

import com.gmtool.entity.SysMenu;
import com.gmtool.entity.SysRole;
import com.gmtool.util.PageData;

public interface IAuthService {
	
	public List<SysRole> listSysRole(PageData pd);
	
	public SysRole findSysRoleById(Integer authRoleId, List<SysMenu> allMenus);
	
	public SysRole sysRoleDetail(PageData pd);
	
	public Map sysRoleMemberDetail(PageData pd);
	
	public void updateRole(PageData pd);
	
	public void editRoleMember(PageData pd);
	
	public void deleteRole(PageData pd);

	public boolean addRightsGroup (String menuIds, String groupStatus, String groupName);

	SysRole getRoleNameByRoleId(String roleId);

	PageData verification(PageData pd1, String token);
}
