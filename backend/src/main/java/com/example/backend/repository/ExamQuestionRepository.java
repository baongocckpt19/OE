package com.example.backend.repository;

import com.example.backend.model.Dethi;
import com.example.backend.model.ExamQuestion;
import com.example.backend.model.Question; // Đảm bảo bạn đã có model Question hoàn chỉnh

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp; // Cần thiết cho Timestamp
import java.util.List;

@Repository
public class ExamQuestionRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void saveAllExamQuestions(List<ExamQuestion> examQuestions) {
        // SQL INSERT statement để chèn exam_id và question_bank_id vào bảng 'questions'
        String sql = "INSERT INTO questions (exam_id, question_bank_id) VALUES (?, ?)";
        
        // Sử dụng batchUpdate để chèn nhiều bản ghi cùng lúc, hiệu quả hơn.
        jdbcTemplate.batchUpdate(sql, examQuestions, examQuestions.size(),
            (ps, examQuestion) -> {
                // Lấy exam_id từ đối tượng Dethi được liên kết với ExamQuestion
                ps.setLong(1, examQuestion.getExam().getExamId());
                // Lấy question_id từ đối tượng Question (ngân hàng câu hỏi) được liên kết
                ps.setLong(2, examQuestion.getQuestionBank().getId()); // Đã sửa: Sử dụng getId() của Question
            System.out.println("Repository: Chuẩn bị chèn - exam_id: " + examQuestion.getExam().getExamId() + ", question_id: " + examQuestion.getQuestionBank().getId());
            });
    }

    public List<ExamQuestion> findByExamExamId(Long examId) {
        // Câu lệnh SQL JOIN để kết hợp dữ liệu từ bảng 'questions' (trung gian),
        // 'exams' và 'question_bank' để lấy thông tin đầy đủ.
        String sql = "SELECT " +
                     "    eq.question_id AS eq_id, " + // ID của bản ghi trong bảng 'questions' trung gian
                     "    e.exam_id, e.exam_name, e.description, e.duration, e.created_at, e.created_by, " +
                     "    qb.question_id AS qb_id, qb.question_text, qb.name_of_subject, qb.difficulty, " +
                     "    qb.option1, qb.option2, qb.option3, qb.option4, qb.correct_option " +
                     "FROM questions eq " +
                     "JOIN exams e ON eq.exam_id = e.exam_id " +
                     "JOIN question_bank qb ON eq.question_bank_id = qb.question_id " +
                     "WHERE eq.exam_id = ?"; // Lọc theo exam_id

        // Thực hiện truy vấn và ánh xạ kết quả bằng ExamQuestionFullRowMapper
        return jdbcTemplate.query(sql, new Object[]{examId}, new ExamQuestionFullRowMapper());
    }


    private static class ExamQuestionFullRowMapper implements RowMapper<ExamQuestion> {
        @Override
        public ExamQuestion mapRow(ResultSet rs, int rowNum) throws SQLException {
            // Tạo và điền dữ liệu cho đối tượng Dethi từ ResultSet
            Dethi dethi = new Dethi();
            dethi.setExamId(rs.getLong("exam_id"));
            dethi.setExamName(rs.getString("exam_name"));
            dethi.setDescription(rs.getString("description"));
            dethi.setDuration(rs.getInt("duration"));
            // Xử lý cột created_at (Timestamp sang LocalDateTime)
            Timestamp createdAtTimestamp = rs.getTimestamp("created_at");
            if (createdAtTimestamp != null) {
                dethi.setCreatedAt(createdAtTimestamp.toLocalDateTime());
            }
            dethi.setCreatedBy(rs.getInt("created_by"));


            // Tạo và điền dữ liệu cho đối tượng Question từ ResultSet
            Question question = new Question();
            question.setId(rs.getLong("qb_id")); // ID của câu hỏi từ ngân hàng câu hỏi
            question.setQuestionText(rs.getString("question_text"));
            question.setNameOfSubject(rs.getString("name_of_subject"));
            question.setDifficulty(rs.getString("difficulty"));
            question.setOption1(rs.getString("option1"));
            question.setOption2(rs.getString("option2"));
            question.setOption3(rs.getString("option3"));
            question.setOption4(rs.getString("option4"));
            // Sử dụng getObject(columnName, Class) để xử lý giá trị null cho kiểu nguyên thủy
            question.setCorrectOption(rs.getObject("correct_option", Integer.class));

            // Tạo đối tượng ExamQuestion và gán các đối tượng Dethi và Question đã tạo
            ExamQuestion examQuestion = new ExamQuestion();
            examQuestion.setId(rs.getLong("eq_id")); // ID của bản ghi trong bảng 'questions' trung gian
            examQuestion.setExam(dethi);
            examQuestion.setQuestionBank(question);

            return examQuestion;
        }
    }
}