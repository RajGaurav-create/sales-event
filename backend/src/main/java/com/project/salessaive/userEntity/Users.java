package com.project.salessaive.userEntity;

import java.time.LocalDateTime;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity
@Table
public class Users {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int userId;
	@Column
	String username;
	@Column
	String email;
	@Column
	String password;
	@Enumerated(EnumType.STRING)
	@Column
	Role role;
	@Column
	LocalDateTime createdAt = LocalDateTime.now();
	@Column
	LocalDateTime updateAt = LocalDateTime.now();

	public Users() {
		super();
	}

	public Users(int userId, String username, String email, String password, Role role) {
		super();
		this.userId = userId;
		this.username = username;
		this.email = email;
		this.password = password;
		this.role = role;
	}

	public Users(String username, String email, String password, Role role, LocalDateTime createdAt,
			LocalDateTime updateAt) {
		super();
		this.username = username;
		this.email = email;
		this.password = password;
		this.role = role;
		this.createdAt = createdAt;
		this.updateAt = updateAt;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
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
		return Objects.hash(createdAt, email, password, role, updateAt, userId, username);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Users other = (Users) obj;
		return Objects.equals(createdAt, other.createdAt) && Objects.equals(email, other.email)
				&& Objects.equals(password, other.password) && role == other.role
				&& Objects.equals(updateAt, other.updateAt) && userId == other.userId
				&& Objects.equals(username, other.username);
	}
	
	

}
