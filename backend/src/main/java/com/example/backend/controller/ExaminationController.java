package com.example.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Examination;
import com.example.backend.services.ExaminationService;

@RestController
@RequestMapping("/api/examinations")
@CrossOrigin(origins = "*") // Adjust if your Angular app runs on a different port
public class ExaminationController {
    private final ExaminationService examinationService;

    public ExaminationController(ExaminationService examinationService) {
        this.examinationService = examinationService;
    }
    

    @GetMapping("")
    public ResponseEntity<List<Examination>> getAllExaminations() {
        List<Examination> examinations = examinationService.getAllExaminations();
        return new ResponseEntity<>(examinations, HttpStatus.OK);
    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

}