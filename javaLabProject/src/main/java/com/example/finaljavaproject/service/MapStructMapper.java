package com.example.finaljavaproject.service;

import com.example.finaljavaproject.DTO.BooksDto;
import com.example.finaljavaproject.model.Book;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MapStructMapper {

    default BooksDto bookToBookDto(Book book)  {
        BooksDto bookDto = new BooksDto();
        bookDto.setId(book.getId());
        bookDto.setTitle(book.getTitle());
        bookDto.setCategory(book.getCategory());
        bookDto.setDescription(book.getDescription());
        bookDto.setAuther(book.getAuther());
        bookDto.setFavoriteBook(book.getFavoriteBook());
        bookDto.setAuthorId(book.getAuthorId());
        bookDto.setAuther(book.getAuther());
        bookDto.setDateOut(book.getDateOut());
        bookDto.setNumOfChapters(book.getNumOfChapters());
        bookDto.setFirstChapter(book.getFirstChapter());
        bookDto.setSummary(book.getSummary());
        bookDto.setLightOrHeavy(book.getLightOrHeavy());
        bookDto.setWhyNo(book.getWhyNo());
        bookDto.setWhyYes(book.getWhyYes());
        bookDto.setCountScore(book.getCountScore());
        bookDto.setResponses(book.getResponses());
        bookDto.setChapters(book.getChapters());
        bookDto.setOpenOrClose(book.isOpenOrClose());
        bookDto.setImage(book.getImage());
        return bookDto;
    }

}
