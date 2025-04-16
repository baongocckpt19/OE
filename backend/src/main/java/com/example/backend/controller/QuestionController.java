package com.example.backend.controller;

import java.time.LocalDate;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Question;
import com.example.backend.services.QuestionService;
import com.example.backend.repository.QuestionRepository; // Import the repository

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "*")
public class QuestionController {
    private final QuestionService questionService;
    private final QuestionRepository questionRepository; // Add QuestionRepository

    public QuestionController(QuestionService questionService, QuestionRepository questionRepository) { // Add to constructor
        this.questionService = questionService;
        this.questionRepository = questionRepository;
    }

    @GetMapping("")
    public ResponseEntity<List<Question>> getAllQuestions() {
        List<Question> questions = questionService.getAllQuestions();
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long id) {
        try {
            questionService.deleteQuestion(id);
            return new ResponseEntity<>("Câu hỏi và các chi tiết liên quan đã được xóa.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("") 
    public ResponseEntity<Question> createQuestion(@RequestBody Question question) {
        question.setCreatedAt(LocalDate.now());
        Question savedQuestion = questionRepository.save(question); // Use the repository here
        return ResponseEntity.ok(savedQuestion);
    }
}
