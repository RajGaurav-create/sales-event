package com.project.salessaive.userserviceimpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.project.salessaive.userEntity.CartItem;
import com.project.salessaive.userEntity.ProductImage;
import com.project.salessaive.userEntity.Products;
import com.project.salessaive.userEntity.Users;
import com.project.salessaive.userRepository.CartItemRepository;
import com.project.salessaive.userRepository.ProductImageRepo;
import com.project.salessaive.userRepository.ProductRepository;
import com.project.salessaive.userRepository.UserRepository;
import com.project.salessaive.userservice.CartService;
@Service
public class CartServiceimpl implements CartService {
	
	public UserRepository userRepo;
	
	public ProductRepository productRepo;
	
	public CartItemRepository cartRepository;
	
	public ProductImageRepo imageRepository;
	

	


	public CartServiceimpl(UserRepository userRepo, ProductRepository productRepo, CartItemRepository cartRepository,
			ProductImageRepo imageRepository) {
		super();
		this.userRepo = userRepo;
		this.productRepo = productRepo;
		this.cartRepository = cartRepository;
		this.imageRepository = imageRepository;
	}



	@Override
	public void addToCart(int userId, int productId, int quantity) {
		// TODO Auto-generated method stub
		Users user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found with Id: " + userId));
		
		Products product = productRepo.findById(productId).orElseThrow(() -> new RuntimeException("Products not found with Id: "+ productId));
		
		Optional<CartItem> existingitem = cartRepository.findByUserAndProduct(userId, productId);
		
		if(existingitem.isPresent()) {
			CartItem cartitem = existingitem.get();
			cartitem.setQuantity(quantity);
			cartRepository.save(cartitem);
		} else {
			CartItem newItem = new CartItem(user,product,quantity);
			cartRepository.save(newItem);
		}
	}



	@Override
	public Map<String, Object> getCartItems(int userId) {
		// TODO Auto-generated method stub
		List<CartItem> cartItems = cartRepository.findCartItemsWithProductDetails(userId);
		
		Map<String,Object> responce = new HashMap<>();
		Users user = userRepo.findById(userId).orElseThrow(() -> 
		                      new RuntimeException("Users not found with userId: " + userId));
	
		responce.put("username", user.getUsername());
		responce.put("role", user.getRole().toString());
		List<Map<String,Object>> products = new ArrayList<>();
		int overallTotalPrice = 0;
		
		for (CartItem cartItem : cartItems) {
			Map<String,Object> productDetails = new HashMap<>();
			
			Products product = cartItem.getProduct();
			
			List<ProductImage> productImages = imageRepository.findByProduct_Id(product.getId());
			String imageUrl = (productImages != null && !productImages.isEmpty())?
					             productImages.get(0).getImageUrl()
					             :"default-image-url";
			productDetails.put("product_id", product.getId());
			productDetails.put("image_url", imageUrl);
			productDetails.put("name", product.getName());
			productDetails.put("description", product.getDescription());
			productDetails.put("price_per_unit", product.getPrice());
			productDetails.put("quantity", cartItem.getQuantity());
		    productDetails.put("total_price", cartItem.getQuantity() * product.getPrice().doubleValue());
		    
		    products.add(productDetails);
		    
		    overallTotalPrice += cartItem.getQuantity() * product.getPrice().doubleValue();
 		}
		Map<String,Object> cart = new HashMap<>();
		  cart.put("products", products);
		  cart.put("overall_total_price", overallTotalPrice);
		  
		  responce.put("cart", cart);
		return responce;
	}



	@Override
	public void updateCartItemQuantity(int userId, int productId, int quantity) {
		// TODO Auto-generated method stub
		Users user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
		
		Products product = productRepo.findById(productId).orElseThrow(()-> new RuntimeException("Products not found."));
		
		Optional<CartItem> existingItem = cartRepository.findByUserAndProduct(userId, productId);
		
		if(existingItem.isPresent()) {
			CartItem cartItem = existingItem.get();
			if(quantity == 0) {
				deleteCartItem(userId,productId);
			}else {
				cartItem.setQuantity(quantity);
				cartRepository.save(cartItem);
			}
		}
	}



	@Override
	public void deleteCartItem(int userId, int productId) {
		// TODO Auto-generated method stub
		Users user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
		
		Products product = productRepo.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
		
		cartRepository.deleteCartItem(userId, productId);
		
	}



	@Override
	public int getCartItemCount(int userId) {
		// TODO Auto-generated method stub
		
		return cartRepository.countTotalItems(userId);
	}

}
