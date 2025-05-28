package com.example.backend.controller;

import java.util.List;

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
}
