package com.example.finaljavaproject.service;
import com.example.finaljavaproject.model.Auther;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AutherRepository extends JpaRepository<Auther, Long> {

     List <Auther> findAllByName(String name);
}
