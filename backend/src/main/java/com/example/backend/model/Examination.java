package com.example.backend.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "examinations")
public class Examination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "examination_id")
    private Long id;

    private String title;
    private String description;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_at")
    private LocalDate createdDate; // Assuming you have this field
    // Add other relevant fields (subject, state, etc.)

    // Constructors, Getters, and Setters
    public Examination() {
    }

    public Examination(String title, String description, String createdBy, LocalDate createdDate) {
        this.title = title;
        this.description = description;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

}
