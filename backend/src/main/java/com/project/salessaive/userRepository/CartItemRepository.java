package com.project.salessaive.userRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.salessaive.userEntity.CartItem;

import jakarta.transaction.Transactional;
@Repository
public interface CartItemRepository extends JpaRepository<CartItem,Integer>{
    
	@Query("SELECT c FROM CartItem c WHERE c.user.userId = :userId AND c.product.id = :productId")
	Optional<CartItem> findByUserAndProduct(int userId, int productId);
	
	
	@Query("SELECT c FROM CartItem c JOIN FETCH c.product p LEFT JOIN FETCH ProductImage pi on p.id = pi.product.id where c.user.userId = :userId")
	List<CartItem> findCartItemsWithProductDetails(int userId);
	
	@Query("UPDATE CartItem c SET c.quantity = :quantity WHERE c.id = :cartItemId")
	void updateCartItemQuantity(int cartItemId, int quantity);
	
	@Modifying
	@Transactional
	@Query("DELETE FROM CartItem c WHERE c.user.userId=:userId AND c.product.id = :productId")
	void deleteCartItem(int userId, int productId);
	
	@Query("SELECT COALESCE(SUM(c.quantity),0) FROM CartItem c WHERE c.user.userId = :userId")
	int countTotalItems(int userId);
	@Modifying
	@Transactional
	@Query("DELETE FROM CartItem c WHERE c.user.userId=:userId")
	void deleteAllCartItemsByUserId(int userId);
}
