package com.example.finaljavaproject.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.*;

@Entity
public class Book {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private Category category;

    @ManyToOne
    private Auther auther;

    @JsonIgnore
    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Chapter> chapters =new ArrayList<>();

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
    private boolean openOrClose=false;//לכתיבת ספר בהמשכים
    private Long authorId;//מזהה למשתמש שכותב כרגע פרק
    private int countScore;
    @Lob
    private String image;



    @JsonIgnore
    @OneToMany(mappedBy = "book")
    private List<Response> responses;

    @ManyToOne
    private FavoriteBook favoriteBook;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDateOut() {
        return dateOut;
    }

    public void setDateOut(String dateOut) {
        this.dateOut = dateOut;
    }

    public int getNumOfChapters() {
        return numOfChapters;
    }

    public void setNumOfChapters(int numOfPages) {
        this.numOfChapters = numOfPages;
    }

    public List<Response> getResponses() {
        return responses;
    }

    public void setResponses(List<Response> responses) {
        this.responses = responses;
    }

    public String getDescription() {

        return description;
    }
    public void setDescription(String description)
    {
        this.description = description;
    }

    public String getFirstChapter() {
        return firstChapter;
    }
    public void setFirstChapter(String firstChapter) {
        this.firstChapter = firstChapter;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public FavoriteBook getFavoriteBook() {
        return favoriteBook;
    }

    public void setFavoriteBook(FavoriteBook favoriteBook) {
        this.favoriteBook = favoriteBook;
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

    public String getWhyNo() {
        return whyNo;
    }

    public void setWhyNo(String whyNo) {
        this.whyNo = whyNo;
    }

    public List<Chapter> getChapters() {
        return chapters;
    }

    public void setChapters(List<Chapter> chapters) {
        this.chapters = chapters;
    }

    public boolean isOpenOrClose() {
        return openOrClose;
    }

    public void setOpenOrClose(boolean openOrClose) {
        this.openOrClose = openOrClose;
    }

    public Long getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }

    public int getCountScore() {
        return countScore;
    }

    public void setCountScore(int countScore) {
        this.countScore = countScore;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
