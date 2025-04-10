package com.example.backend.controller;

import com.example.backend.services.account; // Giả sử bạn có service quản lý user
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class DashboardController {

    @Autowired
    private account account;

    @GetMapping("/students/count")
    public ResponseEntity<Map<String, Integer>> getTotalStudents() {
        int totalStudents = account.getTotalStudents();
        return ResponseEntity.ok(Map.of("totalStudents", totalStudents));
    }
    @GetMapping("/questions/count")
    public ResponseEntity<Map<String, Integer>> getTotalQuestions() {
        int totalQuestions = account.getTotalQuestions();
        return ResponseEntity.ok(Map.of("totalQuestions", totalQuestions));
    }
    @GetMapping("/exams/count")
    public ResponseEntity<Map<String, Integer>> getTotalExxams() {
        int totalExams = account.getTotalExams();
        return ResponseEntity.ok(Map.of("totalExams", totalExams));
    }
}