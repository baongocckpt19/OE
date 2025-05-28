package com.example.backend.controller;

import com.example.backend.repository.ResultRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "http://localhost:4200")
public class DashboardStudentController {

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private UserRepository userRepository;

    // ✅ Lấy tất cả học sinh
    @GetMapping("/students")
    public ResponseEntity<List<Map<String, Object>>> getAllStudents() {
        List<User> students = userRepository.findByRole("student");

        List<Map<String, Object>> result = students.stream()
            .map(user -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", user.getUserId());
                map.put("fullName", user.getFullName());
                map.put("email", user.getEmail());
                map.put("class", user.getStudentClass());
                return map;
            })
            .collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }

    // ✅ Lấy thông tin tổng hợp của học sinh
    @GetMapping("/{studentId}/summary")
    public ResponseEntity<Map<String, Object>> getStudentSummary(@PathVariable int studentId) {
        Double avg = resultRepository.findAverageScoreByStudentId(studentId);
        int completed = resultRepository.countCompletedExams(studentId);

        Optional<User> optionalUser = userRepository.findById((long) studentId);
        Map<String, String> studentInfo = new HashMap<>();
        optionalUser.ifPresent(user -> {
            studentInfo.put("fullName", user.getFullName());
            studentInfo.put("email", user.getEmail());
            studentInfo.put("class", user.getStudentClass());
        });

        Map<String, Object> response = new HashMap<>();
        response.put("averageScore", avg != null ? Math.round(avg * 100.0) / 100.0 : 0);
        response.put("completedExams", completed);
        response.put("studentInfo", studentInfo);

        return ResponseEntity.ok(response);
    }

    // ✅ Lấy điểm gần nhất của học sinh
   @GetMapping("/{studentId}/recent-scores")
public ResponseEntity<?> getRecentScores(@PathVariable int studentId) {
    try {
        System.out.println("Calling recent-scores with ID: " + studentId);
        List<Object[]> rawResults = resultRepository.findTop6RecentScores(studentId);
        System.out.println("Result size: " + rawResults.size());

        List<Map<String, Object>> result = new ArrayList<>();
        for (Object[] row : rawResults) {
            System.out.println("Row: " + Arrays.toString(row));
            Map<String, Object> map = new HashMap<>();
            map.put("exam_name", row[0]);
            map.put("score", row[1]);
            result.add(map);
        }

        return ResponseEntity.ok(result);
    } catch (Exception e) {
        e.printStackTrace(); // 🔴 In ra log lỗi thực tế
        Map<String, String> error = new HashMap<>();
        error.put("message", e.getMessage());
        return ResponseEntity.status(500).body(error);
    }
}}