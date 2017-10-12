package com.gmtool.service.impl;

import java.util.ArrayList;
import java.util.List;

import com.gmtool.dao.MemberInfoMapper;
import com.gmtool.service.IAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmtool.entity.Member;
import com.gmtool.entity.SysRole;
import com.gmtool.entity.TokenModel;
import com.gmtool.service.IMemberInfoService;
import com.gmtool.service.IRedisService;
import com.gmtool.util.PageData;
import com.gmtool.util.ServiceHelper;
import com.gmtool.util.StringUtil;
import com.gmtool.util.TokenUtils;
import com.gmtool.util.Tools;
import com.google.common.base.Preconditions;

@Service("memberInfoService")
public class MemberInfoServiceImpl implements IMemberInfoService {
	@Autowired
	private MemberInfoMapper memberInfoMapper;
    @Autowired
    private IRedisService redisService;
	@Autowired
	private IAuthService authService;
	
	@Override
	public TokenModel login(String name,String password){
		String md5pssword = TokenUtils.geTokenMd5Des(password); 
		TokenModel tokenModel = new TokenModel();
		Member member = new Member();
		try {
			PageData pd = new PageData();
			pd.put("name", name);
			pd.put("password", md5pssword);
			member = memberInfoMapper.selectByName(pd);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(member != null){
	        String sourceStr = String.valueOf(member.getName() + member.getUid()) + "," + member.getCreateTime() + "," + Math.round(Math.random() * 899999 + 100000);
	        String token = TokenUtils.geTokenMd5Des(sourceStr);
			tokenModel.setName(name);
			tokenModel.setAuthRoleId(member.getAuthRoleId());
			tokenModel.setToken(token);
			PageData query = new PageData();
			query.put("id", member.getAuthRoleId() + "");
			SysRole sysRole = authService.sysRoleDetail(query);
			tokenModel.setAccessMenus(sysRole.getReadableRights());
			redisService.set(token,tokenModel);
		}else{
			throw new RuntimeException("输入账号密码错误");
		}
		return tokenModel;
	}

	@Override
	public Boolean checkLogin(String name,String token){
		Boolean flag = redisService.exists(token);
		if(name != null && token != null){
			if(redisService.exists(token)){
				TokenModel tokenModel = redisService.get(token, TokenModel.class);
				flag = name.equals(tokenModel.getName());
			}
		}
	
		return flag;
	}
	
	@Override
	public boolean modifyPwd(String token, String oldPwd, String pwd) throws Exception{
        Preconditions.checkArgument(StringUtil.isNotEmpty(token), "token不能为空");
        Preconditions.checkArgument(StringUtil.isNotEmpty(oldPwd), "原始密码不能为空");
        Preconditions.checkArgument(StringUtil.isNotEmpty(pwd), "新密码不能为空");
        boolean flag = false;
        try{
            TokenModel tokenModel = redisService.get(token, TokenModel.class);
    		String oldpassword = TokenUtils.geTokenMd5Des(oldPwd); 
    		String password = TokenUtils.geTokenMd5Des(pwd); 
    		PageData pd = new PageData();
    		pd.put("password", oldpassword);
    		pd.put("name", tokenModel.getName());
            Member 	member = memberInfoMapper.selectByName(pd);
            Preconditions.checkArgument(member != null, "原始密码错误");
            Preconditions.checkArgument(oldpassword.equals(member.getPassword()), "原始密码错误");
            pd.put("password",password);
            pd.put("uid",member.getUid());
            flag = memberInfoMapper.updateBasicInfo(pd);
        }catch (Exception e) {
			e.printStackTrace();
		}

        return flag;
	}

	@Override
	public List<Member> listAllMember(PageData pd) {
		// TODO Auto-generated method stub
		List<Member> members = new ArrayList<Member>();
		try {
			members = memberInfoMapper.listAllMember(pd);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return members;
	}

	@Override
	public void addMember(PageData pd) {
		// TODO Auto-generated method stub
		try {
			memberInfoMapper.addMember(pd);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public void deleteMember(PageData pd) {
		// TODO Auto-generated method stub
		try {
			memberInfoMapper.deleteMember(pd);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
	}

	@Override
	public void updateMember(PageData pd) {
		// TODO Auto-generated method stub
		try {
			if (!Tools.isEmpty(pd.getString("password"))) {
				String pwd = pd.getString("password");
				String password = TokenUtils.geTokenMd5Des(pwd);
				pd.put("password", password);
			}
			memberInfoMapper.updateBasicInfo(pd);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
	}

	@Override
	public SysRole getInterfaces(int i) throws Exception {
		// TODO Auto-generated method stub
		return memberInfoMapper.getInterfaces(i);
	}

	@Override
	public SysRole getSysRole(String token) throws Exception {
		// TODO Auto-generated method stub
    	TokenModel tokenModel = ServiceHelper.getRedisService().get(token, TokenModel.class);
		return getInterfaces(tokenModel.getAuthRoleId() == null ? 0 : tokenModel.getAuthRoleId());
	}

	@Override
	public String[] getRoles(String token, String channel) throws Exception {
		// TODO Auto-generated method stub
		String[] channelList = null;
		TokenModel tokenModel = ServiceHelper.getRedisService().get(token, TokenModel.class);
		SysRole sysRole = getInterfaces(tokenModel.getAuthRoleId() == null ? 0 : tokenModel.getAuthRoleId());
		
		if(null == sysRole){
	          throw new Exception("权限不足，请联系管理员");
		}else{
		    if(sysRole.getInterfaces() == null || "".equals(sysRole.getInterfaces())){
		        return null;
		    }else if(!sysRole.getInterfaces().contains(channel == null || channel == ""? channel = sysRole.getInterfaces() : channel)){
		          throw new Exception("权限不足，请联系管理员");
		    }else{
	              if(null != channel || !"".equals(channel)){
	                    channelList = channel.split(",");
	                }
	                return channelList;
		    }
		}
		
	}
	
	
}
