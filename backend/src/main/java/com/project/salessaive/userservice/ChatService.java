package com.project.salessaive.userservice;

public interface ChatService {

	public String processMessage(String userId, String userMessage);
	
	public String extractMessage(String json);
}
