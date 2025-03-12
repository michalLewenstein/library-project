package com.example.finaljavaproject.controller;
import com.example.finaljavaproject.DTO.UsersDTO;
import com.example.finaljavaproject.model.Users;
import com.example.finaljavaproject.service.MapStructMapper;
import com.example.finaljavaproject.service.UsersRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("api/users")
@CrossOrigin
public class UsersController {
    //המרה למחלקות שונות
    private MapStructMapper mapStructMapper;
    //ניתוב של הפרוייקט הנוכחי
    private static String DIRECTORY_PATH=System.getProperty("user.dir")+"//Images//";

    @Autowired
    private  UsersRepository usersRepository;

    public UsersController(UsersRepository usersRepository,  MapStructMapper mapStructMapper) {
        this.usersRepository = usersRepository;
        this.mapStructMapper = mapStructMapper;
    }

    @GetMapping("/getUsers/{id}")
    public ResponseEntity<Users> getUsersById(@PathVariable Long id) throws IOException {
        Users user = usersRepository.findById(id).get();
        if (user == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

        return new ResponseEntity<>( user, HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Users>> getAllUsers() {
        return new ResponseEntity<>(usersRepository.findAll(),HttpStatus.CREATED);    }


    @PutMapping("/updateUsers/{id}")
    public ResponseEntity<Users> updateUsers(@PathVariable long id,
    @RequestBody Users user)
                                          {
        System.out.println(id);
        Users cheack = usersRepository.findById(id);
        if (cheack != null) {
            cheack.setName(user.getName());
            cheack.setEmail(user.getEmail());
            cheack.setPassword(user.getPassword());

            Users newUser = usersRepository.save(cheack);

         return new ResponseEntity<>(newUser,HttpStatus.OK);
        }
        return new ResponseEntity<>(null,HttpStatus.CONFLICT);

    }
    @DeleteMapping("/deleteUsers/{id}")
    public ResponseEntity deleteUsers(@PathVariable Long id) {
        usersRepository.deleteById(id);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
    @PostMapping("/logIN")
    public ResponseEntity<Users> logIN(@RequestBody Users user){
      Users userFind =usersRepository.findUsersByName(user.getName());
        if(userFind==null){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        if(userFind.getPassword().equals(user.getPassword())){
        return new ResponseEntity<>(userFind,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.CONFLICT);
    }

    @PostMapping("/upload")
    public ResponseEntity<Users> upload(@RequestPart("users") Users users, @RequestPart("image") MultipartFile file ) throws IOException {
        Path pathImage = Paths.get(DIRECTORY_PATH + file.getOriginalFilename());
        //שמירת התמונה בנתיב
        Files.write(pathImage,file.getBytes());
        //עידכון ניתוב בdata
        users.setImage(pathImage.toString());
        Users newUser= usersRepository.save(users);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

//    @GetMapping("/getImageById/{id}")
//    public ResponseEntity<UsersDTO> getImageById(@PathVariable Long id) throws IOException{
//        Users newUser=usersRepository.findById(id).orElse(null);
//        Path path= Paths.get(newUser.getImage());
//        byte[] bytes= Files.readAllBytes(path);
//        UsersDTO usersDTO=new UsersDTO();
//        usersDTO.setId(newUser.getId());
//        usersDTO.setImage(bytes);
//        return new ResponseEntity<>(mapStructMapper.usersToUsersDTO(newUser), HttpStatus.OK);
//    }
//    @PostMapping("/signup")
//    public ResponseEntity<UsersDTO> signup(@RequestBody Users user) throws IOException {
//        Users userFind =usersRepository.findUsersByNameEquals(user.getName());
//        if(userFind!=null) {
//            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
//        }
//        user.setImage(DIRECTORY_PATH+"5.jpg");
//        Users newUser=usersRepository.save(user);
//        return new ResponseEntity<>(mapStructMapper.usersToUsersDTO(newUser),HttpStatus.CREATED);
//    }

    @PostMapping("/signup")
    public ResponseEntity<Users> signup(@RequestBody Users user)  {
        Users userFind =usersRepository.findUsersByName(user.getName());
        if(userFind==null) {
            Users newUser=usersRepository.save(user);
            return new ResponseEntity<>(newUser,HttpStatus.CREATED);
        }
        return new ResponseEntity<>(null, HttpStatus.CONFLICT);

    }
}
