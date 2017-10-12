package com.gmtool.constant;

public enum LogRoutes {
	
    AUTH_GROUP_ADD( "/auth/group-add.do"),
   // AUTH_GROUP_DETAIL( "/auth/group-detail.do"),
    AUTH_GROUP_EDIT( "/auth/group-edit.do"),
    AUTH_GROUP_DELETE( "/auth/group-delete.do"),
    AUTH_GROUP_MEMBER( "/auth/group-member.do"),
    AUTH_GROUP_MEMBER_EDIT( "/auth/group-member-edit.do"),
    AUTH_ADMIN_ADD( "/auth/admin-add.do"),
    AUTH_ADMIN_EDIT( "/auth/admin-edit.do"),
    AUTH_ADMIN_DELETE( "/auth/admin-delete.do"),
    
    
    STATS_USERS_INFO_DETAILS_GM_QUIT("/hope-api/users/quit.do"),
    STATS_USERS_INFO_DETAILS_GM_MUTE("/hope-api/users/mute.do");
	

	private String url;
	
	private LogRoutes(String url) {
		this.setUrl(url);
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
}
