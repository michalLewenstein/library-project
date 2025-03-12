package com.example.finaljavaproject.service;
import com.example.finaljavaproject.model.Response;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ResponseRepository extends JpaRepository<Response, Long> {
    List<Response> findAllByBook_Id(Long id);
}
