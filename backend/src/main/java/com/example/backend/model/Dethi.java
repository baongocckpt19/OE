package com.example.backend.model;

import java.time.LocalDate;
import java.time.LocalDateTime;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity // <--- Đảm bảo annotation này có
@Table(name = "exams")
public class Dethi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Tự động tăng ID
    @Column(name = "exam_id")
    private Long examId;

    @Column(name = "exam_name", nullable = false)
    private String examName;

    @Column(name = "description")
    private String description;

    @Column(name = "name_of_subject")
    private String name_of_subject;

    @Column(name = "duration")
    private Integer duration; // Thời gian có thể tính bằng phút

    @Column(name = "created_by", nullable = false)
    private String createdBy;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDate createdAt;

    // Constructors (No-arg and with fields)
    public Dethi() {
        this.createdAt = LocalDate.now(); // Set thời gian tạo mặc định
    }

    public Dethi(String examName, String description, Integer duration, String createdBy,String name_of_subject) {
        this.examName = examName;
        this.description = description;
        this.duration = duration;
        this.createdBy = createdBy;
        this.createdAt = LocalDate.now();
        this.name_of_subject = name_of_subject;
    }

    // Getters and Setters
    public String getName_of_subject() {
        return name_of_subject;
    }

    public void setName_of_subject(String name_of_subject) {
        this.name_of_subject = name_of_subject;
    }

    public Long getExamId() {
        return examId;
    }

    public void setExamId(Long examId) {
        this.examId = examId;
    }

    public String getExamName() {
        return examName;
    }

    public void setExamName(String examName) {
        this.examName = examName;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description ) {
        this.description = description;
    }
    public Integer getDuration() {
        return duration;
    }
    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(int userId) {
         this.createdBy = String.valueOf(userId);
    }

    public void setCreatedAt(LocalDate now) {
    }
    public LocalDate getCreatedAt() {
        return createdAt;
    }
}
