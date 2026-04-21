package com.project.salessaive.admin.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.salessaive.admin.service.AdminProductService;
import com.project.salessaive.userEntity.Products;

@RestController
@RequestMapping("/admin/products")
public class AdminProductController {
	
  private final AdminProductService adminProductService;

  public AdminProductController(AdminProductService adminProductService) {
	super();
	this.adminProductService = adminProductService;
  }
  
  @PostMapping("/add")
  public ResponseEntity<?> addProduct(@RequestBody Map<String,Object> request){
	  try {
		  String name = (String) request.get("name");
		  String description = (String) request.get("description");
		  Double price = Double.valueOf(String.valueOf(request.get("price")));
		  int stock = (int) request.get("stock");
		  int categoryId = (int) request.get("categoryId");
		  String imageUrl = (String) request.get("imageUrl");
		  Products addedProduct = adminProductService.addProductWithImage(name, description, price, stock, categoryId, imageUrl);
		  return ResponseEntity.status(HttpStatus.CREATED).body(addedProduct);
	  } catch(IllegalArgumentException e) {
		  return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	  } catch(Exception e) {
		  return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Request went wrong");
	  }
   }
  
  @DeleteMapping("/delete")
  public ResponseEntity<?> deleteProduct(@RequestBody Map<String,Integer> requestBody){
	  try {
		  int productId = requestBody.get("productId");
		  adminProductService.deleteProduct(productId);
		  return ResponseEntity.status(HttpStatus.OK).body("Product deleted successfully");
	  } catch(IllegalArgumentException e) {
		  return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
	  } catch(Exception e) {
		  return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Request went wrong");
	  }
  }
}
