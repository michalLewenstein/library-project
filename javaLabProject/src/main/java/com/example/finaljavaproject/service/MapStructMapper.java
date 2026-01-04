package com.example.finaljavaproject.service;

import com.example.finaljavaproject.DTO.BooksDto;
import com.example.finaljavaproject.DTO.SearchDTO;
import com.example.finaljavaproject.DTO.UsersDTO;
import com.example.finaljavaproject.model.Book;
import com.example.finaljavaproject.model.Users;
import org.mapstruct.Mapper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

//ממשק המאפשר לבצע המרה ממחלקה אחת למחלקה אחרת
@Mapper(componentModel = "spring")
public interface MapStructMapper {

//    List<UsersDTO> mapUsers(List<Users> usersList);

//    default UsersDTO usersToUsersDTO(Users user) throws IOException {
//        UsersDTO usersDTO=new UsersDTO();
//        Path path= Paths.get(user.getImage());
//        //המרה ממחרוזת לביטים
//        byte[] bytes= Files.readAllBytes(path);
//        usersDTO.setId(user.getId());
//        usersDTO.setName(user.getName());
//        if(bytes!=null){
//        usersDTO.setImage(bytes);
//    }
//        return usersDTO;
//    }

    List<BooksDto> mapBooks(List<Book>bookList);
    default BooksDto bookToBookDto(Book book) throws IOException {
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
        //     //המרה ממחרוזת לביטים
        if (book.getImage() != null && !book.getImage().isEmpty()) {
            Path path = Paths.get(book.getImage());
            if (Files.exists(path)) {
                byte[] bytes = Files.readAllBytes(path);
                bookDto.setImage(bytes);
            } else {
                System.err.println("Image file does not exist: " + path);
            }
        }

        return bookDto;
    }

}
