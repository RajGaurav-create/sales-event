package com.project.salessaive.userEntity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class ChatMessage {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	@Column
	private String userId;
	@Column
	private String role;
	@Column
	private String content;
	@Column
	private LocalDateTime createdAt = LocalDateTime.now();

	public ChatMessage() {
		super();
	}

	public ChatMessage(String userId, String role, String content, LocalDateTime createdAt) {
		super();
		this.userId = userId;
		this.role = role;
		this.content = content;
		this.createdAt = createdAt;
	}

	public ChatMessage(String userId, String role, String content) {
		super();
		this.userId = userId;
		this.role = role;
		this.content = content;
	}

	public ChatMessage(Long id, String userId, String role, String content, LocalDateTime createdAt) {
		super();
		this.id = id;
		this.userId = userId;
		this.role = role;
		this.content = content;
		this.createdAt = createdAt;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	
	
	
}
