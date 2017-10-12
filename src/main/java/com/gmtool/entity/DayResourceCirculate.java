package com.gmtool.entity;

import java.io.Serializable;
import java.sql.Timestamp;

public class DayResourceCirculate implements Serializable{
	
	private Long id;
	private String dateInfo;
	private String containerName;
	private String channel;
	private String channelTag;
	private String userType;
	private String category;
	private Long resourceHold;
	private Long resourceIn;
	private Long resourceOut;
	private Timestamp createTime;
	private Timestamp updateTime;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getDateInfo() {
		return dateInfo;
	}
	public void setDateInfo(String dateInfo) {
		this.dateInfo = dateInfo;
	}
	public String getContainerName() {
		return containerName;
	}
	public void setContainerName(String containerName) {
		this.containerName = containerName;
	}
	public String getChannel() {
		return channel;
	}
	public void setChannel(String channel) {
		this.channel = channel;
	}
	public String getChannelTag() {
		return channelTag;
	}
	public void setChannelTag(String channelTag) {
		this.channelTag = channelTag;
	}
	public String getUserType() {
		return userType;
	}
	public void setUserType(String userType) {
		this.userType = userType;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public Long getResourceHold() {
		return resourceHold;
	}
	public void setResourceHold(Long resourceHold) {
		this.resourceHold = resourceHold;
	}
	public Long getResourceIn() {
		return resourceIn;
	}
	public void setResourceIn(Long resourceIn) {
		this.resourceIn = resourceIn;
	}
	public Long getResourceOut() {
		return resourceOut;
	}
	public void setResourceOut(Long resourceOut) {
		this.resourceOut = resourceOut;
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
