package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.model.Examination;

@Repository
public interface ExaminationRepository extends JpaRepository<Examination, Long> {
    // You can add custom query methods here if needed
    List<Examination> findAll();

}

