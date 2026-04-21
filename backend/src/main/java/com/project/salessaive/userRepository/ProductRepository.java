package com.project.salessaive.userRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.salessaive.userEntity.Products;
@Repository
public interface ProductRepository extends JpaRepository<Products,Integer>{
   List<Products> findByCategory_CategoryId(int categoryId);
   
   @Query("SELECT p.category.categoryName from Products p WHERE p.id = :productId")
   String findCategoryNameByProductId(int productId);
}
