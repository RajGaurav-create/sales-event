package com.project.salessaive.userserviceimpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.project.salessaive.userEntity.Category;
import com.project.salessaive.userEntity.ProductImage;
import com.project.salessaive.userEntity.Products;
import com.project.salessaive.userRepository.CategoryRepo;
import com.project.salessaive.userRepository.ProductImageRepo;
import com.project.salessaive.userRepository.ProductRepository;
import com.project.salessaive.userservice.ProductService;
@Service
public class ProductServiceImpl implements ProductService{

	public ProductRepository productRepository;
	
	public ProductImageRepo imageRepository;
	
	public CategoryRepo categoryRepository;
	
	
	public ProductServiceImpl(ProductRepository productRepository, ProductImageRepo imageRepository,
			CategoryRepo categoryRepository) {
		super();
		this.productRepository = productRepository;
		this.imageRepository = imageRepository;
		this.categoryRepository = categoryRepository;
	}

	@Override
	public List<Products> getProductsByCategory(String categoryName) {
		// TODO Auto-generated method stub
		if(categoryName != null && !categoryName.isEmpty()) {
			Optional<Category> categoryOpt = categoryRepository.findByCategoryNameIgnoreCase(categoryName);
			if(categoryOpt.isPresent()) {
				Category category = categoryOpt.get();
				return productRepository.findByCategory_CategoryId(category.getCategoryId());
			} else {
				throw new RuntimeException("Category not found.");
			}
		} else {
			return productRepository.findAll();
		}
		
	}

	@Override
	public List<String> getProductImages(int productId) {
		List<ProductImage> productImages = imageRepository.findByProduct_Id(productId);
		List<String> imageUrls = new ArrayList<>();
		for(ProductImage image: productImages) {
			imageUrls.add(image.getImageUrl());
		}
		
		return imageUrls;
	}

}
