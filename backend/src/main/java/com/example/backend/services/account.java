package com.example.backend.services;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.example.backend.model.Student;
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
    System.out.println("📥 Dữ liệu nhận từ frontend: " + data);

    String username = (String) data.get("username");
    if (studentRepository.existsByUsername(username)) {
        System.out.println("⛔ Username đã tồn tại: " + username);
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
        System.out.println("⛔ Lỗi định dạng ngày sinh: " + dobStr);
        return false;
    }

    // ✅ In log từng trường để dễ kiểm tra lỗi
    System.out.println("👤 username = " + username);
    System.out.println("🔐 password = " + password);
    System.out.println("📧 email = " + email);
    System.out.println("🧍 fullname = " + fullName);
    System.out.println("🏫 class = " + studentClass);
    System.out.println("📅 dob = " + dobStr);
    System.out.println("📆 birthday (parsed) = " + birthday);
    System.out.println("🎓 role = " + role);

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

    // ✅ Bọc save trong try-catch để phát hiện lỗi ghi CSDL
    try {
        studentRepository.save(newUser);
        System.out.println("✅ Lưu user vào database: " + username);
        return true;
    } catch (Exception e) {
        System.out.println("❌ Lỗi khi lưu vào DB: " + e.getMessage());
        e.printStackTrace();
        return false;
    }
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
