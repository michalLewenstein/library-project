package com.example.finaljavaproject.service;
import com.example.finaljavaproject.model.FavoriteBook;
import org.springframework.data.jpa.repository.JpaRepository;
public interface FavoriteBookRepository extends JpaRepository<FavoriteBook, Long> {
}
