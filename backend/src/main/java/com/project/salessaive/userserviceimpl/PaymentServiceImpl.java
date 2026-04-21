package com.project.salessaive.userserviceimpl;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.project.salessaive.userEntity.CartItem;
import com.project.salessaive.userEntity.Order;
import com.project.salessaive.userEntity.OrderItem;
import com.project.salessaive.userEntity.OrderStatus;
import com.project.salessaive.userRepository.CartItemRepository;
import com.project.salessaive.userRepository.OrderItemRepository;
import com.project.salessaive.userRepository.OrderRepository;
import com.project.salessaive.userservice.PaymentService;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

import jakarta.transaction.Transactional;
@Service
public class PaymentServiceImpl implements PaymentService {
    
	@Value("${razorpay.key_id}")
	String razorpayKeyId;
	
	@Value("${razorpay.key_secret}")
	String razorpayKeySecret;
	
	OrderRepository orderRepository;
	
	OrderItemRepository orderItemRepository;
	
	CartItemRepository cartRepository;
	
	
	
	public PaymentServiceImpl(OrderRepository orderRepository, OrderItemRepository orderItemRepository,
			CartItemRepository cartRepository) {
		super();
		this.orderRepository = orderRepository;
		this.orderItemRepository = orderItemRepository;
		this.cartRepository = cartRepository;
	}
    @Transactional
	@Override
	public String createOrder(int userId, BigDecimal totalAmount, List<OrderItem> cartItems) throws RazorpayException {
		// TODO Auto-generated method stub
		RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId,razorpayKeySecret);
		
		var orderRequest = new JSONObject();
		orderRequest.put("amount", totalAmount.multiply(BigDecimal.valueOf(100)).intValue());
		orderRequest.put("currency", "INR");
		orderRequest.put("receipt", "txn_"+System.currentTimeMillis());
		
		com.razorpay.Order razorpayOrder = razorpayClient.orders.create(orderRequest);
		
		Order order = new Order();
		order.setOrderId(razorpayOrder.get("id"));
		order.setUserId(userId);
		order.setTotalAmount(totalAmount);
		order.setStatus(OrderStatus.PENDING);
		order.setCreatedAt(LocalDateTime.now());
		orderRepository.save(order);
		return razorpayOrder.get("id");
	}

    @Transactional
	@Override
	public boolean verifyPayment(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature,
			int userId) {
		// TODO Auto-generated method stub
    	try {
    		JSONObject attribute = new JSONObject();
    		attribute.put("razorpay_order_id", razorpayOrderId);
    		attribute.put("razorpay_payment_id", razorpayPaymentId);
    		attribute.put("razorpay_signature", razorpaySignature);
    		
    		boolean isSignatureValid = com.razorpay.Utils.verifyPaymentSignature(attribute, razorpayKeySecret);
    		
    		if(isSignatureValid) {
    			Order order = orderRepository.findById(razorpayOrderId).orElseThrow(() -> new RuntimeException("Order not Found"));
    			   order.setStatus(OrderStatus.SUCCESS);
    			   order.setUpdatedAt(LocalDateTime.now());
    			   orderRepository.save(order);
    			   
    			   List<CartItem> cartItems = cartRepository.findCartItemsWithProductDetails(userId);
    			   
    			   for(CartItem cartitem: cartItems) {
    				   OrderItem orderItem = new OrderItem();
    				   orderItem.setOrder(order);
    				   orderItem.setProductId(cartitem.getProduct().getId());
    				   orderItem.setQuantity(cartitem.getQuantity());
    				   orderItem.setPricePerUnit(cartitem.getProduct().getPrice());
    				   orderItem.setTotalPrice(cartitem.getProduct().getPrice().multiply(BigDecimal.valueOf(cartitem.getQuantity())));
    				   orderItemRepository.save(orderItem);
    			   }
    			   
    			   cartRepository.deleteAllCartItemsByUserId(userId);
    			   
    			   return true;
    			   
    		} else {
    			return false;
    		}
    	} catch(Exception e) {
    		e.printStackTrace();
    		return false;
    	}
	
	}
    @Transactional
	@Override
	public void saveOrderItems(String orderId, List<OrderItem> items) {
		// TODO Auto-generated method stub
		Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
		for(OrderItem item: items) {
			item.setOrder(order);
			orderItemRepository.save(item);
		}
	}

}
