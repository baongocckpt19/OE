package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.services.StudentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:4200")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllStudents() {
        List<User> students = studentService.getAllStudents();
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    @GetMapping("/class/{className}")
    public ResponseEntity<List<User>> getStudentsByClass(@PathVariable String className) {
        List<User> students = studentService.getStudentsByClass(className);
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<List<User>> getStudentsByRole(@PathVariable String role) {
        List<User> students = studentService.getStudentsByRole(role);
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    @GetMapping("/email/{domain}")
    public ResponseEntity<List<User>> getStudentsByEmailDomain(@PathVariable String domain) {
        List<User> students = studentService.getStudentsByEmailDomain(domain);
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {
        try {
            studentService.deleteStudent(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}