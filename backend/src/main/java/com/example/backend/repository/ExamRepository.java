package com.example.backend.repository;

import com.example.backend.model.Exam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ExamRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void saveExam(Exam exam) {
        String sql = "INSERT INTO exams (exam_name, description, duration, created_at, created_by) " +
                "VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                exam.getExamName(),
                exam.getDescription(),
                exam.getDuration(),
                exam.getCreatedAt(),
                exam.getCreatedBy());
    }
}
