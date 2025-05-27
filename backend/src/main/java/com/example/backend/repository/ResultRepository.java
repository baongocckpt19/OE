package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.model.Result;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long > {
    List<Result> findByUserId(Long  userId);
}
