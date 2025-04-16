package com.example.backend.model;
import java.time.LocalDateTime;

public class Exam {

    private String examName;
    private String description;
    private int duration;
    private LocalDateTime createdAt;
    private int createdBy;

    // Getter methods
    public String getExamName() { return examName; }
    public void setExamName(String examName) { this.examName = examName; }

    public String getDescription() {
        return description;
    }

    public int getDuration() {
        return duration;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public int getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(int userId) {
    }

    public void setCreatedAt(LocalDateTime now) {
    }

    // Các phương thức setter và constructor nếu cần
}
