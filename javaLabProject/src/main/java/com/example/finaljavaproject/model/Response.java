package com.example.finaljavaproject.model;

import jakarta.persistence.*;

@Entity
public class Response {
    @Id
    @GeneratedValue
    private Long id;
    @Lob
    private String response;
    private String name;
    private String dateOfResponse;
    private int score;

    @ManyToOne
    private Book book;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDateOfResponse() {
        return dateOfResponse;
    }

    public void setDateOfResponse(String dateOfResponse) {
        this.dateOfResponse = dateOfResponse;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public Book getBookId() {
        return book;
    }

    public void setBookId(Book bookId) {
        this.book = bookId;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }
}
