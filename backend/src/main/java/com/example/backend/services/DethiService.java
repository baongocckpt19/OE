package com.example.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.Dethi;
import com.example.backend.repository.DethiRepository;
@Service 
public class DethiService {
    @Autowired
    private DethiRepository examRepository;

    public Dethi createExam(String examName, String description, Integer duration, String createdBy) {
        Dethi newExam = new Dethi(examName, description, duration, createdBy);
        return examRepository.save(newExam);
    }

    // Phương thức để lấy tất cả các kỳ thi
    public List<Dethi> getAllExams() {
        return examRepository.findAll(); // Phương thức có sẵn của JpaRepository
    }

    // Bạn có thể thêm các phương thức khác để lấy, cập nhật, xóa kỳ thi dựa trên ID hoặc các tiêu chí khác
    public Dethi getExamById(Long id) {
        return examRepository.findById(id)
                .orElse(null); // Trả về null nếu không tìm thấy
    }

    // Ví dụ về phương thức tìm kiếm theo tên (nếu bạn cần)
    public List<Dethi> findByExamNameContainingIgnoreCase(String examName) {
        return examRepository.findByExamNameContainingIgnoreCase(examName);
    }
}
