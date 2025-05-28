package com.example.backend.services;

import com.example.backend.model.User;
import com.example.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service // Thêm annotation này
public class StudentService {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<User> getAllStudents() {
        return studentRepository.findByRole("student");
    }

    public void deleteStudent(Long id) {
        System.out.println("⛔ Deleting user ID: " + id); // debug

        try {
            studentRepository.deleteUserAnswers(id);
            studentRepository.deleteExamAttempts(id);
            studentRepository.deleteResults(id);
            studentRepository.deleteUserById(id);
            System.out.println("✅ Deleted user and related data: " + id);
        } catch (Exception e) {
            System.err.println("🔥 Error deleting user: " + e.getMessage());
            throw e; // rollback
        }
    }

    // Thêm các phương thức mới phù hợp với repository
    public List<User> getStudentsByClass(String className) {
        return studentRepository.findByStudentClass(className);
    }

    public List<User> getStudentsByRole(String role) {
        return studentRepository.findByRole(role);
    }
    
    public List<User> getStudentsByEmailDomain(String domain) {
        return studentRepository.findByEmailDomain(domain);
    }
}