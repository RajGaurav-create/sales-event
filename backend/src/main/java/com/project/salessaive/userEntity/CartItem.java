package com.project.salessaive.userEntity;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@SuppressWarnings("serial")
@Entity
@Table(name="cart_items")
public class CartItem implements Serializable {
   
    @jakarta.persistence.Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	int Id;
	@ManyToOne
	@JoinColumn(name="users_id")
	Users user;
	@ManyToOne
	@JoinColumn(name="products_id")
	Products product;
	
	@Column
	int quantity;

	public CartItem() {
		super();
	}

	public CartItem(int id, Users user, Products product, int quantity) {
		super();
		Id = id;
		this.user = user;
		this.product = product;
		this.quantity = quantity;
	}

	public CartItem(Users user, Products product, int quantity) {
		super();
		this.user = user;
		this.product = product;
		this.quantity = quantity;
	}

	public int getId() {
		return Id;
	}

	public void setId(int id) {
		Id = id;
	}

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	public Products getProduct() {
		return product;
	}

	public void setProduct(Products product) {
		this.product = product;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	@Override
	public int hashCode() {
		return Objects.hash(Id, product, quantity, user);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CartItem other = (CartItem) obj;
		return Id == other.Id && Objects.equals(product, other.product) && quantity == other.quantity
				&& Objects.equals(user, other.user);
	}

	@Override
	public String toString() {
		return "CartItem [Id=" + Id + ", user=" + user + ", product=" + product + ", quantity=" + quantity + "]";
	}
	
	
}
