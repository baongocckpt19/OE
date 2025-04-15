package com.example.backend.controller;

import com.example.backend.model.Exam;
import com.example.backend.services.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/exam")
@CrossOrigin(origins = "*") // Cho phép frontend gọi API
public class ExamController {

    @Autowired
    private ExamService examService;

    @PostMapping
    public String addExam(@RequestBody Exam exam, @RequestParam int userId) {
        examService.createExam(exam, userId);
        return "Đề thi đã được lưu thành công!";
    }
}
