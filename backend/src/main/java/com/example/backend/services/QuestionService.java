package com.example.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.Question;
import com.example.backend.repository.QuestionRepository;

import jakarta.transaction.Transactional;
@Service
public class QuestionService {
    private final QuestionRepository questionRepository;

    @Autowired
    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Optional<Question> getQuestionById(Long id) {
        return questionRepository.findById(id);
    }

    public List<Question> getQuestionsBySubject(String subject) {
        return questionRepository.findBySubject(subject);
    }

    public List<Question> getQuestionsByDifficulty(String difficulty) {
        return questionRepository.findByDifficulty(difficulty);
    }

    public List<Question> getQuestionsBySubjectAndDifficulty(String subject, String difficulty) {
        return questionRepository.findBySubjectAndDifficulty(subject, difficulty);
    }

    @Transactional
    public void deleteQuestion(Long id) {
            questionRepository.deleteUserAnswersByQuestionId(id); // Xóa bản ghi liên quan trong user_answers
            questionRepository.deleteQuestionDetailsByQuestionId(id); // Xóa bản ghi liên quan trong questions
            questionRepository.deleteByQuestionId(id); // Sau đó xóa câu hỏi từ question_bank
    }


    public Question saveQuestion(Question question) {
        return questionRepository.save(question);
    }

}
