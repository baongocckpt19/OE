package com.example.backend.repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.example.backend.model.Dethi;

@Repository
public class DethiRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;


    public Long saveExam(Dethi exam) {
        String sql = "INSERT INTO exams (exam_name, name_of_subject,description, duration, created_by, created_at) " +
                "VALUES (?, ?, ?, ?,? ,?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, new String[]{ "exam_id" });
            ps.setString(1, exam.getExamName());
            ps.setString(2, exam.getName_of_subject());
            ps.setString(3, exam.getDescription());
            ps.setInt(4, exam.getDuration()); // Sửa từ setInt -> setString
            ps.setString(5, exam.getCreatedBy()); // Sửa từ setString -> setInt
            ps.setDate(6, java.sql.Date.valueOf(exam.getCreatedAt()));

            return ps;
        }, keyHolder);

        return keyHolder.getKey().longValue();
    }

    // Update exam theo id
    public int updateExam(Dethi exam) {
        String sql = "UPDATE exams SET exam_name = ?, description = ?, duration = ? WHERE id = ?";
        return jdbcTemplate.update(sql,
                exam.getExamName(),
                exam.getDescription(),
                exam.getDuration(),
                exam.getExamId());
    }

    // Xóa exam theo id
    public int deleteExamById(Long exam_id) {
        String sql = "DELETE FROM exams WHERE exam_id = ?";
        return jdbcTemplate.update(sql, exam_id);
    }

    // Lấy exam theo id
    public Optional<Dethi> findById(Long exam_id) {
        String sql = "SELECT * FROM exams WHERE exam_id = ?";
        try {
            Dethi exam = jdbcTemplate.queryForObject(sql, new Object[] { exam_id }, new ExamRowMapper());
            return Optional.ofNullable(exam);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    // Lấy danh sách tất cả exam
    public List<Dethi> findAll() {
        String sql = "SELECT exam_id, exam_name, description, duration, created_by, created_at, name_of_subject FROM exams";
        return jdbcTemplate.query(sql, new ExamRowMapper());
    }

    // Lấy danh sách exam theo tên chứa keyword
    public List<Dethi> findByExamNameContaining(String keyword) {
        String sql = "SELECT * FROM exams WHERE exam_name LIKE ?";
        return jdbcTemplate.query(sql, new Object[] { "%" + keyword + "%" }, new ExamRowMapper());
    }

    // RowMapper để ánh xạ ResultSet thành đối tượng Exam
    private static class ExamRowMapper implements RowMapper<Dethi> {
        @Override
        public Dethi mapRow(ResultSet resultSet, int rowNum) throws SQLException {
            
            Dethi exam = new Dethi();
            exam.setExamId(resultSet.getLong("exam_id")); // Sửa từ "id" thành "exam_id"
            exam.setExamName(resultSet.getString("exam_name"));
            exam.setDescription(resultSet.getString("description"));
            exam.setDuration(resultSet.getInt("duration"));
            exam.setCreatedBy(resultSet.getInt("created_by"));
            Timestamp timestamp = resultSet.getTimestamp("created_at");
            exam.setCreatedAt(timestamp.toLocalDateTime().toLocalDate());
            exam.setName_of_subject(resultSet.getString("name_of_subject"));
            return exam;
        }
    }
}
