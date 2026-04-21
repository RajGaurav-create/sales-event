package com.project.salessaive.admin.service;

import com.project.salessaive.userEntity.Users;

public interface AdminUserService {

	public Users modifyUser(int userId, String username, String email, String role);
	
	public Users getUserById(int userId);
}
