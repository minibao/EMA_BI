package com.gmtool.entity;

import java.io.Serializable;
import java.sql.Timestamp;

public class ResourceInOutAmount implements Serializable{
	
    /**
     * 
     */
    private static final long serialVersionUID = -1796129241409127775L;
    
	private String dateInfo;
	private String containerName;
	private String channel;
	private String channelTag;
	private String inOutType;
	private String resourceType;
	private String category;
	private Double amount;

	public String getDateInfo() { return dateInfo; }
	public void setDateInfo(String dateInfo) { this.dateInfo = dateInfo; }
	
	public String getContainerName() { return containerName; }
	public void setContainerName(String containerName) { this.containerName = containerName; }
	
	public String getChannel() { return channel; }
	public void setChannel(String channel) { this.channel = channel; }
	
	public String getChannelTag() { return channelTag; }
	public void setChannelTag(String channelTag) { this.channelTag = channelTag; }
	
	public String getInOutType() { return inOutType; }
	public void setInOutType(String inOutType) { this.inOutType = inOutType; }
	
	public String getResourceType() { return resourceType; }
	public void setResourceType(String resourceType) { this.resourceType = resourceType; }
	
	public String getCategory() { return category; }
	public void setCategory(String category) { this.category = category; }
	
	public Double getAmount() { return amount; }
	public void setAmount(Double amount) { this.amount = amount; }

}
