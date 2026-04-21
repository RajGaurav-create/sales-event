package com.project.salessaive.admin.service.implementations;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.project.salessaive.admin.service.AdminProductService;
import com.project.salessaive.userEntity.Category;
import com.project.salessaive.userEntity.ProductImage;
import com.project.salessaive.userEntity.Products;
import com.project.salessaive.userRepository.CategoryRepo;
import com.project.salessaive.userRepository.ProductImageRepo;
import com.project.salessaive.userRepository.ProductRepository;

@Service
public class AdminProductServiceImpl implements AdminProductService {
  
	private final ProductRepository productRepository;
	
	private final ProductImageRepo imageRepository;
	
	private final CategoryRepo categoryRepository;
	
	
	
	
	public AdminProductServiceImpl(ProductRepository productRepository, ProductImageRepo imageRepository,
			CategoryRepo categoryRepository) {
		super();
		this.productRepository = productRepository;
		this.imageRepository = imageRepository;
		this.categoryRepository = categoryRepository;
	}

	@Override
	public Products addProductWithImage(String name, String description, Double price, int stock, int categoryId,
			String imageUrl) {
		// TODO Auto-generated method stub
		Optional<Category> category = categoryRepository.findById(categoryId);
		
		if(category.isEmpty()) {
			throw new IllegalArgumentException("Invalid Catogory id");
		}
		
		Products product = new Products();
		product.setName(name);
		product.setDescription(description);
		product.setPrice(BigDecimal.valueOf(price));
		product.setStock(stock);
		product.setCategory(category.get());
		product.setCreatedAt(LocalDateTime.now());
		product.setUpdateAt(LocalDateTime.now());
		
		Products saveProduct = productRepository.save(product);
		
		if(imageUrl != null && !imageUrl.isEmpty()) {
			ProductImage productImage = new ProductImage();
			productImage.setProduct(saveProduct);
			productImage.setImageUrl(imageUrl);
			imageRepository.save(productImage);
		} else {
			throw new IllegalArgumentException("Product image URL cannot be empty.");
		}
		
		return saveProduct;
	}

	@Override
	public void deleteProduct(int productId) {
		// TODO Auto-generated method stub
		if(!productRepository.existsById(productId)) {
			throw new IllegalArgumentException("Product not found");
		}
		
		imageRepository.deleteByProductId(productId);
		
		productRepository.deleteById(productId);
	}

}
