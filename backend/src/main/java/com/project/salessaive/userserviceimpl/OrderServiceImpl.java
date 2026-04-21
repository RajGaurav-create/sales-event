package com.project.salessaive.userserviceimpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.project.salessaive.userEntity.OrderItem;
import com.project.salessaive.userEntity.ProductImage;
import com.project.salessaive.userEntity.Products;
import com.project.salessaive.userEntity.Users;
import com.project.salessaive.userRepository.OrderItemRepository;
import com.project.salessaive.userRepository.ProductImageRepo;
import com.project.salessaive.userRepository.ProductRepository;
import com.project.salessaive.userservice.OrderService;
@Service
public class OrderServiceImpl implements OrderService {

	private OrderItemRepository itemRepository;
	
	private ProductRepository productRepository;
	
	private ProductImageRepo imageRepository;
	
	
	public OrderServiceImpl(OrderItemRepository itemRepository, ProductRepository productRepository,
			ProductImageRepo imageRepository) {
		super();
		this.itemRepository = itemRepository;
		this.productRepository = productRepository;
		this.imageRepository = imageRepository;
	}


	@Override
	public Map<String, Object> getOrdersForUser(Users user) {
		// TODO Auto-generated method stub
		List<OrderItem> orderItems = itemRepository.findSuccessfulOrderItemsByUserId(user.getUserId());
		
		Map<String,Object> response = new HashMap<>();
		response.put("username", user.getUsername());
		response.put("role", user.getRole());
		
		List<Map<String,Object>> products = new ArrayList<>();
		for(OrderItem item : orderItems ) {
			Products product = productRepository.findById(item.getProductId()).orElse(null);
			if(product == null) {
				continue;
			}
			
			List<ProductImage> images = imageRepository.findByProduct_Id(product.getId());
			String Imageurl = images.isEmpty() ? null : images.get(0).getImageUrl();
			
			Map<String,Object> productDetails = new HashMap<>();
			
		    productDetails.put("order_id", item.getOrder().getOrderId());
		    productDetails.put("quantity", item.getQuantity());
		    productDetails.put("total_price", item.getTotalPrice());
		    productDetails.put("image_url", Imageurl);
		    productDetails.put("product_id", product.getId());
		    productDetails.put("name", product.getName());
		    productDetails.put("description", product.getDescription());
		    productDetails.put("price_per_unit", item.getPricePerUnit());
		    
		    products.add(productDetails);
		}
		response.put("products", products);
		return response;
	}

}
