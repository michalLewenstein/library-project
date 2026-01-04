package com.example.finaljavaproject.controller;
import com.example.finaljavaproject.model.Auther;
import com.example.finaljavaproject.service.AutherRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/auther")
@RestController
@CrossOrigin
public class AutherController {
    private AutherRepository autherRepository;

    public AutherController(AutherRepository autherRepository) {
        this.autherRepository = autherRepository;
    }

    @GetMapping("/getAuther/{id}")
    public ResponseEntity<Auther> getAutherById(@PathVariable Long id) {
        Auther auther = autherRepository.findById(id).get();
        if (auther == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(auther, HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Auther>> getAllAuther() {
        return new ResponseEntity<>(autherRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping("/createAuther")
    public ResponseEntity<Auther> createAuther(@RequestBody Auther auther) {
        Auther newBook = autherRepository.save(auther);
        return new ResponseEntity<>(newBook, HttpStatus.CREATED);
    }

    @PutMapping("/updateAuther/{id}")
    public ResponseEntity updateAuther(@RequestBody Auther auther,
                                     @PathVariable Long id) {
        if (id != auther.getId())
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        autherRepository.save(auther);
        return new ResponseEntity<>(HttpStatus.OK);

    }
    @DeleteMapping("/deleteAuther/{id}")
    public ResponseEntity deleteAuther(@PathVariable Long id) {
        Auther auther = autherRepository.findById(id).get();
        if (auther == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        autherRepository.deleteById(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
