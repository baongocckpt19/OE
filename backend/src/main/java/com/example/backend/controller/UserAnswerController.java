package com.example.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.UserAnswer;
import com.example.backend.services.UserAnswerService;
import com.example.backend.model.ExamSubmissionRequest;
import com.example.backend.model.UserAnswer;

@RestController
@RequestMapping("/api/userAnswers")
@CrossOrigin(origins = "*")
public class UserAnswerController {

    private final UserAnswerService userAnswerService;

    public UserAnswerController(UserAnswerService userAnswerService) {
        this.userAnswerService = userAnswerService;
    }

    @PostMapping
    public ResponseEntity<UserAnswer> submitAnswer(@RequestBody UserAnswer userAnswer) {
        UserAnswer saved = userAnswerService.saveAnswer(userAnswer);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<UserAnswer>> getAllAnswers() {
        return ResponseEntity.ok(userAnswerService.getAllAnswers());
    }

    @GetMapping("/user/{userId}/exam/{examId}")
    public ResponseEntity<List<UserAnswer>> getAnswersByUserAndExam(
            @PathVariable Long userId,
            @PathVariable Long examId) {
        return ResponseEntity.ok(userAnswerService.getAnswersByUserAndExam(userId, examId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnswer(@PathVariable Long id) {
        userAnswerService.deleteAnswer(id);
        return ResponseEntity.noContent().build();
    }

    //lưu lại aaau trả lời vaào dtb
    @PostMapping("/submit-exam")
    public ResponseEntity<Map<String, Object>> submitExam(@RequestBody ExamSubmissionRequest submission) {
        try {
            int score = userAnswerService.submitAndScore(submission);
            return ResponseEntity.ok(Map.of(
                    "message", "Nộp bài thành công!",
                    "score", score
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Lỗi khi xử lý bài thi."));
        }
    }
    @PostMapping(path = "/submit-exam", consumes = "application/json")
    public ResponseEntity<Map<String, Object>> submitExamViaBeacon(@RequestBody ExamSubmissionRequest request) {
        int score = userAnswerService.submitAndScore(request);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Exam submitted successfully");
        response.put("score", score);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/review-exam/{examId}")
    public ResponseEntity<?> reviewSubmittedExam(
            @PathVariable Long examId,
            @RequestParam Long userId) {

        return ResponseEntity.ok(userAnswerService.getSubmittedExam(examId, userId));
    }




}
