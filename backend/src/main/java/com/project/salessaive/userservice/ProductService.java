package com.project.salessaive.userservice;

import java.util.List;

import com.project.salessaive.userEntity.Products;

public interface ProductService {

	
	public List<Products> getProductsByCategory(String categoryName);
	
	public List<String> getProductImages(int productId);
}
