package com.example.finaljavaproject.DTO;

import com.example.finaljavaproject.model.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

public class BooksDto {

    @Id
    @GeneratedValue
    private Long id;
    private Category category;
    private Auther auther;
    private String title;
    private String dateOut;
    private int numOfChapters;
    @Lob
    private String description;
    @Lob
    private String firstChapter;
    private String summary;
    private String lightOrHeavy;
    private String whyYes;
    private String whyNo;
    private boolean openOrClose=false;//To write a book in series
    private Long authorId;//ID of the user currently writing a chapter
    private int countScore;
    private String image;
    private FavoriteBook favoriteBook;
    private List<Response> responses;
    private List<Chapter> chapters;

    public String getWhyNo() {
        return whyNo;
    }

    public void setWhyNo(String whyNo) {
        this.whyNo = whyNo;
    }

    public FavoriteBook getFavoriteBook() {
        return favoriteBook;
    }

    public void setFavoriteBook(FavoriteBook favoriteBook) {
        this.favoriteBook = favoriteBook;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getCountScore() {
        return countScore;
    }

    public void setCountScore(int countScore) {
        this.countScore = countScore;
    }

    public Long getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }

    public boolean isOpenOrClose() {
        return openOrClose;
    }

    public void setOpenOrClose(boolean openOrClose) {
        this.openOrClose = openOrClose;
    }

    public String getLightOrHeavy() {
        return lightOrHeavy;
    }

    public void setLightOrHeavy(String lightOrHeavy) {
        this.lightOrHeavy = lightOrHeavy;
    }

    public String getWhyYes() {
        return whyYes;
    }

    public void setWhyYes(String whyYes) {
        this.whyYes = whyYes;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getFirstChapter() {
        return firstChapter;
    }

    public void setFirstChapter(String firstChapter) {
        this.firstChapter = firstChapter;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getNumOfChapters() {
        return numOfChapters;
    }

    public void setNumOfChapters(int numOfChapters) {
        this.numOfChapters = numOfChapters;
    }

    public String getDateOut() {
        return dateOut;
    }

    public void setDateOut(String dateOut) {
        this.dateOut = dateOut;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Auther getAuther() {
        return auther;
    }

    public void setAuther(Auther auther) {
        this.auther = auther;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Response> getResponses() {
        return responses;
    }

    public void setResponses(List<Response> responses) {
        this.responses = responses;
    }

    public List<Chapter> getChapters() {
        return chapters;
    }

    public void setChapters(List<Chapter> chapters) {
        this.chapters = chapters;
    }
}
