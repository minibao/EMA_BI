package com.gmtool.entity;

import java.io.Serializable;

/**
 * User: Karl
 * Date: 2016/7/18
 * Time: 17:53
 */
public class TokenModel implements Serializable {
    private static final long serialVersionUID = 23235566245677832L;
    private String token;//用户编号
    private String name;//token
    private Integer authRoleId; //APP_ID
    private String accessMenus;

    public TokenModel() {super();

    }

    public TokenModel(String token,String name,Integer authRoleId) {
    	super();
        this.token = token;
		this.name = name;
		this.authRoleId = authRoleId;
		this.accessMenus = null;
    }

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getAuthRoleId() {
		return authRoleId;
	}

	public void setAuthRoleId(Integer authRoleId) {
		this.authRoleId = authRoleId;
	}

	public String getAccessMenus() {
		return accessMenus;
	}

	public void setAccessMenus(String accessMenus) {
		this.accessMenus = accessMenus;
	}

  
    
    
}
