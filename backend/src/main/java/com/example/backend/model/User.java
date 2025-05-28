package com.example.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "users") // Ánh xạ với tên bảng trong CSDL
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id") // Ánh xạ với tên cột trong bảng
    private Long userId;
    
    @Column(name = "username", nullable = false, unique = true)
    private String username;
    
    @Column(name = "password_hash", nullable = false)
    private String passwordHash;
    
    @Column(name = "email", nullable = false, unique = true)
    private String email;
    
    @Column(name = "full_name", nullable = false)
    private String fullName;
    
    @Column(name = "birthday")
    private LocalDate birthday; // Sử dụng LocalDate thay vì String
    
    @Column(name = "class", nullable = false)
    private String studentClass;
    
    @Column(name = "role", nullable = false)
    private String role;
    
    @Column(name = "created_at", updatable = false)
    private LocalDate createdAt;

    // Constructor mặc định
    public User() {}

    // Constructor có tham số
    public User(String username, String passwordHash, String email, 
                   String fullName, LocalDate birthday, String studentClass, 
                   String role) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.email = email;
        this.fullName = fullName;
        this.birthday = birthday;
        this.studentClass = studentClass;
        this.role = role;
        this.createdAt = LocalDate.now();
    }
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public String getStudentClass() {
        return studentClass;
    }

    public void setStudentClass(String studentClass) {
        this.studentClass = studentClass;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }


}