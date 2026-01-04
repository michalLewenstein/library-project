package com.example.finaljavaproject.service;
import com.example.finaljavaproject.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CategoryRepository extends JpaRepository<Category, Long> {

    Category findByName(String name);
}
