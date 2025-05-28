package com.example.backend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.model.UserAnswer;
import com.example.backend.repository.UserAnswerRepository;

@Service
public class UserAnswerService {

    private final UserAnswerRepository userAnswerRepository;

    public UserAnswerService(UserAnswerRepository userAnswerRepository) {
        this.userAnswerRepository = userAnswerRepository;
    }

    public UserAnswer saveAnswer(UserAnswer answer) {
        return userAnswerRepository.save(answer);
    }

    public List<UserAnswer> getAnswersByUserAndExam(Long userId, Long examId) {
        return userAnswerRepository.findByUserIdAndExamId(userId, examId);
    }

    public List<UserAnswer> getAllAnswers() {
        return userAnswerRepository.findAll();
    }

    public void deleteAnswer(Long id) {
        userAnswerRepository.deleteById(id);
    }
}