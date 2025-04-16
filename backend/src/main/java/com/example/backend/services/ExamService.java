package com.example.backend.services;

import com.example.backend.model.Exam;
import com.example.backend.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ExamService {

    @Autowired
    private ExamRepository examRepository;

    public void createExam(Exam exam, int userId) {
//        exam.setCreatedBy(userId);
//        exam.setCreatedAt(LocalDateTime.now());
        examRepository.saveExam(exam, userId);
    }
}
