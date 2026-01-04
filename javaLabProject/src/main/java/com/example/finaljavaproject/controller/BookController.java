package com.example.finaljavaproject.controller;
import com.example.finaljavaproject.DTO.BooksDto;
import com.example.finaljavaproject.DTO.SearchDTO;
import com.example.finaljavaproject.model.*;
import com.example.finaljavaproject.model.Book;
import com.example.finaljavaproject.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;



@RequestMapping("api/book")
@RestController
@CrossOrigin
public class BookController {
    private BookRepository bookRepository;
    private CategoryRepository categoryRepository;
    private ResponseRepository responseRepository;
    private AutherRepository autherRepository;
    //המרה למחלקות שונות
    private MapStructMapper mapStructMapper;
    //ניתוב של הפרויקט הנוכחי
    private static String DIRECTORY_PATH = System.getProperty("user.dir") + "//Images//";

    public BookController(BookRepository bookRepository,
                          CategoryRepository categoryRepository,
                          ResponseRepository responseRepository,
                          AutherRepository autherRepository,
                          MapStructMapper mapStructMapper) {
        this.bookRepository = bookRepository;
        this.categoryRepository = categoryRepository;
        this.responseRepository = responseRepository;
        this.autherRepository = autherRepository;
        this.mapStructMapper = mapStructMapper;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<BooksDto>> getAllBook() throws IOException{
        return new ResponseEntity<>(mapStructMapper.mapBooks(bookRepository.findAll()), HttpStatus.OK);
    }

    @GetMapping("/getBook/{id}")
    public ResponseEntity<BooksDto> getBookById(@PathVariable Long id) throws IOException{
        Book book = bookRepository.findById(id).get();
        if (book == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(mapStructMapper.bookToBookDto(book), HttpStatus.OK);
    }

    @PostMapping("/createBookManager")
    public ResponseEntity<Book> createBookManager(@RequestPart("book") Book book,
                                                  @RequestPart(value = "image", required = false)
                                                  MultipartFile file ) throws IOException {
        if(file !=null && !file.isEmpty() ) {
            Path pathImage= Paths.get(DIRECTORY_PATH+file.getOriginalFilename());
            //שמירת התמונה בנתיב
            Files.write(pathImage,file.getBytes());
            //עידכון ניתוב בdata
            book.setImage(DIRECTORY_PATH+file.getOriginalFilename());
        }
        else {
            Path pathImage= Paths.get(DIRECTORY_PATH+"//default.png");
            //נתיב מוחלט
            book.setImage(pathImage.toString());
        }
        book.setDateOut(String.valueOf(LocalDate.now()));
        Book newBook = bookRepository.save(book);
        System.out.println("הספר נוצר");
        return new ResponseEntity<>(newBook, HttpStatus.CREATED);

        }

//פונקציה ליצירת ספר לספר בהמשכים
    @PostMapping("/createBookCategoryId/{id}")
    public ResponseEntity<BooksDto> createBookCategoryId(@PathVariable Long id,
                                                     @RequestBody Book book,
                                                     @RequestPart(value = "image", required = false)
                                                     MultipartFile file) throws IOException {
        if(file !=null && !file.isEmpty() ) {
            Path pathImage= Paths.get(DIRECTORY_PATH+file.getOriginalFilename());
            //שמירת התמונה בנתיב
            Files.write(pathImage,file.getBytes());
            //עידכון ניתוב בdata
            book.setImage(DIRECTORY_PATH+file.getOriginalFilename());
        }
        else {
            Path pathImage= Paths.get(DIRECTORY_PATH+"//default.png");
            //נתיב מוחלט
            book.setImage(pathImage.toString());
        }
        Category category = categoryRepository.findById(id).get();
        book.setCategory(category);
        book.setOpenOrClose(true);
        Book newBook =bookRepository.save(book);
        BooksDto newBookDto = mapStructMapper.bookToBookDto(newBook);
        return new ResponseEntity<>(newBookDto, HttpStatus.CREATED);
    }

    @PutMapping("/updateBook/{id}")
    public ResponseEntity <Book>updateBook(@RequestBody Book book,
                                     @PathVariable Long id) {

        Book newBook = bookRepository.findById(id).get();
        if(newBook != null){
            newBook.setOpenOrClose(true);
            newBook.setAuthorId(book.getAuthorId());
            newBook.setAuther(book.getAuther());
            newBook.setSummary("הספר ממשיך את העלילה של הסדרה בצורה זורמת ועקבית, עם התקדמות משמעותית באירועים המרכזיים ובפיתוח הדמויות. הספר מסתיים בנקודה שמסקרנת לקראת ההמשך.");
            newBook.setLightOrHeavy("מאוזן");
            newBook.setWhyNo("בחלקים מסוימים הקצב הרגיש איטי מדי, והיו רגעים שדרשו סבלנות יתרה מצד הקורא.");
            newBook.setWhyYes( "הספר שומר על קצב קריאה טוב, הדמויות מתפתחות בצורה מעניינת, והכתיבה מצליחה לשמור על עניין לאורך כל הדרך.");
            newBook.setDateOut(String.valueOf(LocalDate.now()));
            newBook.setDescription("זהו ספר בהמשכים שמשתתפי האתר כותבים לבד");
            newBook.setFirstChapter(book.getFirstChapter());
            newBook.setCountScore(book.getCountScore());

        }
        bookRepository.save(newBook);
        return new ResponseEntity<>(newBook ,HttpStatus.OK);

    }

    @DeleteMapping("/deleteBook/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        Book book = bookRepository.findById(id).get();
        if(book==null) {
            return new ResponseEntity<>( HttpStatus.NOT_FOUND);
        }
        List<Response> responses = responseRepository.findAllByBook_Id(book.getId());
        for (Response response : responses) {
            responseRepository.delete(response);
        }
        bookRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/getByCategory/{id}")
    public ResponseEntity<List<BooksDto>> getByCategory(@PathVariable Long id) throws IOException {
        return new ResponseEntity<>(mapStructMapper.mapBooks(bookRepository.findAllByCategory_Id(id))
                                     , HttpStatus.OK);
    }
    //פונקציית חיפוש לפי שם ספר
    @GetMapping("/getAllBySearch/{search}")
    public ResponseEntity <SearchDTO> getAllBySearch(@PathVariable String search) throws IOException {
       List<BooksDto> bookListTitle = mapStructMapper.mapBooks(bookRepository.findAllByTitleContains(search));
       List<BooksDto> bookListAuthor = mapStructMapper.mapBooks(bookRepository.findAllByAuther_NameContains(search));
       SearchDTO searchList = new SearchDTO();
       searchList.setBookListTitle(bookListTitle);
       searchList.setBookListAuthor(bookListAuthor);
       if(searchList==null)
           return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
       return new ResponseEntity<>(searchList, HttpStatus.OK);
    }

    @GetMapping("/getAllChapters/{id}")
    public ResponseEntity<List<Chapter>> getAllChapters(@PathVariable Long id) {
        Book book = bookRepository.findById(id).get();
        List<Chapter> chapterList = book.getChapters();
        return new ResponseEntity<>(chapterList, HttpStatus.OK);
    }
    @GetMapping("/getallresponse/{id}")
    public ResponseEntity<List<Response>> getAllResponse(@PathVariable Long id) {
        Book book = bookRepository.findById(id).get();
        List<Response> responseList = book.getResponses();
        return new ResponseEntity<>(responseList, HttpStatus.OK);
    }
@GetMapping("getDailyBook")
    public ResponseEntity<BooksDto> getDailyBook()throws IOException {
    BooksDto bigScore = mapStructMapper.bookToBookDto(bookRepository.findFirstByOrderByCountScoreDesc());
    return new ResponseEntity<>(bigScore, HttpStatus.OK);
}
}

