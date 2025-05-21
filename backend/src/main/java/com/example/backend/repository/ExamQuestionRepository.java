package com.example.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.backend.model.ExamQuestion; // Import ExamQuestion

import java.util.List;

@Repository
public interface ExamQuestionRepository extends JpaRepository<ExamQuestion, Long> {
    // Phương thức để tìm tất cả các liên kết câu hỏi cho một đề thi cụ thể
    List<ExamQuestion> findByExamExamId(Long examId); // Query theo examId của đối tượng Exam trong ExamQuestion
}