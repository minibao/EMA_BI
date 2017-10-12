package com.gmtool.entity;

import java.io.Serializable;
//import java.util.Date;

public class UserMission implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -1796129241409127771L;
	
	private String dateInfo;
	private String containerName;
	private String channel;
	private String channelTag;
	private String vocation;
	private String isRetain;
	private String isPay;
	private String mission;
	private Long num;

	public String getDateInfo() { return dateInfo; }
	public void setDateInfo(String dateInfo) { this.dateInfo = dateInfo; }
	
	public String getContainerName() { return containerName; }
	public void setContainerName(String containerName) { this.containerName = containerName; }
	
	public String getChannel() { return channel; }
	public void setChannel(String channel) { this.channel = channel; }

	public String getChannelTag() { return channelTag; }
	public void setChannelTag(String channelTag) { this.channelTag = channelTag; }
	
	public String getIsRetain() { return isRetain; }
	public void setIsRetain(String isRetain) { this.isRetain = isRetain; }
	
	public String getIsPay() { return isPay; }
    public void setIsPay(String isPay) { this.isPay = isPay; }
	
	public String getVocation() { return vocation; }
    public void setVocation(String vocation) { this.vocation = vocation; }
	
	public String getMission() { return mission; }
	public void setMission(String mission) { this.mission = mission; }
	
	public Long getNum() { return num; }
	public void setNum(Long num) { this.num = num; }

}
