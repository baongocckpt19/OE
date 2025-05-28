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
        for (ExamQuestion eq : examQuestions) {
            Long examId = eq.getExam().getExamId();
            Long questionId = eq.getQuestionBank().getId();

            // Kiểm tra xem câu hỏi đã tồn tại (kể cả is_deleted = 1)
            String checkSql = "SELECT COUNT(*) FROM questions WHERE exam_id = ? AND question_bank_id = ?";
            Integer count = jdbcTemplate.queryForObject(checkSql, Integer.class, examId, questionId);

            if (count != null && count > 0) {
                // Nếu có rồi, phục hồi bằng cách set lại is_deleted = 0
                String updateSql = "UPDATE questions SET is_deleted = 0 WHERE exam_id = ? AND question_bank_id = ?";
                jdbcTemplate.update(updateSql, examId, questionId);
            } else {
                // Nếu chưa có thì insert mới
                String insertSql = "INSERT INTO questions (exam_id, question_bank_id, is_deleted) VALUES (?, ?, 0)";
                jdbcTemplate.update(insertSql, examId, questionId);
            }
        }
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
                     "WHERE eq.exam_id = ? AND eq.is_deleted = 0"; // Lọc theo exam_id avf is-delete=0

        // Thực hiện truy vấn và ánh xạ kết quả bằng ExamQuestionFullRowMapper
        return jdbcTemplate.query(sql, new Object[]{examId}, new ExamQuestionFullRowMapper());
    }


    //xóa caau hỏi mềm trong đề thi đẻ cập nhật câu hỏi mới trong chức năng sửa đề thi baongoc
    public void softDeleteByExamId(Long examId) {
        String sql = "UPDATE questions SET is_deleted = 1 WHERE exam_id = ?";
        jdbcTemplate.update(sql, examId);
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
    dethi.setCreatedAt(createdAtTimestamp.toLocalDateTime().toLocalDate());
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