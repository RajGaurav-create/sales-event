package com.project.salessaive.userserviceimpl;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.salessaive.userEntity.ChatMessage;
import com.project.salessaive.userRepository.ChatMessageRepository;
import com.project.salessaive.userservice.ChatService;

import reactor.core.publisher.Mono;
import reactor.util.retry.Retry;
@Service
public class ChatServiceImpl implements ChatService {
    
	@Value("${openai.api.key}")
    private String apiKey;
	
	private final ChatMessageRepository repository;
	
	private final ObjectMapper objectMapper = new ObjectMapper();
	
	private final WebClient webClient = WebClient.builder()
                                      .baseUrl("https://api.openai.com/v1")
                                      .build();
	
	
	public ChatServiceImpl(ChatMessageRepository repository) {
		super();
		this.repository = repository;
	}

	@Override
	public String processMessage(String userId, String userMessage) {
		try {
		// TODO Auto-generated method stub
		List<ChatMessage> history = repository.findTop3ByUserIdOrderByCreatedAtDesc(userId);
		
		Collections.reverse(history);
		
		List<Map<String,String>> messages = new ArrayList<>();
		messages.add(Map.of(
				"role", "system",
				"content",""" 
						You are a helpful product support assistant.
						Explain clearly and politely
						if user says they don't understand, explain in simpler terms.
						"""
				));
		for(ChatMessage msg: history) {
			messages.add(Map.of(
					"role", msg.getRole(),
					"content",msg.getContent()
					));
		}
		
		messages.add(Map.of(
	            "role", "user",
	            "content", userMessage
	    ));
		Map<String,Object> body = Map.of(
				"model", "gpt-4o-mini",
				"messages", messages,
				"temperature", 0.7,
				"max_tokens", 150
				);
		
		String rawResponse = webClient.post()
				            .uri("/chat/completions")
				            .header(HttpHeaders.AUTHORIZATION, "Bearer "+  apiKey)
				            .bodyValue(body)
				            .retrieve()
				            .onStatus(
				            	    status -> status.value() == 429,
				            	    response -> Mono.error(new RuntimeException("AI service overloaded. Try again later."))
				            	)
				            .bodyToMono(String.class)
				            .retryWhen(Retry.backoff(3, Duration.ofSeconds(2)))
				            .block();
		          String aiMessage = extractMessage(rawResponse);
		          
		          repository.save(new ChatMessage(null,userId,"user",userMessage, LocalDateTime.now()));
		          repository.save(new ChatMessage(null, userId, "assistant", aiMessage, LocalDateTime.now()));
		          
		return aiMessage;
		}catch(Exception e) {
			return "AI Service temporarily unavailable please try again later.";
		}
	}

	@Override
	public String extractMessage(String json) {
		// TODO Auto-generated method stub
		try {
			JsonNode root = objectMapper.readTree(json);
			
			return root.path("choices")
					.get(0)
					.path("message")
					.path("content")
					.asText();
			
		} catch(Exception e) {
			return "Error processing AI response.";
		}
	}

}
