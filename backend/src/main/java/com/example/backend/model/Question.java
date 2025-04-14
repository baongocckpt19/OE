package com.example.backend.model;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
@Table(name = "question_bank")
public class Question {

    @Id
    @Column(name = "question_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "question_text")
    private String questionText;

    private String option1;
    private String option2;
    private String option3;
    private String option4;

    @Column(name = "correct_option")
    private int correctOption;

    @Column(name = "name_of_subject")
    private String nameOfSubject;

    private String difficulty;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_at")
    private LocalDate createdAt;

    public Question() {}

    public Question(Long id, String questionText, String option1, String option2,
                    String option3, String option4, int correctOption,
                    String nameOfSubject, String difficulty,
                    String createdBy, LocalDate createdAt) {
        this.id = id;
        this.questionText = questionText;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
        this.correctOption = correctOption;
        this.nameOfSubject = nameOfSubject;
        this.difficulty = difficulty;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getQuestionText() {
        return questionText;
    }

    public String getOption1() {
        return option1;
    }

    public String getOption2() {
        return option2;
    }

    public String getOption3() {
        return option3;
    }

    public String getOption4() {
        return option4;
    }

    public int getCorrectOption() {
        return correctOption;
    }

    public String getNameOfSubject() {
        return nameOfSubject;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public void setOption1(String option1) {
        this.option1 = option1;
    }

    public void setOption2(String option2) {
        this.option2 = option2;
    }

    public void setOption3(String option3) {
        this.option3 = option3;
    }

    public void setOption4(String option4) {
        this.option4 = option4;
    }

    public void setCorrectOption(int correctOption) {
        this.correctOption = correctOption;
    }

    public void setNameOfSubject(String nameOfSubject) {
        this.nameOfSubject = nameOfSubject;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }
}
