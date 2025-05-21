package com.example.backend.controller;

import com.example.backend.model.Exam;
import com.example.backend.services.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/exam")
@CrossOrigin(origins = "*") // Cho phép frontend gọi API
public class ExamController {

    @Autowired
    private ExamService examService;

    @PostMapping
    public ResponseEntity<?> addExam(@RequestBody Exam exam, @RequestParam int userId) {
        examService.createExam(exam, userId);
        return ResponseEntity.ok(Map.of("message", "Exam created successfully"));
    }
// ExamController.java
@GetMapping("/{id}")
public ResponseEntity<Map<String, Object>> getExamById(@PathVariable Long id) {
    Exam exam = examService.getExamById(id);
    List<Question> questions = examService.getQuestionsByExamId(id);
    
    return ResponseEntity.ok(Map.of(
        "exam", exam,
        "questions", questions
    ));
}

}
