package com.project.salessaive.userservice;

import java.util.Map;

import com.project.salessaive.userEntity.Users;

public interface OrderService {
	
	public Map<String,Object> getOrdersForUser(Users user);

}
