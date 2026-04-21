package com.project.salessaive.userservice;

import java.math.BigDecimal;
import java.util.List;

import com.project.salessaive.userEntity.OrderItem;
import com.razorpay.RazorpayException;

public interface PaymentService {

	public String createOrder(int userId, BigDecimal totalAmount,List<OrderItem> cartItems) throws RazorpayException;
	
	public boolean verifyPayment(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature, int userId);
	
	public void saveOrderItems(String orderId, List<OrderItem> items);
}
