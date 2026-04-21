package com.project.salessaive.userEntity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
@Entity
@Table(name="products")
public class Products {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="product_id")
	int id;
	@Column
	String name;
	@Column
	String description;
	@Column
	BigDecimal price;
	@Column
	int stock;
	@ManyToOne
	@JoinColumn(name = "category_id")
	Category category;
	@Column(columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	LocalDateTime createdAt;
	@Column(columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	LocalDateTime updateAt;

	public Products() {
		super();
	}

	public Products(String name, String description, BigDecimal price, int stock, Category category,
			LocalDateTime createdAt, LocalDateTime updateAt) {
		super();
		this.name = name;
		this.description = description;
		this.price = price;
		this.stock = stock;
		this.category = category;
		this.createdAt = createdAt;
		this.updateAt = updateAt;
	}

	public Products(int id, String name, String description, BigDecimal price, int stock, Category category,
			LocalDateTime createdAt, LocalDateTime updateAt) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.stock = stock;
		this.category = category;
		this.createdAt = createdAt;
		this.updateAt = updateAt;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdateAt() {
		return updateAt;
	}

	public void setUpdateAt(LocalDateTime updateAt) {
		this.updateAt = updateAt;
	}

	@Override
	public int hashCode() {
		return Objects.hash(category, createdAt, description, id, name, price, stock, updateAt);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Products other = (Products) obj;
		return Objects.equals(category, other.category) && Objects.equals(createdAt, other.createdAt)
				&& Objects.equals(description, other.description) && id == other.id && Objects.equals(name, other.name)
				&& Objects.equals(price, other.price) && stock == other.stock
				&& Objects.equals(updateAt, other.updateAt);
	}

	@Override
	public String toString() {
		return "Products [id=" + id + ", name=" + name + ", description=" + description + ", price=" + price
				+ ", stock=" + stock + ", category=" + category + ", createdAt=" + createdAt + ", updateAt=" + updateAt
				+ "]";
	}
	
	
}
