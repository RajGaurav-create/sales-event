package com.project.salessaive.usercontroller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.salessaive.userEntity.LoginRequest;
import com.project.salessaive.userEntity.Users;
import com.project.salessaive.userservice.AuthServiceContract;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
@RestController
@CrossOrigin(origins="http://localhost:5173",allowCredentials="true")
@RequestMapping("/api/auth")
public class AuthController {

	private final AuthServiceContract authService;

	public AuthController(AuthServiceContract authService) {
		super();
		this.authService = authService;
	}
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response){
		try {
			Users user = authService.authenticate(loginRequest.getUsername(),loginRequest.getPassword());
			String token = authService.generateToken(user);
			ResponseCookie cookie = ResponseCookie.from("authToken", token).httpOnly(true).path("/").secure(true)
					                .maxAge(3600).sameSite("None").build();
			response.addHeader("Set-Cookie", cookie.toString());
			
			
			Map<String,Object> responceBody = new HashMap<>();
			responceBody.put("message", "Login successful");
			responceBody.put("role", user.getRole().name());
			responceBody.put("username", user.getUsername());
			
		return ResponseEntity.ok(responceBody);
		}catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error",e.getMessage()));
		}
	}
	
	@PostMapping("/logout")
	public ResponseEntity<Map<String,String>> logout(HttpServletRequest request, HttpServletResponse response){
		try {
			Users user = (Users) request.getAttribute("authenticatedUser");
			authService.logout(user);
			
			Cookie cookie = new Cookie("authToken",null);
			cookie.setHttpOnly(true);
			cookie.setMaxAge(0);
			cookie.setPath("/");
			response.addCookie(cookie);
			
			Map<String,String> responseBody = new HashMap<>();
			responseBody.put("message", "Logout successful");
			return ResponseEntity.ok(responseBody);
		} catch(RuntimeException e) {
			Map<String,String> errorResponse = new HashMap<>();
			errorResponse.put("message", "Logout Failed");
			return ResponseEntity.status(500).body(errorResponse);
		}
	}
}
