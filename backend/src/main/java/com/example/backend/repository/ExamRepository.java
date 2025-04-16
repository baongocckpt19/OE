package com.example.backend.repository;

import com.example.backend.model.Exam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public class ExamRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void saveExam(Exam exam, int userId) {
        String sql = "INSERT INTO exams (exam_name, description, duration, created_at, created_by) " +
                "VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                exam.getExamName(),
                exam.getDescription(),
                exam.getDuration(),
                LocalDateTime.now(),
                userId);
    }
}
