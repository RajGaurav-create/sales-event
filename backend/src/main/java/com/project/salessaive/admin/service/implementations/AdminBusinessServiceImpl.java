package com.project.salessaive.admin.service.implementations;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.project.salessaive.admin.service.AdminBusinessService;
import com.project.salessaive.userEntity.Order;
import com.project.salessaive.userEntity.OrderItem;
import com.project.salessaive.userEntity.OrderStatus;
import com.project.salessaive.userRepository.OrderItemRepository;
import com.project.salessaive.userRepository.OrderRepository;
import com.project.salessaive.userRepository.ProductRepository;

@Service
public class AdminBusinessServiceImpl implements AdminBusinessService {

   private final OrderRepository orderRepository;
   
   private final OrderItemRepository itemRepository;
   
   private final ProductRepository productRepository;
   
   
   
	
	
	public AdminBusinessServiceImpl(OrderRepository orderRepository, OrderItemRepository itemRepository,
		ProductRepository productRepository) {
	super();
	this.orderRepository = orderRepository;
	this.itemRepository = itemRepository;
	this.productRepository = productRepository;
}

	@Override
	public Map<String, Object> calculateMonthlyBusiness(int month, int year) {
		// TODO Auto-generated method stub
		List<Order> successfulOrders = orderRepository.findSuccessfulOrderByMonthAndYear(month, year);
		
		return calculateBusinessMetrics(successfulOrders);
	}

	@Override
	public Map<String, Object> calculateYearlyBusiness(int year) {
		// TODO Auto-generated method stub
		List<Order> successfulOrders = orderRepository.findSuccessfulOrderByYear(year);
		return calculateBusinessMetrics(successfulOrders);
	}

	@Override
	public Map<String, Object> calculateDailyBusiness(LocalDate date) {
		// TODO Auto-generated method stub
		List<Order> successfulOrders = orderRepository.findSuccessfulOrderByDate(date);
		return calculateBusinessMetrics(successfulOrders);
	}

	@Override
	public Map<String, Object> calculateOverallBusiness() {
		// TODO Auto-generated method stub
		List<Order> successfulOrders = orderRepository.findAllByStatus(OrderStatus.SUCCESS);
		return calculateBusinessMetrics(successfulOrders);
	}

	@Override
	public Map<String, Object> calculateBusinessMetrics(List<Order> orders) {
		// TODO Auto-generated method stub
		double totalRevenue = 0.0;
		Map<String,Integer> categorySales = new HashMap<>();
		
		for(Order order : orders) {
			totalRevenue += order.getTotalAmount().doubleValue();
			
			List<OrderItem> items = itemRepository.findByOrderId(order.getOrderId());
			
			for(OrderItem item : items) {
				String categoryName = productRepository.findCategoryNameByProductId(item.getProductId());
				categorySales.put(categoryName, categorySales.getOrDefault(categoryName, 0) + item.getQuantity());
			}
		}
		Map<String, Object> metrics = new HashMap<>();
		metrics.put("totalRevenue", totalRevenue);
		metrics.put("categorySales", categorySales);
		return metrics;
	}

}
