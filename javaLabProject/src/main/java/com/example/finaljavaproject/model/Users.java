package com.example.finaljavaproject.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Users {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String password;
    private String email;
    private String image;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<FavoriteBook> favoriteBook;

    @JsonIgnore
    @OneToMany(mappedBy = "author")
    private List<Chapter> chapters;

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImage() {
        return image;
    }
    public void setImage(String image) {
        this.image = image;
    }
    public List<FavoriteBook> getFavoriteBook() {
        return favoriteBook;
    }
    public void setFavoriteBook(List<FavoriteBook> favoriteBook) {
        this.favoriteBook = favoriteBook;
    }

    public List<Chapter> getChapters() {
        return chapters;
    }

    public void setChapters(List<Chapter> chapters) {
        this.chapters = chapters;
    }

}
