package com.project.salessaive.userserviceimpl;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.salessaive.userEntity.Users;
import com.project.salessaive.userRepository.UserRepository;
import com.project.salessaive.userservice.UserService;
@Service
public class UserServiceImpl implements UserService{

	UserRepository repository;
	BCryptPasswordEncoder passwordEncoder;
	
	
	
	public UserServiceImpl(UserRepository repository) {
		super();
		this.repository = repository;
		this.passwordEncoder = new BCryptPasswordEncoder();
	}



	@Override
	public Users registered(Users users) {
		// TODO Auto-generated method stub
		if(repository.findByUsername(users.getUsername()).isPresent()) {
			throw new RuntimeException("Username is already taken");
		}
		
		if(repository.findByEmail(users.getEmail()).isPresent()) {
			throw new RuntimeException("Email is already registered");
		}
		
		users.setPassword(passwordEncoder.encode(users.getPassword()));
		
		
		return repository.save(users);
	}

}
