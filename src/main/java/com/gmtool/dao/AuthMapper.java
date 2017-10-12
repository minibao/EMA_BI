package com.gmtool.dao;

import java.util.List;

import com.gmtool.entity.SysRole;
import com.gmtool.util.PageData;

public interface AuthMapper {
	
	 List<SysRole> findSysRole(PageData pd) throws Exception;
	
	 void addSysRole(SysRole sysRole) throws Exception;
	
	 void updateRole(SysRole sysRole) throws Exception;
	
	 void deleteRoleById(String id) throws Exception;

	SysRole getRoleNameByRoleId(String roleId);
}
