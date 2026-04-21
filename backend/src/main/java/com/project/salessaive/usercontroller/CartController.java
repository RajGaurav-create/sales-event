package com.project.salessaive.usercontroller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.salessaive.userEntity.Users;
import com.project.salessaive.userRepository.UserRepository;
import com.project.salessaive.userservice.CartService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins="http://localhost:5173",allowCredentials="true")
@RequestMapping("/api/cart")
public class CartController {
    
	public UserRepository userRepository;
	
	public CartService cartService;
	
	
	
	public CartController(UserRepository userRepository, CartService cartService) {
		super();
		this.userRepository = userRepository;
		this.cartService = cartService;
	}


    @PostMapping("/add")
	public ResponseEntity<Void> addToCart(@RequestBody Map<String,Object> request){
		String username = (String) request.get("username");
		int productId = (int) request.get("productId");
		
		int quantity = request.containsKey("quantity")? (int) request.get("quantity") : 1;
		
		Users user = userRepository.findByUsername(username).orElseThrow(() -> 
		                           new RuntimeException("User not found with username: " + username));
		
		cartService.addToCart(user.getUserId(), productId, quantity);
		return ResponseEntity.status(HttpStatus.CREATED).build();
		
	}
    @GetMapping("/items")
    public ResponseEntity<Map<String,Object>> getCartItems(HttpServletRequest request){
    	Users user = (Users) request.getAttribute("authenticatedUser");
    	Map<String,Object> cartItems = cartService.getCartItems(user.getUserId());
    	return ResponseEntity.ok(cartItems);
    }
    @PutMapping("/update")
    public ResponseEntity<Void> updateCartItemQuantity(@RequestBody Map<String,Object> request){
    	String username =(String) request.get("username");
    	int productId = (int) request.get("productId");
    	int quantity = (int) request.get("quantity");
    	
    	Users user = userRepository.findByUsername(username).orElseThrow(()-> new RuntimeException("User not found with username: "+ username));
    	
    	cartService.updateCartItemQuantity(user.getUserId(), productId, quantity);
    	return ResponseEntity.status(HttpStatus.OK).build();
    }
    
    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteCartItem(@RequestBody Map<String,Object> request){
    	String username = (String) request.get("username");
    	int productId = (int) request.get("productId");
    	
    	Users user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found with username: "+username));
    	
    	cartService.deleteCartItem(user.getUserId(), productId);
    	return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
    
    @GetMapping("/items/count")
    public ResponseEntity<Integer> getCartItemCount(@RequestParam String username, HttpServletRequest request){
    	Users user = (Users) request.getAttribute("authenticatedUser");
    	int cartCount = cartService.getCartItemCount(user.getUserId());
    	return ResponseEntity.ok(cartCount);
    }
}
