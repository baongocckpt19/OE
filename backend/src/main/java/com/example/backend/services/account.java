package com.example.backend.services;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.example.backend.model.Student;
import com.example.backend.model.User;
import com.example.backend.repository.StudentRepository;

@Service
public class account {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private StudentRepository studentRepository;

    public Map<String, Object> login(String username, String password_hash, String role) {
        String sql = "SELECT * FROM users WHERE username = ? AND password_hash = ? AND role = ?";
        return jdbcTemplate.queryForMap(sql, username, password_hash, role);
    }

 public boolean register(Map<String, Object> data) {
    System.out.println("Dữ liệu nhận từ frontend: " + data);

    String username = (String) data.get("username");
    if (studentRepository.existsByUsername(username)) {
        System.out.println("Username đã tồn tại: " + username);
        return false;
    }

    String password = (String) data.get("password");
    String email = (String) data.get("email");
    String fullName = (String) data.get("fullname");
    String studentClass = (String) data.get("userClass");
    String role = (String) data.get("role");
    String dobStr = (String) data.get("dob");

    LocalDate birthday;
    try {
        birthday = LocalDate.parse(dobStr); // ISO format: yyyy-MM-dd
    } catch (DateTimeParseException e) {
        System.out.println("Lỗi định dạng ngày sinh: " + dobStr);
        return false;
    }



    String passwordHash = password; // Không mã hóa

    Student newUser = new Student(
        username,
        passwordHash,
        email,
        fullName,
        birthday,
        studentClass,
        role
    );
    return false;

   
}
    
    public int getTotalStudents() {
        String sql = "SELECT COUNT(*) FROM users WHERE role = 'student'";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }

    public int getTotalQuestions() {
        String sql = "SELECT COUNT(*) FROM questions";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }

    public int getTotalExams() {
        String sql = "SELECT COUNT(*) FROM exams";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }
}
