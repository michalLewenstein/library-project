package com.example.finaljavaproject.model;

import jakarta.persistence.*;

import java.util.List;@Entity
public class Chapter {
    @Id
    @GeneratedValue
    private Long id;

    private int chapterNumber;
    @ManyToOne
    private Users author;
    @Lob
    private String dataOfChapter;
    private String date;
    @ManyToOne
    private Book book;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getChapterNumber() {
        return chapterNumber;
    }

    public void setChapterNumber(int chapterNumber) {
        this.chapterNumber = chapterNumber;
    }

    public Users getAuthor() {
        return author;
    }

    public void setAuthor(Users author) {
        this.author = author;
    }

    public String getDataOfChapter() {
        return dataOfChapter;
    }

    public void setDataOfChapter(String dataOfChapter) {
        this.dataOfChapter = dataOfChapter;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

}
