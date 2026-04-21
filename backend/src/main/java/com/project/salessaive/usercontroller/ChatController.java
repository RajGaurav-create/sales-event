package com.project.salessaive.usercontroller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.salessaive.userEntity.ChatRequest;
import com.project.salessaive.userEntity.Users;
import com.project.salessaive.userservice.ChatService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public ResponseEntity<String> chat(
            @RequestBody ChatRequest request,
            HttpServletRequest httpRequest) {

        Users authenticatedUser = (Users) httpRequest.getAttribute("authenticatedUser");
        
        if(authenticatedUser == null) {
        	return ResponseEntity.status(401).body("User not authenticated");
        }
        
        String userId = authenticatedUser.getEmail();

        String aiResponse = chatService.processMessage(userId, request.getMessage());

        return ResponseEntity.ok(aiResponse);
    }
}