package com.project.salessaive.userEntity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
@Entity
@Table(name="orders")
public class Order {
    @Id
    @Column(name="order_id")
	String orderId;
	
    @Column(name="useras_id")
	int userId;
	@Column(name="total_amount",nullable=false)
	BigDecimal totalAmount;
	
	@Enumerated(EnumType.STRING)
	@Column(name="status",nullable=false)
	OrderStatus status;
	@Column(name="created_at",nullable=false)
	LocalDateTime createdAt;
	@Column(name="updated_at")
	LocalDateTime updatedAt;
	@OneToMany(mappedBy="order",cascade=CascadeType.ALL, fetch=FetchType.LAZY)
	List<OrderItem> orderitems;

	public Order() {
		super();
	}

	public Order(String orderId, int userId, BigDecimal totalAmount, OrderStatus status, LocalDateTime createdAt,
			LocalDateTime updatedAt) {
		super();
		this.orderId = orderId;
		this.userId = userId;
		this.totalAmount = totalAmount;
		this.status = status;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public BigDecimal getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(BigDecimal totalAmount) {
		this.totalAmount = totalAmount;
	}

	public OrderStatus getStatus() {
		return status;
	}

	public void setStatus(OrderStatus status) {
		this.status = status;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public List<OrderItem> getOrderitems() {
		return orderitems;
	}

	public void setOrderitems(List<OrderItem> orderitems) {
		this.orderitems = orderitems;
	}
	
	
	
	
}
