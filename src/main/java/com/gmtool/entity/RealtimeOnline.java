package com.gmtool.entity;

import java.io.Serializable;
import java.sql.Timestamp;

public class RealtimeOnline implements Serializable{
	
	private String containerName;
	private String channel;
	private String dateInfo;
	private String timeInfo;
	private Long onlineNum;
	
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
	public String getDateInfo() {
		return dateInfo;
	}
	public void setDateInfo(String dateInfo) {
		this.dateInfo = dateInfo;
	}
	public String getTimeInfo() {
		return timeInfo;
	}
	public void setTimeInfo(String timeInfo) {
		this.timeInfo = timeInfo;
	}
	public Long getOnlineNum() {
		return onlineNum;
	}
	public void setOnlineNum(Long onlineNum) {
		this.onlineNum = onlineNum;
	}
}
