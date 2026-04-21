package com.project.salessaive.usercontroller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.salessaive.userEntity.Products;
import com.project.salessaive.userEntity.Users;
import com.project.salessaive.userservice.ProductService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins="http://localhost:5173",allowCredentials="true")
@RequestMapping("/api/products")
public class ProductController {
	
	public ProductService productService;

	public ProductController(ProductService productService) {
		super();
		this.productService = productService;
	}
	@GetMapping
	public ResponseEntity<Map<String,Object>> getProducts(@RequestParam(required=false) String category,HttpServletRequest request){
		try {
			Users authenUser = (Users) request.getAttribute("authenticatedUser"); 
			if(authenUser == null) {
				return ResponseEntity.status(401).body(Map.of("error","Unauthorized access"));
			}
			List<Products> productss = productService.getProductsByCategory(category);
			
			Map<String,Object> response = new HashMap<>();
			Map<String,String> userInfo = new HashMap<>();
			userInfo.put("name", authenUser.getUsername());
			userInfo.put("role", authenUser.getRole().name());
			response.put("user", userInfo);
			List<Map<String,Object>> productList = new ArrayList<>();
			for(Products product : productss) {
				Map<String,Object> productDetails =new HashMap<>();
				productDetails.put("product_id", product.getId());
				productDetails.put("name",product.getName());
				productDetails.put("description", product.getDescription());
				productDetails.put("price", product.getPrice());
				productDetails.put("stock", product.getStock());
				List<String> images = productService.getProductImages(product.getId());
				productDetails.put("images", images);
				productList.add(productDetails);
			}
			response.put("products", productList);
			return ResponseEntity.ok(response);
		}catch(RuntimeException e) {
			return ResponseEntity.badRequest().body(Map.of("error",e.getMessage()));
		}
	}

}
