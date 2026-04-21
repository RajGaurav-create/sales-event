package com.project.salessaive.userservice;

import com.project.salessaive.userEntity.Users;

public interface AuthServiceContract {

	public Users authenticate(String username,String password);
	
	public String generateToken(Users user);
	
	public String generateNewToken(Users user);
	
	public void saveToken(Users user,String token);
	
	public boolean validateToken(String token);
	
	public String extractUsername(String token);
	
	public void logout(Users user);
	
}
