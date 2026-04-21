package com.project.salessaive.admin.service.implementations;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.project.salessaive.admin.service.AdminUserService;
import com.project.salessaive.userEntity.Role;
import com.project.salessaive.userEntity.Users;
import com.project.salessaive.userRepository.JWTTokenRepository;
import com.project.salessaive.userRepository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class AdminUserServiceImpl implements AdminUserService {
    
	private final UserRepository userRepository;
	
	private final JWTTokenRepository tokenRepository;
	
	
	
	public AdminUserServiceImpl(UserRepository userRepository, JWTTokenRepository tokenRepository) {
		super();
		this.userRepository = userRepository;
		this.tokenRepository = tokenRepository;
	}
    @Transactional
	@Override
	public Users modifyUser(int userId, String username, String email, String role) {
		// TODO Auto-generated method stub
    	Optional<Users> userOptional = userRepository.findById(userId);
    	if(userOptional.isEmpty()) {
    		throw new IllegalArgumentException("User not found");
    	}
    	Users existingUser = userOptional.get();
    	
    	if(username != null && !username.isEmpty()) {
    		existingUser.setUsername(username);
    	}
    	
    	if(email != null && !email.isEmpty()) {
    		existingUser.setEmail(email);
    	}
    	
    	if(role != null && !role.isEmpty()) {
    		try {
    			existingUser.setRole(Role.valueOf(role));
    		}catch(IllegalArgumentException e) {
    			throw new IllegalArgumentException("Invalid role: " + role);
    		}
    	}
    	
    	tokenRepository.deleteByUserId(userId);
		return userRepository.save(existingUser);
	}

	@Override
	public Users getUserById(int userId) {
		// TODO Auto-generated method stub
		return userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
	}

}
