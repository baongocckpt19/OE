package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.backend.model.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {
        @Query(value = "SELECT * FROM question_bank  WHERE name_of_subject = :subject", nativeQuery = true)
    List<Question> findBySubject(@Param("subject") String subject);

    @Query(value = "SELECT * FROM question_bank WHERE difficulty = :difficulty", nativeQuery = true)
    List<Question> findByDifficulty(@Param("difficulty") String difficulty);

    @Query(value = "SELECT * FROM question_bank WHERE name_of_subject = :subject AND difficulty = :difficulty", nativeQuery = true)
    List<Question> findBySubjectAndDifficulty(
        @Param("subject") String subject,
        @Param("difficulty") String difficulty
    );
}
