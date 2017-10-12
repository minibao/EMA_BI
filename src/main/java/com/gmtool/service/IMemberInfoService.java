package com.gmtool.service;

import java.util.List;

import com.gmtool.entity.Member;
import com.gmtool.entity.SysRole;
import com.gmtool.entity.TokenModel;
import com.gmtool.util.PageData;

public interface IMemberInfoService {
	
	TokenModel login(String name,String password);

	Boolean checkLogin(String name,String token);
	
    boolean modifyPwd(String token, String oldPwd, String pwd) throws Exception;
    
    List<Member> listAllMember(PageData pd);
    
    public void addMember(PageData pd);
    
    public void deleteMember(PageData pd);
	
    public void updateMember(PageData pd);

	SysRole getInterfaces(int i) throws Exception;

	SysRole getSysRole(String token) throws Exception;

	String[] getRoles(String string, String channel) throws Exception;
}
