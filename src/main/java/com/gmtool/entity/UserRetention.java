package com.gmtool.entity;

import java.io.Serializable;
//import java.util.Date;

public class UserRetention implements Serializable{
	


	/**
	 * 
	 */
	private static final long serialVersionUID = -1796129241409127771L;
	
	private String dateInfo;
	private String containerName;
	private String channel;
	private String channelTag;
	private Long reDay;
	private Long reNum;
	private Long newRole;
	private Double rePercent;
	
	
	public String getDateInfo() {
		return dateInfo;
	}
	public void setDateInfo(String dateInfo) {
		this.dateInfo = dateInfo;
	}

	public Long getReDay() {
		return reDay;
	}
	public void setReDay(Long reDay) {
		this.reDay = reDay;
	}
	public Long getReNum() {
		return reNum;
	}
	public void setReNum(Long reNum) {
		this.reNum = reNum;
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
	
	public Long getNewRole() {
		return newRole;
	}
	public void setNewRole(Long newRole) {
		this.newRole = newRole;
	}
	public Double getRePercent() {
		return rePercent;
	}
	public void setRePercent(Double rePercent) {
		this.rePercent = rePercent;
	}

}
