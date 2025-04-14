package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Dethi;

public interface DethiRepository extends JpaRepository<Dethi, Long> {

    // Tìm các kỳ thi có tên chính xác là `examName`
    List<Dethi> findByExamName(String examName);

    // Tìm các kỳ thi có tên chứa chuỗi `keyword` (không phân biệt chữ hoa chữ thường)
    List<Dethi> findByExamNameContainingIgnoreCase(String keyword);

    // Tìm các kỳ thi được tạo bởi một người cụ thể
    List<Dethi> findByCreatedBy(String createdBy);

    // Tìm các kỳ thi có thời lượng lớn hơn hoặc bằng `minDuration`
    List<Dethi> findByDurationGreaterThanEqual(Integer minDuration);
}
