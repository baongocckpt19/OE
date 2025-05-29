package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.backend.model.Question;

import jakarta.transaction.Transactional;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    @Query(value = "SELECT * FROM question_bank  WHERE name_of_subject = :subject", nativeQuery = true)
    List<Question> findBySubject(@Param("subject") String subject);

    @Query(value = "SELECT * FROM question_bank WHERE difficulty = :difficulty", nativeQuery = true)
    List<Question> findByDifficulty(@Param("difficulty") String difficulty);

    @Query(value = "SELECT * FROM question_bank WHERE name_of_subject = :subject AND difficulty = :difficulty", nativeQuery = true)
    List<Question> findBySubjectAndDifficulty(
            @Param("subject") String subject,
            @Param("difficulty") String difficulty);

    //thêm truy vấn active question cho cột is_archived
    @Query("SELECT q FROM Question q WHERE q.isArchived = false")
    List<Question> findAllActive();

@Query(value = "SELECT * FROM question_bank q " +
               "JOIN exam_questions eq ON q.question_id = eq.question_id " +
               "WHERE eq.exam_id = :examId", nativeQuery = true)
List<Question> findQuestionsByExamId(@Param("examId") Long examId);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM dbo.user_answers WHERE question_id = :id", nativeQuery = true)
    void deleteUserAnswersByQuestionId(@Param("id") Long id); // Thêm phương thức này

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM dbo.questions  WHERE question_bank_id = :id", nativeQuery = true)
    void deleteQuestionDetailsByQuestionId(@Param("id") Long id);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM dbo.question_bank WHERE question_id = :id", nativeQuery = true)
    void deleteByQuestionId(@Param("id") Long id);

}