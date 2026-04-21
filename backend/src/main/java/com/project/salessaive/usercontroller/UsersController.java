package com.project.salessaive.usercontroller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.salessaive.userEntity.Users;
import com.project.salessaive.userservice.UserService;
@RestController
@CrossOrigin(origins="http://localhost:5173",allowCredentials="true")
@RequestMapping("/api/users")
public class UsersController {
  UserService userService;

  public UsersController(UserService userService) {
	super();
	this.userService = userService;
  }
  @PostMapping("/registered")
  public ResponseEntity<?> registerUser(@RequestBody Users user){
	  try {
		  Users registeredUser = userService.registered(user);
		  return ResponseEntity.ok(Map.of("message","Users registered successfully",
				  "users",registeredUser));
	  }catch(RuntimeException e) {
		  return ResponseEntity.badRequest().body(Map.of("error",e.getMessage()));
	  }
  }
  
  
}
