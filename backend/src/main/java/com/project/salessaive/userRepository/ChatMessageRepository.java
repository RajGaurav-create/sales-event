package com.project.salessaive.userRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.salessaive.userEntity.ChatMessage;
@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

	List<ChatMessage> findTop3ByUserIdOrderByCreatedAtDesc(String userId);
}
