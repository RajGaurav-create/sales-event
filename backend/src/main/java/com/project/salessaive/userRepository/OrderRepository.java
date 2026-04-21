package com.project.salessaive.userRepository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.salessaive.userEntity.Order;
import com.project.salessaive.userEntity.OrderStatus;

@Repository
public interface OrderRepository extends JpaRepository<Order,String> {
	
	@Query("SELECT o FROM Order o WHERE MONTH(o.createdAt) = :month AND YEAR(o.createdAt) = :year AND o.status = 'SUCCESS'")
	List<Order> findSuccessfulOrderByMonthAndYear(int month,int year);
	
	@Query("SELECT o FROM Order o WHERE DATE(o.createdAt) = :date AND o.status = 'SUCCESS'")
	List<Order> findSuccessfulOrderByDate(LocalDate date);

	@Query("SELECT o FROM Order o WHERE YEAR(o.createdAt) = :year AND o.status = 'SUCCESS'")
	List<Order> findSuccessfulOrderByYear(int year);
	
	
	List<Order> findAllByStatus(OrderStatus success);
}
