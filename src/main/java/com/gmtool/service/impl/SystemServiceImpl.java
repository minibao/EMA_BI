package com.gmtool.service.impl;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;





import com.gmtool.dao.ConfigMapper;
import com.gmtool.entity.Dictionary;
import com.gmtool.entity.SysMenu;
import com.gmtool.entity.SysRole;
import com.gmtool.entity.TokenModel;
import com.gmtool.service.IAuthService;
import com.gmtool.service.IMemberInfoService;
import com.gmtool.service.IRedisService;
import com.gmtool.service.ISystemService;
import com.gmtool.util.Const;
import com.gmtool.util.FastJsonUtils;
import com.gmtool.util.PageData;
import com.gmtool.util.RightsHelper;
import com.gmtool.util.ServiceHelper;
import com.gmtool.util.StringUtil;

@Service("systemService")
public class SystemServiceImpl implements ISystemService {
	
	@Autowired
	private IAuthService authService;
	@Autowired
	private ConfigMapper configMapper;
	@Autowired
	private IRedisService redisService;
	@Autowired
	private IMemberInfoService memberInfoService;

	
	private List<SysMenu> sysMenuList;
	
	public Map<String, Object> loadDictionaryData(PageData pd) {
		
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			SysMenu sysMenu = new SysMenu();
			BigInteger rights=getRights(pd);
			if (rights == null)
				return map;
			sysMenuList = configMapper.findSysMenu(null); //this.loadAllSysMenu();//
			sysMenu = sysMenuList.get(0);//root
			genSysMenu(sysMenu, 0,rights,pd);// generate system menu
			map.put("sysMenus", sysMenu);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return map;
	}
	
	private void genSysMenu(SysMenu sysMenu, long root,BigInteger rights,PageData pd){
		for (SysMenu menu: sysMenuList) {
			if(RightsHelper.testRights(rights, (int)menu.getId()) || rights.equals(BigInteger.ZERO)){
				if (menu.getMenuId() == root) {
					menu.setMenuName(12l == menu.getMenuId() ? getRoleNameByRoleId(pd.get("roleId").toString()).split("-")[0] : menu.getMenuName());
					sysMenu = menu;
				}else if (menu.getParentId() == sysMenu.getMenuId()){
					if (sysMenu.getSubMenus() == null) {
						sysMenu.setSubMenus(new ArrayList<SysMenu>());
					}
					genSysMenu(menu, menu.getMenuId(),rights,pd);
					sysMenu.getSubMenus().add(menu);
				}
			}
		}
	}
	
	private BigInteger getRights(PageData pd){
		if(StringUtil.isEmpty(pd.getString("token"))){
			return null;
		}
		String token = pd.getString("token");
		TokenModel tokenModel = redisService.get(token, TokenModel.class);
		pd.put("roleId",tokenModel.getAuthRoleId());
		List<SysRole> roleList= authService.listSysRole(pd);
		if(tokenModel.getAuthRoleId() == 1 || tokenModel.getAuthRoleId() == 5 ){
			return BigInteger.ZERO;
		}
		BigInteger rights=new BigInteger(roleList.get(0).getRights());
		return rights;
		
	}
	
	
    public List<Map> loadContainerInfo(PageData pd) {
        
        //Map<String,Object> map = new HashMap<String,Object>();
        List<Map> containerInfo= new ArrayList<Map>();
        try {
        	String token = pd.getString("token");
        	TokenModel tokenModel = ServiceHelper.getRedisService().get(token, TokenModel.class);
        	SysRole sysRole = memberInfoService.getInterfaces(tokenModel.getAuthRoleId() == null ? 0 : tokenModel.getAuthRoleId());
        	if(null == sysRole){
        		return null;
        	}
        	List<String> res = configMapper.findContainerInfo(pd);
        	if(null == sysRole.getInterfaces() || "".equals(sysRole.getInterfaces())){
        		for (String str : res)
                {
                    containerInfo.add(FastJsonUtils.convertJSONString2Object(str, Map.class));
                }
        	}else{
        		Map map = null;
        		List<Map> list = null;
        		for (String str : res)
                {
        			map = FastJsonUtils.convertJSONString2Object(str, Map.class);
        			for(int i = 0; i < ((List<Map>) map.get("channelData")).size() ; i++){
        				if(!sysRole.getInterfaces().contains(((List<Map>) map.get("channelData")).get(i).get("chnValue") == null ? "" : ((List<Map>) map.get("channelData")).get(i).get("chnValue").toString())){
        					((List<Map>) map.get("channelData")).remove(i);
        				}
        			}
        			containerInfo.add(map);
                }
        	}
            //map.put("containerInfo", containerInfo);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return containerInfo;
    }
    
    public Map<String, Object> loadDictResource(PageData pd) {
        
        Map<String,Object> map = new HashMap<String,Object>();
        try {
            List<Dictionary> resource = configMapper.findDictResource(pd);
            
            map.put("resource", resource);       
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return map;
    }

	@Override
	public List<SysMenu> loadAllSysMenu() {
		// TODO Auto-generated method stub
		List<SysMenu> allMenus = new ArrayList<SysMenu>();
		try {
			allMenus = redisService.get(Const.REDIS_SYS_MENU, List.class);
			// allMenus = configDao.findSysMenu(null);
			//redisService.set(Const.REDIS_SYS_MENU, allMenus);
			if (allMenus == null|| allMenus.size() == 0) {
				allMenus = configMapper.findSysMenu(null);
				redisService.set(Const.REDIS_SYS_MENU, allMenus);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return allMenus;
	}


	private String getRoleNameByRoleId(String roleId){
        SysRole sysRole = authService.getRoleNameByRoleId(roleId);
		return sysRole.getRoleName();
	}
	
	
	
}
