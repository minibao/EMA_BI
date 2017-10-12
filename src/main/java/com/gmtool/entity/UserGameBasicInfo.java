package com.gmtool.entity;

import java.io.Serializable;
import java.sql.Timestamp;

public class UserGameBasicInfo  implements Serializable{
	
	private Long id;
	private Long roleId;
	private String channelTag;
	private String channel;
	private String containerName;
	private Long vocation;
	private Long lv;
	private String isRetain;
	private String isPay;
	private String roleCreateTime;
	private Timestamp createTime;
	private Timestamp updateTime;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getRoleId() {
		return roleId;
	}
	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}
	public String getChannelTag() {
		return channelTag;
	}
	public void setChannelTag(String channelTag) {
		this.channelTag = channelTag;
	}
	public String getChannel() {
		return channel;
	}
	public void setChannel(String channel) {
		this.channel = channel;
	}
	public String getContainerName() {
		return containerName;
	}
	public void setContainerName(String containerName) {
		this.containerName = containerName;
	}
	public Long getVocation() {
		return vocation;
	}
	public void setVocation(Long vocation) {
		this.vocation = vocation;
	}
	public Long getLv() {
		return lv;
	}
	public void setLv(Long lv) {
		this.lv = lv;
	}
	public String getIsRetain() {
		return isRetain;
	}
	public void setIsRetain(String isRetain) {
		this.isRetain = isRetain;
	}
	public String getIsPay() {
		return isPay;
	}
	public void setIsPay(String isPay) {
		this.isPay = isPay;
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
	
	
	

}
