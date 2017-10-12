package com.gmtool.entity;

import java.io.Serializable;
//import java.util.Date;

public class UserLevel implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -1796129241409127771L;
	
	private String dateInfo;
	private String containerName;
	private String channel;
	private String channelTag;
	private Long vocation;
	private String isRetain;
	private String isPay;
	private Long lv;
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
	
	public Long getVocation() { return vocation; }
    public void setVocation(Long vocation) { this.vocation = vocation; }
	
	public Long getLv() { return lv; }
	public void setLv(Long lv) { this.lv = lv; }
	
	public Long getNum() { return num; }
	public void setNum(Long num) { this.num = num; }

}
