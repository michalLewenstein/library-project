package com.example.finaljavaproject.DTO;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

public class UsersDTO {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String password;
    private String email;
    private byte []  image;
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
    public byte[] getImage() {
        return image;
    }
    public void setImage(byte[] image) {
        this.image = image;
    }
}
