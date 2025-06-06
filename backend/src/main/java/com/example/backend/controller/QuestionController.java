package com.example.backend.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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
        List<Question> questions = questionService.getAllActiveQuestions();
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }


    @PutMapping("/archive/{id}")
    public ResponseEntity<?> softDeleteQuestion(@PathVariable Long id) {
        Optional<Question> optionalQuestion = questionService.getQuestionById(id);
        if (optionalQuestion.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy câu hỏi.");
        }
        Question question = optionalQuestion.get();
        question.setIsArchived(true);
        questionService.saveQuestion(question);
        return ResponseEntity.ok("Câu hỏi đã được ẩn (is_archived = true).");
    }

    @PostMapping("") 
    public ResponseEntity<Question> createQuestion(@RequestBody Question question) {
        question.setCreatedAt(LocalDate.now());
        Question savedQuestion = questionRepository.save(question); // Use the repository here
        return ResponseEntity.ok(savedQuestion);
    }

    //đẩy câu hỏi lên tuwf dtb để thực hiện sửa
    @PutMapping("/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable Long id, @RequestBody Question updatedQuestion) {
        return questionService.getQuestionById(id).map(existingQuestion -> {
            existingQuestion.setQuestionText(updatedQuestion.getQuestionText());
            existingQuestion.setOption1(updatedQuestion.getOption1());
            existingQuestion.setOption2(updatedQuestion.getOption2());
            existingQuestion.setOption3(updatedQuestion.getOption3());
            existingQuestion.setOption4(updatedQuestion.getOption4());
            existingQuestion.setCorrectOption(updatedQuestion.getCorrectOption());
            existingQuestion.setNameOfSubject(updatedQuestion.getNameOfSubject());
            existingQuestion.setDifficulty(updatedQuestion.getDifficulty());
            existingQuestion.setCreatedBy(updatedQuestion.getCreatedBy());
            // Không cập nhật createdAt để giữ nguyên thời điểm tạo ban đầu

            Question saved = questionService.saveQuestion(existingQuestion);
            return new ResponseEntity<>(saved, HttpStatus.OK);
        }).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
