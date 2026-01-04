package com.example.finaljavaproject.service;

import com.example.finaljavaproject.model.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ChapterRepository
        extends  JpaRepository<Chapter,Long>{
}
