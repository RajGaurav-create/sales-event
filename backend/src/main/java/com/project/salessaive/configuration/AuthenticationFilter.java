package com.project.salessaive.configuration;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.project.salessaive.userEntity.Role;
import com.project.salessaive.userEntity.Users;
import com.project.salessaive.userRepository.UserRepository;
import com.project.salessaive.userserviceimpl.AuthService;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
@WebFilter(urlPatterns= {"/api/*","/admin/*"})
@Component
public class AuthenticationFilter implements Filter {

	private static final Logger logger = 
			LoggerFactory.getLogger(AuthenticationFilter.class);
	
	public AuthService authService;
	public UserRepository userRepository;
	
	private static final String ALLOWED_ORIGIN = "http://localhost:5173";
	
	private static final String[] UNAUTHENTICATED_PATHS = {
			"/api/users/registered",
			"/api/auth/login"
	};
	
	
	
	public AuthenticationFilter(AuthService authService, UserRepository userRepository) {
		super();
		this.authService = authService;
		this.userRepository = userRepository;
	}



	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		// TODO Auto-generated method stub
		try {
			executeFilterLogic(request,response,chain);
		} catch(Exception e) {
			logger.error("Unexpected error in AuthenticationFilter",e);
			sendErrorResponce((HttpServletResponse) response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,"Internal server error");
		}
		
	}
	
	private void executeFilterLogic(ServletRequest request,
			ServletResponse responce,
			FilterChain chain ) throws IOException, ServletException {
		   HttpServletRequest httpRequest   = (HttpServletRequest) request;
		   HttpServletResponse httpResponse = (HttpServletResponse) responce;
		    setCORSHeader(httpResponse);
		   
		   String requestUri = httpRequest.getRequestURI();
		   logger.info("Request URI: {}",requestUri);
		   
		   if(Arrays.asList(UNAUTHENTICATED_PATHS).contains(requestUri)) {
			  chain.doFilter(request, responce);
			  return;
		   }
		   
		   if(httpRequest.getMethod().equalsIgnoreCase("OPTIONS")) {
			   chain.doFilter(request, responce);
			   return;
		   }
		   
		   String token = getAuthTokenFromCookies(httpRequest);
		  
		   if(token == null || !authService.validateToken(token)) {
			   sendErrorResponce(httpResponse,
					   HttpServletResponse.SC_UNAUTHORIZED,"Unauthorized invalid or missing token");
			   return;
		   }
		   
		   String username = authService.extractUsername(token);
		     
		               Optional<Users> optionalUser = userRepository.findByUsername(username);
		               
		               if(optionalUser.isEmpty()) {
		            	   sendErrorResponce(httpResponse,HttpServletResponse.SC_UNAUTHORIZED,
		            			     "Unauthorized: User not found");
		            	   return;
		               }
		               
		               Users authenUser = optionalUser.get();
		               Role role = authenUser.getRole();
		               logger.info("Authenticated User: {}, Role: {}",authenUser.getUsername(),role);
		               
		               if(requestUri.startsWith("/admin/") && role != Role.ADMIN) {
		            	   sendErrorResponce(httpResponse, 
		            			   HttpServletResponse.SC_FORBIDDEN,"Forbidden: Admin acess required");
		            	     return;
		               }
		               
		               if(requestUri.startsWith("/api/") && role != Role.CUSTOMER) {
		            	   sendErrorResponce(httpResponse,
		            			   HttpServletResponse.SC_FORBIDDEN,
		            			   "Forbidden: Customer access required");
		            	   return;
		               }
		               
		               httpRequest.setAttribute("authenticatedUser", authenUser);
		               chain.doFilter(request, responce);
		           }
	
	private void setCORSHeader(HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
		response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
		response.setHeader("Access-Control-Allow-Credentials", "true");
		response.setStatus(HttpServletResponse.SC_OK);
	}

	private void sendErrorResponce(HttpServletResponse
			response,int statusCode, String message) throws IOException {
		setCORSHeader(response);
		response.setStatus(statusCode);
		response.getWriter().write(message);
	}
	
	private String getAuthTokenFromCookies(HttpServletRequest request) {
		Cookie[] cookies = request.getCookies();
		if(cookies != null) {
			return Arrays.stream(cookies)
					.filter(cookie -> 
					"authToken".equals(cookie.getName()))
					.map(Cookie::getValue)
					.findFirst()
					.orElse(null);
					
		}
		return null;
	}

}
