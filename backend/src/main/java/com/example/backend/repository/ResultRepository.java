package com.example.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backend.model.Result;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long > {
    List<Result> findByUserId(Long  userId);
 
    @Query("SELECT AVG(r.score) FROM Result r WHERE r.userId = :studentId")
    Double findAverageScoreByStudentId(int studentId);

    @Query("SELECT COUNT(r) FROM Result r WHERE r.userId = :studentId")
    int countCompletedExams(int studentId);

   @Query(value = "SELECT TOP 6 e.exam_name, r.score FROM results r " +
               "JOIN exams e ON r.exam_id = e.exam_id " +
               "WHERE r.user_id = :studentId ORDER BY r.submitted_at DESC", 
       nativeQuery = true)
    List<Object[]> findTop6RecentScores(int studentId);


    @Query(value = """
    SELECT u.user_id, u.full_name, u.class, r.score, FORMAT(r.submitted_at, 'yyyy-MM-dd HH:mm') as submitted_at
    FROM results r
    JOIN users u ON r.user_id = u.user_id
    WHERE r.exam_id = :examId
    ORDER BY r.score DESC
""", nativeQuery = true)
    List<Object[]> findResultsByExamId(int examId);
@Query("SELECT r FROM Result r WHERE r.userId = :userId AND r.examId = :examId")
Optional<Result> findByUserIdAndExamId(@Param("userId") Long userId, @Param("examId") Long examId);

}
