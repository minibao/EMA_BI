package com.gmtool.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gmtool.dao.UserMapper;
import com.gmtool.entity.User;
import com.gmtool.service.IUserService;

@Service("userService")
public class UserServiceImpl implements IUserService {
	@Autowired
	private UserMapper userMapper;

	@Transactional
	public void insertUser(String nickname) throws Exception{
			// TODO Auto-generated method stub
			User user = new User();
			user.setNickname(nickname);
			user.setState(1);
			userMapper.insertUser(user);
			user.setState(3);
			userMapper.insertUser(user);

	}

	@Override
	public List<User> findAllUser() throws Exception {
		// TODO Auto-generated method stub
		return userMapper.findAllUser();
	}

}
