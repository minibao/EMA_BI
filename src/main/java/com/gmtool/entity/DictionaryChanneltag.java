package com.gmtool.entity;

import java.io.Serializable;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

public class DictionaryChanneltag implements Serializable{
	
	public int id;
	
	public String channeltagName;
	
	public String channeltagValue;
	
	public Date lastTime;

	public String lastTimeStr;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getChanneltagName() {
		return channeltagName;
	}

	public void setChanneltagName(String channeltagName) {
		this.channeltagName = channeltagName;
	}

	public String getChanneltagValue() {
		return channeltagValue;
	}

	public void setChanneltagValue(String channeltagValue) {
		this.channeltagValue = channeltagValue;
	}

	public Date getLastTime() {
		return lastTime;
	}

	public void setLastTime(Date lastTime) {
		this.lastTime = lastTime;
	}

	public String getLastTimeStr() {
		return lastTimeStr;
	}

	public void setLastTimeStr(String lastTimeStr) {
		this.lastTimeStr = lastTimeStr;
	}
	
}
