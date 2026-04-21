package com.project.salessaive.admin.service;

import com.project.salessaive.userEntity.Products;

public interface AdminProductService {

	public Products addProductWithImage(String name,String description, Double price, int stock, int categoryId, String imageUrl);
	
	public void deleteProduct(int productId);
}
