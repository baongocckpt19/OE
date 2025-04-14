package com.example.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Question;
import com.example.backend.repository.QuestionRepository;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "*")
public class QuestionController {
    private final QuestionRepository repo;

    public QuestionController(QuestionRepository repo) {
        this.repo = repo;
    }

    @GetMapping("")
    public List<Question> getAllQuestions() {
        return repo.findAll();
    }

    @GetMapping("/filter")
    public List<Question> getFilteredQuestions(
            @RequestParam(required = false) String subject,
            @RequestParam(required = false) String difficulty) {

        if (subject != null && difficulty != null) {
            return repo.findBySubjectAndDifficulty(subject, difficulty);
        } else if (subject != null) {
            return repo.findBySubject(subject);
        } else if (difficulty != null) {
            return repo.findByDifficulty(difficulty);
        }
        return repo.findAll();
    }
}
