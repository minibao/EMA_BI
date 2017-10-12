package com.gmtool.entity;

import java.io.Serializable;
import java.util.List;

public class SysMenu implements Serializable{
	
	private long id;
	private long menuId;
	private String menuName;
	private String menuUrl;
	private long parentId;
	private long menuOrder;
	private String menuIcon;
	private String menuType;
	private int menuShow;
	private List<SysMenu> subMenus;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getMenuId() {
		return menuId;
	}
	public void setMenuId(long menuId) {
		this.menuId = menuId;
	}
	public String getMenuName() {
		return menuName;
	}
	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}
	public String getMenuUrl() {
		return menuUrl;
	}
	public void setMenuUrl(String menuUrl) {
		this.menuUrl = menuUrl;
	}
	public long getParentId() {
		return parentId;
	}
	public void setParentId(long parentId) {
		this.parentId = parentId;
	}
	public long getMenuOrder() {
		return menuOrder;
	}
	public void setMenuOrder(long menuOrder) {
		this.menuOrder = menuOrder;
	}
	public String getMenuIcon() {
		return menuIcon;
	}
	public void setMenuIcon(String menuIcon) {
		this.menuIcon = menuIcon;
	}
	public String getMenuType() {
		return menuType;
	}
	public void setMenuType(String menuType) {
		this.menuType = menuType;
	}
	public int getMenuShow() {
        return menuShow;
    }
    public void setMenuShow(int menuShow) {
        this.menuShow = menuShow;
    }
	public List<SysMenu> getSubMenus() {
		return subMenus;
	}
	public void setSubMenus(List<SysMenu> subMenus) {
		this.subMenus = subMenus;
	}

}
