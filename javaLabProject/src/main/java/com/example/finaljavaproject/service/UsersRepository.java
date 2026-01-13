package com.example.finaljavaproject.service;

import com.example.finaljavaproject.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, Long> {

    Users findUsersByName(String name);
}