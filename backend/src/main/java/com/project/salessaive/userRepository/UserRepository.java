package com.project.salessaive.userRepository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.salessaive.userEntity.Users;
@Repository
public interface UserRepository extends JpaRepository<Users,Integer> {
    
	   Optional<Users> findByEmail(String email);
	   Optional<Users> findByUsername(String username);
	
}
