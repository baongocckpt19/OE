package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.services.ResultService;
import com.example.backend.model.Result;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(origins = "http://localhost:4200")
public class ResultController {
    @Autowired
    private ResultService resultService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Result>> getResultsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(resultService.getResultsByUserId(userId));
    }
    @GetMapping("/exam/{examId}")
    public ResponseEntity<List<Object[]>> getResultsByExamId(@PathVariable int examId) {
        return ResponseEntity.ok(resultService.getResultsByExamId(examId));
    }

}
