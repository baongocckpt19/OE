package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Dethi;
import com.example.backend.services.DethiService; // Đã sửa lại import (services -> service)

@RestController // <--- Thêm annotation này
@RequestMapping("/api/dethi") // <--- Thêm annotation này để định nghĩa base path cho các endpoint
public class DethiController {
    @Autowired
    private DethiService examService;

    @PostMapping
    public ResponseEntity<Dethi> createNewExam(
            @RequestParam String examName,
            @RequestParam(required = false) String description,
            @RequestParam Integer duration,
            @RequestParam String createdBy) {
        Dethi createdExam = examService.createExam(examName, description, duration, createdBy);
        return new ResponseEntity<>(createdExam, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Dethi>> getAllExams() {
        List<Dethi> exams = examService.getAllExams();
        return new ResponseEntity<>(exams, HttpStatus.OK);
    }

    @GetMapping("/{id}") // Endpoint để lấy một kỳ thi theo ID
    public ResponseEntity<Dethi> getExamById(@PathVariable Long id) {
        Dethi exam = examService.getExamById(id);
        if (exam != null) {
            return new ResponseEntity<>(exam, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/search") // Endpoint để tìm kiếm kỳ thi theo tên
    public ResponseEntity<List<Dethi>> searchExams(@RequestParam String name) {
        List<Dethi> exams = examService.findByExamNameContainingIgnoreCase(name);
        return new ResponseEntity<>(exams, HttpStatus.OK);
    }
}