package com.project.salessaive.userRepository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.salessaive.userEntity.Category;
@Repository
public interface CategoryRepo extends JpaRepository<Category,Integer> {
	
	public Optional<Category> findByCategoryNameIgnoreCase(String categoryName);

}
