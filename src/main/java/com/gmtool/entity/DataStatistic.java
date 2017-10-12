package com.gmtool.entity;

import java.io.Serializable;
//import java.sql.Time;
//import java.sql.Timestamp;
//import java.util.Date;

public class DataStatistic implements Serializable {

	/**
	 * 每日数据
	 */
	private static final long serialVersionUID = -5723447948140903115L;
	
	private String dateInfo;
	private String containerName;
	private String channel;
	private String channelTag;
	private Long newUser;
	private Long newRole;
	private Long activeUser;
	private Long activeRole;
	private Long depositUser;
	private Long depositCnt;
	private Long depositNum;
	private Long gameTime;
	private Long gameCnt;

 
    public String getDateInfo() { return dateInfo; }
    public void setDateInfo(String dateInfo) { this.dateInfo = dateInfo; }
    
	public String getContainerName() { return containerName; }
	public void setContainerName(String containerName) { this.containerName = containerName; }
	
    public String getChannel() { return channel; }
    public void setChannel(String channel) { this.channel = channel; }
    
    public String getChannelTag() { return channelTag; }
    public void setChannelTag(String channelTag) { this.channelTag = channelTag; }
	
    public Long getNewUser() { return newUser; }
    public void setNewUser(Long newUser) { this.newUser = newUser; }
    
	public Long getNewRole() { return newRole; }
    public void setNewRole(Long newRole) { this.newRole = newRole; }
    
    public Long getActiveUser() { return activeUser; }
    public void setActiveUser(Long activeUser) { this.activeUser = activeUser; }
    
    public Long getActiveRole() { return activeRole; }
    public void setActiveRole(Long activeRole) { this.activeRole = activeRole; }
    
    public Long getDepositUser() { return depositUser; }
    public void setDepositUser(Long depositUser) { this.depositUser = depositUser; }
    
    public Long getDepositCnt() { return depositCnt; }
    public void setDepositCnt(Long depositCnt) { this.depositCnt = depositCnt; }
    
    public Long getDepositNum() { return depositNum; }
    public void setDepositNum(Long depositNum) { this.depositNum = depositNum; }
    
    public Long getGameTime() { return gameTime; }
    public void setGameTime(Long gameTime) { this.gameTime = gameTime; }
    
    public Long getGameCnt() { return gameCnt; }
    public void setGameCnt(Long gameCnt) { this.gameCnt = gameCnt; }
    
}
