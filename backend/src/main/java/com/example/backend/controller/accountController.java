package com.example.backend.controller;

import com.example.backend.services.account;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class accountController {

    @Autowired
    private account accountService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginRequest, HttpSession session) {
        String username = loginRequest.get("username");
        String password_hash = loginRequest.get("password_hash");
        String role = loginRequest.getOrDefault("role", "student");
        Map<String, Object> user = accountService.login(username, password_hash, role);

        if (user != null) {
            // Kiểm tra vai trò sau khi đăng nhập thành công
            if (user.containsKey("role") && user.get("role").equals(role)) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Đăng nhập thành công");
                response.put("user", user);
                response.put("role", user.get("role"));
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Vai trò không hợp lệ"));
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Sai email hoặc mật khẩu hoặc tài khoản bị khóa"));
        }
    }
}