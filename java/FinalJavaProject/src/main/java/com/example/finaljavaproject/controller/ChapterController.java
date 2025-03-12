package com.example.finaljavaproject.controller;

import com.example.finaljavaproject.model.Book; // ייבוא נכון של המחלקה Book
import com.example.finaljavaproject.model.Category;
import com.example.finaljavaproject.model.Chapter;
import com.example.finaljavaproject.service.BookRepository;
import com.example.finaljavaproject.service.CategoryRepository;
import com.example.finaljavaproject.service.ChapterRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RequestMapping("api/chapter")
@RestController
@CrossOrigin
public class ChapterController {
    private ChapterRepository chapterRepository;
    private BookRepository bookRepository;

    public ChapterController(ChapterRepository chapterRepository, BookRepository bookRepository) {
        this.chapterRepository = chapterRepository;
        this.bookRepository = bookRepository;
    }

    @GetMapping("/getChapter/{id}")
    public ResponseEntity<Chapter> getChapterById(@PathVariable Long id) {
        Chapter chapter = chapterRepository.findById(id).get();
        if (chapter == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(chapter, HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Chapter>> getAllChapter() {
        return new ResponseEntity<>(chapterRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping("/createChapter")
    public ResponseEntity<Chapter> createChapter(@RequestBody Chapter chapter){
            Book newBook = bookRepository.findById(chapter.getBook().getId()).get();
            newBook.setOpenOrClose(false); //שחרור כתיבת פרקים
            newBook.setNumOfChapters(chapter.getChapterNumber());
            chapter.setDate(String.valueOf(LocalDate.now()));
            newBook.getChapters().add(chapter);
            chapter.setBook(newBook);
            chapterRepository.save(chapter);

        System.out.println("Chapter Number: " + chapter.getChapterNumber());

        return new ResponseEntity<>(chapter, HttpStatus.CREATED);
    }

    @PutMapping("/updateChapter/{id}")
    public ResponseEntity updateChapter(@RequestBody Chapter chapter,
                                         @PathVariable Long id) {
        if (id != chapter.getId())
            return new ResponseEntity<Chapter>(HttpStatus.CONFLICT);
        chapter.setDate(String.valueOf(LocalDate.now()));
        chapter.getBook().setDateOut(String.valueOf(LocalDate.now()));
        Chapter updatedChapter = chapterRepository.save(chapter);
        return new ResponseEntity<>(updatedChapter,HttpStatus.OK);

    }
    @DeleteMapping("/deleteChapter/{id}")
    public ResponseEntity deleteChapter(@PathVariable Long id) {
        chapterRepository.deleteById(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
