package com.gmtool.entity;

import java.util.Date;

public class OperationLogInfo {

	private String authRoleId;
	private String name;
	private String path;
	private String ip;
	private Date time;
	private String params;
	
	
	public String getAuthRoleId() {
		return authRoleId;
	}
	public void setAuthRoleId(String authRoleId) {
		this.authRoleId = authRoleId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public Date getTime() {
		return time;
	}
	public void setTime(Date time) {
		this.time = time;
	}
	public String getParams() {
		return params;
	}
	public void setParams(String params) {
		this.params = params;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}

	
}
