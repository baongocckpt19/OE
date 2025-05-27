package com.example.backend.model;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "results")
public class Result {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "result_id")
    private int resultId;
    
    @Column(name = "user_id")
    private int userId;
    
    @Column(name = "exam_id")
    private int examId;
    
    @Column(name = "score")
    private int score;
    
    @Column(name = "submitted_at")
    private LocalDateTime submittedAt;

    // Constructor mặc định (bắt buộc cho JPA/Hibernate)
    public Result() {
    }

    // Constructor có tham số
    public Result(int userId, int examId, int score, LocalDateTime submittedAt) {
        this.userId = userId;
        this.examId = examId;
        this.score = score;
        this.submittedAt = submittedAt;
    }

    // Getter và Setter
    public int getResultId() {
        return resultId;
    }

    public void setResultId(int resultId) {
        this.resultId = resultId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getExamId() {
        return examId;
    }

    public void setExamId(int examId) {
        this.examId = examId;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }
}