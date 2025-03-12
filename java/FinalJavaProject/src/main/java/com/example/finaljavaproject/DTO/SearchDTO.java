package com.example.finaljavaproject.DTO;

import com.example.finaljavaproject.model.Book;

import java.util.List;

public class SearchDTO {

    List<BooksDto> bookListTitle;

    List<BooksDto> bookListAuthor;

    public List<BooksDto> getBookListTitle() {
        return bookListTitle;
    }

    public void setBookListTitle(List<BooksDto> bookListTitle) {
        this.bookListTitle = bookListTitle;
    }

    public List<BooksDto> getBookListAuthor() {
        return bookListAuthor;
    }

    public void setBookListAuthor(List<BooksDto> bookListAuthor)
    {
        this.bookListAuthor = bookListAuthor;
    }
}
