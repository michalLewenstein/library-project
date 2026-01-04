package com.example.finaljavaproject.controller;
import com.example.finaljavaproject.model.Auther;
import com.example.finaljavaproject.model.FavoriteBook;
import com.example.finaljavaproject.service.AutherRepository;
import com.example.finaljavaproject.service.FavoriteBookRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/favoriteBook")
@CrossOrigin
public class FavoriteBookController {
    private FavoriteBookRepository favoriteBookRepository;

    public FavoriteBookController(FavoriteBookRepository favoriteBookRepository) {
        this.favoriteBookRepository = favoriteBookRepository;
    }

    @GetMapping("/getFavoriteBook/{id}")
    public ResponseEntity<FavoriteBook> getFavoriteBookById(@PathVariable Long id) {
        FavoriteBook favoriteBook = favoriteBookRepository.findById(id).get();
        if (favoriteBook == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(favoriteBook, HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<FavoriteBook>> getAllFavoriteBook() {
        return new ResponseEntity<>(favoriteBookRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping("/createFavoriteBook")
    public ResponseEntity<FavoriteBook> createFavoriteBook(@RequestBody FavoriteBook favoriteBook) {
        FavoriteBook newBook = favoriteBookRepository.save(favoriteBook);
        return new ResponseEntity<>(newBook, HttpStatus.CREATED);
    }

    @PutMapping("/updateFavoriteBook/{id}")
    public ResponseEntity updateFavoriteBook(@RequestBody FavoriteBook favoriteBook,
                                       @PathVariable Long id) {
        if (id != favoriteBook.getId())
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        favoriteBookRepository.save(favoriteBook);
        return new ResponseEntity<>(HttpStatus.OK);

    }
    @DeleteMapping("/deleteFavoriteBook/{id}")
    public ResponseEntity deleteFavoriteBook(@PathVariable Long id) {
        favoriteBookRepository.deleteById(id);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
