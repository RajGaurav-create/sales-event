package com.project.salessaive.userRepository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.salessaive.userEntity.JWTToken;

import jakarta.transaction.Transactional;
@Repository
public interface JWTTokenRepository extends JpaRepository<JWTToken,Integer> {
    @Query("SELECT t FROM JWTToken t WHERE t.user.userId = :userId")
	JWTToken findByUserId(@Param("userId") int userId);
    
   Optional< JWTToken> findByToken(String token);
   
   @Modifying
   @Transactional
   @Query("DELETE FROM JWTToken t WHERE t.user.userId = :userId")
   void deleteByUserId(@Param("userId") int userId);
}
