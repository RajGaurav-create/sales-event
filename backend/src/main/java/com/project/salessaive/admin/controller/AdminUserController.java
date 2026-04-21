package com.project.salessaive.admin.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.salessaive.admin.service.AdminUserService;
import com.project.salessaive.userEntity.Users;

@RestController
@RequestMapping("/admin/user")
public class AdminUserController {

	private final AdminUserService adminUserService;

	public AdminUserController(AdminUserService adminUserService) {
		super();
		this.adminUserService = adminUserService;
	}
	
	@PutMapping("/modify")
	public ResponseEntity<?> modifyUser(@RequestBody Map<String,Object> request){
		try {
			int userId = (int) request.get("userId");
			String username = (String) request.get("username");
			String email = (String) request.get("email");
			String role = (String) request.get("role");
			Users updatedUser = adminUserService.modifyUser(userId, username, email, role);
			
			Map<String,Object> response = new HashMap<>();
			response.put("userId", updatedUser.getUserId());
			response.put("username", updatedUser.getUsername());
			response.put("email", updatedUser.getEmail());
			response.put("role", updatedUser.getRole().name());
			response.put("createdAt", updatedUser.getCreatedAt());
			response.put("updatedAt", updatedUser.getUpdateAt());
			return ResponseEntity.status(HttpStatus.OK).body(response);
		}catch(IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Request went wrong");
		}
	}
	
	@GetMapping("/{userId}")
	public ResponseEntity<?> getUserById(@PathVariable Integer userId){
	   try {
		   
		   Users user = adminUserService.getUserById(userId);
		   return ResponseEntity.status(HttpStatus.OK).body(user);
	   } catch(IllegalArgumentException e) {
		   return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
	   }catch(Exception e) {
		   return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Request went wrong");
	   }
	}
}
