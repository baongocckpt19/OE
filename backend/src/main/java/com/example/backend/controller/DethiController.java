package com.example.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.example.backend.model.ExamSubmissionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Dethi;
import com.example.backend.model.DethiDetailResponse;
import com.example.backend.services.DethiService;

@RestController
@RequestMapping("/api/dethi")
@CrossOrigin(origins = "http://localhost:4200")
public class DethiController {

    private final DethiService examService;

    @Autowired
    public DethiController(DethiService examService) {
        this.examService = examService;
    }

    @PostMapping("/addExam")
    public ResponseEntity<?> createExam(@RequestBody Dethi exam, @RequestParam int userId) {
        try {
            Long examId = examService.createExam(exam, userId);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Thêm đề thi thành công!");
            response.put("examId", examId);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi khi thêm đề thi: " + e.getMessage());
        }
    }

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

    // ✅ Thêm endpoint mới để thay thế toàn bộ câu hỏi
    @PutMapping("/{examId}/replace-questions")
    public ResponseEntity<?> replaceQuestionsInExam(@PathVariable Long examId, @RequestBody List<Long> questionIds) {
        try {
            examService.replaceQuestions(examId, questionIds);
            return ResponseEntity.ok("Danh sách câu hỏi đã được cập nhật cho đề thi.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi khi cập nhật danh sách câu hỏi: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Dethi>> getAllExams() {
        List<Dethi> exams = examService.getAllExams();
        return new ResponseEntity<>(exams, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Dethi> getExamById(@PathVariable Long id) {
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

    @PostMapping("/submit-exam")
    public ResponseEntity<?> submitExam(@RequestBody ExamSubmissionRequest submission) {
        try {
            int score = examService.evaluateAndSave(submission);
            return ResponseEntity.ok(Map.of("score", score));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Nộp bài thất bại: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExam(@PathVariable("id") Long examId) {
        try {
            examService.deleteExamWithDependencies(examId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi khi xóa đề thi: " + e.getMessage());
        }
    }

    @PutMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<Map<String, String>> updateExam(@PathVariable Long id, @RequestBody Dethi updatedExam) {
        Map<String, String> response = new HashMap<>();
        try {
            boolean success = examService.updateExam(id, updatedExam);
            if (success) {
                response.put("message", "Cập nhật đề thi thành công");
                return ResponseEntity.ok().body(response);
            } else {
                response.put("error", "Không tìm thấy đề thi");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception e) {
            response.put("error", "Lỗi khi cập nhật đề thi: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
