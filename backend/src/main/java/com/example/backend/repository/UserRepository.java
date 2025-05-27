package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.model.Student;

@Repository
public interface UserRepository extends JpaRepository<Student, Long> {
    List<Student> findByRole(String role);
    
}
