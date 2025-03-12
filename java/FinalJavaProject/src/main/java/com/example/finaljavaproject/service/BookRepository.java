package com.example.finaljavaproject.service;
import com.example.finaljavaproject.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {


    List<Book> findAllByCategory_Id(Long id);

    List<Book> findAllByTitleContains(String serch);

    List<Book> findAllByAuther_NameContains(String serch);

    Book findFirstByOrderByCountScoreDesc();
}
