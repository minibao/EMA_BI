package com.gmtool.service;

import java.util.List;

import com.gmtool.entity.User;

public interface IUserService {
	
	public void insertUser(String nickname) throws Exception;
	
	public List<User> findAllUser() throws Exception;

}
