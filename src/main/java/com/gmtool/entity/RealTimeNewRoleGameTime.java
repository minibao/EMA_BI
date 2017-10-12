package com.gmtool.entity;

import java.util.Date;

public class RealTimeNewRoleGameTime {


	private Long id;

    private String dateInfo;

    private String containerName;

    private String channel;

    private String channelTag;

    private Long newRole;

    private Long gameCnt;

    private Long gameTime;


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
        this.containerName = containerName == null ? null : containerName.trim();
    }

    public String getChannel() {
        return channel;
    }

    public void setChannel(String channel) {
        this.channel = channel == null ? null : channel.trim();
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


    public Long getGameCnt() {
        return gameCnt;
    }

    public void setGameCnt(Long gameCnt) {
        this.gameCnt = gameCnt;
    }

    public Long getGameTime() {
        return gameTime;
    }

    public void setGameTime(Long gameTime) {
        this.gameTime = gameTime;
    }

}