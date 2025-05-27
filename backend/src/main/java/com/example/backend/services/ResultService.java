package com.example.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.Result;
import com.example.backend.repository.ResultRepository;

@Service
public class ResultService {
    @Autowired
    private ResultRepository resultRepository;
    
//     public List<Result> getResultsByUserId(Long userId) {
//     return resultRepository.findByUserId(userId);
// }
public List<Result> getResultsByUserId(Long userId) {
    List<Result> results = resultRepository.findByUserId(userId);
    System.out.println("Results for user " + userId + ": " + results.size());
    return results;
}

}
