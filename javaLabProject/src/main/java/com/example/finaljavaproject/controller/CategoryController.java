package com.example.finaljavaproject.controller;
import com.example.finaljavaproject.model.Category;
import com.example.finaljavaproject.service.CategoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/category")
@RestController
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
public class CategoryController {
    private  CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/getCategory/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        Category category = categoryRepository.findById(id).get();
        if (category == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @GetMapping("/getCategoryByName/{name}")
    public ResponseEntity <Category> getCategoryByName(@PathVariable String name) {
        Category category = categoryRepository.findByName(name);
        if(category == null){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Category>> getAllCategory() {
        return new ResponseEntity<>(categoryRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping("/createCategory")
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        Category newCategory = categoryRepository.save(category);
        return new ResponseEntity<>(newCategory, HttpStatus.CREATED);
    }

    @PutMapping("/updateCategory/{id}")
    public ResponseEntity updateCategory(@RequestBody Category category,
                                         @PathVariable Long id) {
        if (id != category.getId())
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        categoryRepository.save(category);
        return new ResponseEntity<>(HttpStatus.OK);

    }
    @DeleteMapping("/deleteCategory/{id}")
    public ResponseEntity deleteCategory(@PathVariable Long id) {
        categoryRepository.deleteById(id);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
