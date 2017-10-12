package com.gmtool.entity;

import java.io.Serializable;
import java.sql.Timestamp;

public class Member implements Serializable{
	
	private Long uid;
	private String name;
	private String password;
	private String email;
	private String mobile;
	private Integer authRoleId;
	private String roleName;
	private Timestamp createTime;
	private Timestamp updateTime;
	public Long getUid() {
		return uid;
	}
	public void setUid(Long uid) {
		this.uid = uid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String passward) {
		this.password = passward;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public Integer getAuthRoleId() {
		return authRoleId;
	}
	public void setAuthRoleId(Integer authRoleId) {
		this.authRoleId = authRoleId;
	}
	public Timestamp getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}
	public Timestamp getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Timestamp updateTime) {
		this.updateTime = updateTime;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	
	
	
	
}