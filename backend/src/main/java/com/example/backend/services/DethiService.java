package com.example.backend.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.Dethi;
import com.example.backend.model.DethiDetailResponse;
import com.example.backend.model.ExamQuestion;
import com.example.backend.repository.DethiRepository;
import com.example.backend.repository.ExamQuestionRepository;
import com.example.backend.model.Question; // <-- Đảm bảo import này

@Service
public class DethiService {
    @Autowired
    private DethiRepository examRepository;

    @Autowired
    private ExamQuestionRepository examQuestionRepository;
    public Dethi createExam(String examName, String description, Integer duration, String createdBy) {
        Dethi newExam = new Dethi(examName, description, duration, createdBy);
        return examRepository.save(newExam);
    }

    // Phương thức để lấy tất cả các kỳ thi
    public List<Dethi> getAllExams() {
        return examRepository.findAll(); // Phương thức có sẵn của JpaRepository
    }

    // Bạn có thể thêm các phương thức khác để lấy, cập nhật, xóa kỳ thi dựa trên ID
    // hoặc các tiêu chí khác
    public Dethi getExamById(Long id) {
        return examRepository.findById(id)
                .orElse(null); // Trả về null nếu không tìm thấy
    }

    // Ví dụ về phương thức tìm kiếm theo tên (nếu bạn cần)
    public List<Dethi> findByExamNameContainingIgnoreCase(String examName) {
        return examRepository.findByExamNameContainingIgnoreCase(examName);
    }

    // Sửa phương thức này để trả về DethiDetailResponse
    public Optional<DethiDetailResponse> getDethiDetails(Long id) { // Đổi tên cho rõ ràng hơn
        System.out.println("Service: Đang tìm đề thi với ID: " + id);
        Optional<Dethi> dethiOptional = examRepository.findById(id);

        if (dethiOptional.isPresent()) {
            Dethi dethi = dethiOptional.get();
            System.out.println("Service: Tìm thấy đề thi: " + dethi.getExamName());
            // Lấy tất cả câu hỏi liên quan đến đề thi này
            List<ExamQuestion> examQuestions  = examQuestionRepository.findByExamExamId(id); // <-- Gọi phương thức của
            System.out.println("Service: Số lượng ExamQuestion tìm thấy: " + examQuestions.size());


            List<Question> questions = examQuestions.stream()
                    .map(ExamQuestion::getQuestionBank)
                    .collect(Collectors.toList());
            System.out.println("Service: Số lượng Question (sau map): " + questions.size());

            // Kiểm tra xem DethiDetailResponse có được tạo đúng không
            DethiDetailResponse response = new DethiDetailResponse(dethi, questions);
            System.out.println("Service: DethiDetailResponse được tạo: " + response.getExam().getExamId() + ", " + response.getQuestions().size() + " câu hỏi");

            return Optional.of(response);
        } else {
            System.out.println("Service: Không tìm thấy đề thi với ID: " + id);
            return Optional.empty();
        }
    }
    public List<Question> getQuestionsByExamId(Long examId) {
        // Sử dụng ExamQuestionRepository để lấy các bản ghi ExamQuestion
        
        List<ExamQuestion> examQuestions = examQuestionRepository.findByExamExamId(examId);

        // Map từ List<ExamQuestion> sang List<Question>
        return examQuestions.stream()
                .map(ExamQuestion::getQuestionBank) // getQuestionBank() là thuộc tính của ExamQuestion trỏ đến Question
                .filter(java.util.Objects::nonNull)
                .collect(Collectors.toList());
    }
}
