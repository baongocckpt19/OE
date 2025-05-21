package com.example.backend.model;


import java.util.List;

public class DethiDetailResponse {
    private Dethi exam;
    private List<Question> questions; // <-- Thay đổi kiểu dữ liệu thành List<QuestionBank>

    public DethiDetailResponse(Dethi exam, List<Question> questions) {
        this.exam = exam;
        this.questions = questions;
    }

    // Getters and Setters (Giữ nguyên tên biến 'exam' và 'questions' để khớp với frontend)
    public Dethi getExam() {
        return exam;
    }

    public void setExam(Dethi exam) {
        this.exam = exam;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }
}