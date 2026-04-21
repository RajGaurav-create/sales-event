package com.project.salessaive.userRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.salessaive.userEntity.ProductImage;

import jakarta.transaction.Transactional;
@Repository
public interface ProductImageRepo extends JpaRepository<ProductImage,Integer> {
	
  public List<ProductImage> findByProduct_Id(int productId);
  
  @Modifying
  @Transactional
  @Query("DELETE FROM ProductImage pi WHERE pi.product.id = :productId")
  void deleteByProductId(int productId);
  
}
