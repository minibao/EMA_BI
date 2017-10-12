package com.gmtool.dao;

import java.util.List;

import com.gmtool.entity.User;

public interface UserMapper {
	
	public void insertUser(User user) throws Exception;	
	
	public List<User> findAllUser () throws Exception;

}
