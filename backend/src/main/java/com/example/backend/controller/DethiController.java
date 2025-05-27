package com.example.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Dethi;
import com.example.backend.model.DethiDetailResponse;
import com.example.backend.services.DethiService; // Đã sửa lại import (services -> service)

@RestController // <--- Thêm annotation này
@RequestMapping("/api/dethi") // <--- Thêm annotation này để định nghĩa base path cho các endpoint
@CrossOrigin(origins = "http://localhost:4200")
public class DethiController {
    @Autowired
    private DethiService examService;

    public DethiController(DethiService examService) {
        this.examService = examService;
    }

    @PostMapping("/addExam")
    public ResponseEntity<?> createExam(@RequestBody Dethi exam, @RequestParam int userId) {
        try {
            Long examId = examService.createExam(exam, userId);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Thêm đề thi thành công!");
            response.put("examId", examId); // Trả về ID của đề thi
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi khi thêm đề thi: " + e.getMessage());
        }
    }

    // Endpoint mới để thêm câu hỏi vào đề thi
    @PostMapping("/{examId}/questions")
    public ResponseEntity<?> addQuestionsToExam(@PathVariable("examId") Long examId,
            @RequestBody List<Long> questionBankIds) {
        System.out.println("Received request to add questions to exam. Exam ID: " + examId);
        System.out.println("Question IDs to add: " + questionBankIds);

        try {
            examService.addQuestionsToExam(examId, questionBankIds);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Thêm câu hỏi vào đề thi thành công!");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
        error.put("error", "Lỗi: " + e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping
    public ResponseEntity<List<Dethi>> getAllExams() {
        List<Dethi> exams = examService.getAllExams();
        return new ResponseEntity<>(exams, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Dethi> getExamById(@PathVariable Long id) { // <--- Chỉ trả về Dethi
        Dethi exam = examService.getExamById(id);
        if (exam != null) {
            return new ResponseEntity<>(exam, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/details/{id}")
    public ResponseEntity<DethiDetailResponse> getDethiDetails(@PathVariable Long id) {
        Optional<DethiDetailResponse> response = examService.getDethiDetails(id);
        return response.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}