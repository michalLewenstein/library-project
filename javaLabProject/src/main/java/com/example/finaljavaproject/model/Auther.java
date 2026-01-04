package com.example.finaljavaproject.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Auther {
   @Id
   @GeneratedValue
   private Long id;

   private String name;

   @JsonIgnore
   @OneToMany(mappedBy = "auther")
   private List<Book> books;

   public Long getId() {
      return id;
   }

   public void setId(Long id) {
      this.id = id;
   }

   public String getName() {
      return name;
   }

   public void setName(String name) {
      this.name = name;
   }

   public List<Book> getBooks() {
      return books;
   }

   public void setBooks(List<Book> books) {
      this.books = books;
   }

}
