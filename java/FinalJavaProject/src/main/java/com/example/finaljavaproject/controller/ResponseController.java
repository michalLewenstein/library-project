package com.example.finaljavaproject.controller;
import com.example.finaljavaproject.model.Book;
import com.example.finaljavaproject.model.Response;
import com.example.finaljavaproject.model.Users;
import com.example.finaljavaproject.service.BookRepository;
import com.example.finaljavaproject.service.ResponseRepository;
import com.example.finaljavaproject.service.UsersRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RequestMapping("api/response")
@RestController
@CrossOrigin
public class ResponseController {
    private ResponseRepository responseRepository;
    private BookRepository bookRepository;

    public ResponseController(ResponseRepository responseRepository, BookRepository bookRepository) {
        this.responseRepository = responseRepository;
        this.bookRepository = bookRepository;
    }

    @GetMapping("/getResponse/{id}")
    public ResponseEntity<Response> getResponseById(@PathVariable Long id) {
        Response response = responseRepository.findById(id).get();
        if (response == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Response>> getAllResponse() {
        return new ResponseEntity<>(responseRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping("/createResponse")
    public ResponseEntity<Response> createResponse(@RequestBody Response response) {
        Book newBook = bookRepository.findById(response.getBook().getId()).orElse(null);
        response.setDateOfResponse(String.valueOf(LocalDate.now()));
        newBook.getResponses().add(response);
        newBook.setCountScore(newBook.getCountScore() + response.getScore());
        System.out.println("הניקוד של הספר"+ newBook.getCountScore());
        bookRepository.save(newBook);
        response.setBook(newBook);
        Response newResponse = responseRepository.save(response);
        return new ResponseEntity<>(newResponse, HttpStatus.CREATED);
    }

    @PutMapping("/updateResponse/{id}")
    public ResponseEntity updateResponse(@RequestBody Response response,
                                      @PathVariable Long id) {
        if (id != response.getId())
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        responseRepository.save(response);
        return new ResponseEntity<>(HttpStatus.OK);

    }
    @DeleteMapping("/deleteResponse/{id}")
    public ResponseEntity deleteResponse(@PathVariable Long id) {
        Response response = responseRepository.findById(id).get();
        if (response == null)
            return new ResponseEntity<>( HttpStatus.NOT_FOUND);
        Book newBook = bookRepository.findById(response.getBook().getId()).orElse(null);
        if (newBook != null){
            newBook.getResponses().remove(response);
            newBook.setCountScore(newBook.getCountScore() - response.getScore());
            bookRepository.save(newBook);
        }
        responseRepository.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
