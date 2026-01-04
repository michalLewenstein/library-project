package com.example.finaljavaproject.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.apache.catalina.User;

import java.util.List;


@Entity
public class FavoriteBook {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private Users user;

    @JsonIgnore
    @OneToMany(mappedBy = "favoriteBook")
    private List<Book> books;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public List<Book> getBooks() {
        return books;
    }

    public void setBooks(List<Book> books) {
        this.books = books;
    }

}