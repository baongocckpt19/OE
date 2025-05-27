package com.example.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.Student;

import com.example.backend.repository.UserRepository;
@Service 
public class  UserService {
    private final UserRepository  userRepository ;
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public List<Student> getAllUsers() {
        return userRepository.findByRole("Teacher");
    }
    public List<Student> getUsersByRole(String role) {
        return userRepository.findByRole(role);
    }
    public Optional<Student> getUserById(Long id) {
        return userRepository.findById(id);
    }
}
