package com.example.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "questions") // Đây là bảng trung gian 'questions' trong DB của bạn
public class ExamQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id") // <-- PK của bảng trung gian
    private Long id;

    @ManyToOne
    @JoinColumn(name = "exam_id", nullable = false)
    @JsonBackReference
    private Dethi exam;

    @ManyToOne
    @JoinColumn(name = "question_bank_id", nullable = false, referencedColumnName = "question_id") // <-- THÊM `referencedColumnName`
    private Question questionBank; // Đổi tên từ QuestionBank thành Question để khớp với model của bạn

    // Constructors
    public ExamQuestion() {
    }

    public ExamQuestion(Dethi exam, Question questionBank) {
        this.exam = exam;
        this.questionBank = questionBank;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Dethi getExam() {
        return exam;
    }

    public void setExam(Dethi exam) {
        this.exam = exam;
    }

    public Question getQuestionBank() {
        return questionBank;
    }

    public void setQuestionBank(Question questionBank) {
        this.questionBank = questionBank;
    }
}