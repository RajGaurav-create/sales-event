package com.project.salessaive.userserviceimpl;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.salessaive.userEntity.JWTToken;
import com.project.salessaive.userEntity.Users;
import com.project.salessaive.userRepository.JWTTokenRepository;
import com.project.salessaive.userRepository.UserRepository;
import com.project.salessaive.userservice.AuthServiceContract;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
@Service
public class AuthService implements AuthServiceContract {

	private final Key SIGNING_KEY;
	
	private final UserRepository userRepository;
	
	private final JWTTokenRepository tokenRepository;
	
	private final BCryptPasswordEncoder passwordEncoder;
	
	
	
	public AuthService(UserRepository userRepository, JWTTokenRepository tokenRepository,
		@Value("${jwt.secret}")	String jwtSecret) {
		super();
		this.userRepository = userRepository;
		this.tokenRepository = tokenRepository;
		this.passwordEncoder = new BCryptPasswordEncoder();
		
		if(jwtSecret.getBytes(StandardCharsets.UTF_8).length <64) {
			throw new IllegalArgumentException("JWT_SECRET in application.properties must be at least 64 bytes long for HS512.");
		}
		this.SIGNING_KEY = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
	}

	@Override
	public Users authenticate(String username, String password) {
		// TODO Auto-generated method stub
		Users user = userRepository.findByUsername(username)
				     .orElseThrow(()-> new RuntimeException("Invalid username or password"));
		
		if(!passwordEncoder.matches(password, user.getPassword())) {
			throw new RuntimeException("Invalid username or password");
		}
		return user;
	}

	@Override
	public String generateToken(Users user) {
		// TODO Auto-generated method stub
		String token;
		LocalDateTime now =  LocalDateTime.now();
		JWTToken existingToken = tokenRepository.findByUserId(user.getUserId());
		
		if(existingToken != null && now.isBefore(existingToken.getExpiresAt())) {
			token = existingToken.getToken();
		} else {
			token = generateNewToken(user);
			if(existingToken != null) {
				tokenRepository.delete(existingToken);
			}
			saveToken(user,token);
		}
		return token;
	}

	@Override
	public String generateNewToken(Users user) {
		
		return Jwts.builder()
				.setSubject(user.getUsername())
				.claim("role", user.getRole().name())
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis()+3600000))
				.signWith(SIGNING_KEY,SignatureAlgorithm.HS512)
				.compact();
	}

	@Override
	public void saveToken(Users user, String token) {
		// TODO Auto-generated method stub
		JWTToken jwtToken = new JWTToken(user,token,
				LocalDateTime.now().plusHours(1),LocalDateTime.now().plusHours(1));
		tokenRepository.save(jwtToken);
		
		
	}

	@Override
	public boolean validateToken(String token) {
		// TODO Auto-generated method stub
		 try {
			 System.err.println("Validating Token");
			 Jwts.parserBuilder()
			 .setSigningKey(SIGNING_KEY)
			 .build()
			 .parseClaimsJws(token);
			 
			 Optional<JWTToken> jwtToken = tokenRepository.findByToken(token);
			 if(jwtToken.isPresent()) {
				 System.err.println("Token Expiry: "+ jwtToken.get().getExpiresAt());
				 System.err.println("Current Time: "+ LocalDateTime.now());
				 return jwtToken.get().getExpiresAt().isAfter(LocalDateTime.now());
			 }
			 return false;
		 } catch(Exception e) {
			 
			 System.err.println("Token validation failed: " + e.getMessage());
			 return false;
		 }
		
	}

	@Override
	public String extractUsername(String token) {
		// TODO Auto-generated method stub
		return Jwts.parserBuilder()
				.setSigningKey(SIGNING_KEY)
				.build()
				.parseClaimsJws(token)
				.getBody()
				.getSubject();
	}

	@Override
	public void logout(Users user) {
		// TODO Auto-generated method stub
		int userId = user.getUserId();
		
		Optional<JWTToken> token = tokenRepository.findById(userId);
		if(token.isPresent()) {
			tokenRepository.deleteByUserId(userId);
		}
	}

}
