package com.example.backend.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.example.backend.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.example.backend.repository.DethiRepository;
import com.example.backend.repository.ExamQuestionRepository;
import com.example.backend.repository.QuestionRepository;

import org.springframework.transaction.annotation.Transactional;

@Service
public class DethiService {
    @Autowired
    private DethiRepository examRepository;

    @Autowired
    private ExamQuestionRepository examQuestionRepository;
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public long createExam(Dethi exam, int userId) {
        exam.setExamName(exam.getExamName());
        exam.setDescription(exam.getDescription());
        exam.setDuration(exam.getDuration());
        exam.setCreatedBy(userId); // ✅ Đã được set
        exam.setCreatedAt(LocalDate.now()); // ✅ Đã được set
        exam.setName_of_subject(exam.getName_of_subject());

        return examRepository.saveExam(exam);
    }

    @Transactional
    public void addQuestionsToExam(Long examId, List<Long> questionBankIds) {
        System.out.println("Service: Bắt đầu thêm câu hỏi cho đề thi ID: " + examId);
        System.out.println("Service: Các Question IDs nhận được: " + questionBankIds);

        Dethi exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đề thi!"));

        // Giả sử có QuestionRepository để truy vấn câu hỏi
        List<Question> questions = questionRepository.findAllById(questionBankIds); // ✅ Lấy câu hỏi thực tế

        List<ExamQuestion> examQuestions = questions.stream()
                .map(q -> new ExamQuestion(exam, q)) // ✅ Sử dụng câu hỏi đã tồn tại
                .collect(Collectors.toList());

        examQuestionRepository.saveAllExamQuestions(examQuestions); // Sử dụng phương thức saveAll() chuẩn
    }

    public List<Dethi> getAllExams() {
        return examRepository.findAll(); // Phương thức có sẵn của JpaRepository
    }

    public Dethi getExamById(Long id) {
        return examRepository.findById(id)
                .orElse(null); // Trả về null nếu không tìm thấy
    }

    // Ví dụ về phương thức tìm kiếm theo tên (nếu bạn cần)

    // Sửa phương thức này để trả về DethiDetailResponse
    public Optional<DethiDetailResponse> getDethiDetails(Long id) { // Đổi tên cho rõ ràng hơn
        System.out.println("Service: Đang tìm đề thi với ID: " + id);
        Optional<Dethi> dethiOptional = examRepository.findById(id);

        if (dethiOptional.isPresent()) {
            Dethi dethi = dethiOptional.get();
            System.out.println("Service: Tìm thấy đề thi: " + dethi.getExamName());
            // Lấy tất cả câu hỏi liên quan đến đề thi này
            List<ExamQuestion> examQuestions = examQuestionRepository.findByExamExamId(id); // <-- Gọi phương thức của
            System.out.println("Service: Số lượng ExamQuestion tìm thấy: " + examQuestions.size());

            List<Question> questions = examQuestions.stream()
                    .map(ExamQuestion::getQuestionBank)
                    .collect(Collectors.toList());
            System.out.println("Service: Số lượng Question (sau map): " + questions.size());

            // Kiểm tra xem DethiDetailResponse có được tạo đúng không
            DethiDetailResponse response = new DethiDetailResponse(dethi, questions);
            System.out.println("Service: DethiDetailResponse được tạo: " + response.getExam().getExamId() + ", "
                    + response.getQuestions().size() + " câu hỏi");

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

    public int evaluateAndSave(ExamSubmissionRequest submission) {
        int correct = 0;
        List<ExamSubmissionRequest.AnswerDTO> answers = submission.getAnswers();

        for (ExamSubmissionRequest.AnswerDTO ans : answers) {
            Question q = questionRepository.findById((long) ans.getQuestionId()).orElse(null);
            if (q != null && q.getCorrectOption() == ans.getSelectedOption()) {
                correct++;
            }

            jdbcTemplate.update(
                    "INSERT INTO user_answers (user_id, exam_id, question_id, selected_option) VALUES (?, ?, ?, ?)",
                    submission.getUserId(), submission.getExamId(), ans.getQuestionId(), ans.getSelectedOption());
        }

        int score = Math.round((correct * 100f) / answers.size());

        jdbcTemplate.update(
                "INSERT INTO results (user_id, exam_id, score, submitted_at) VALUES (?, ?, ?, GETDATE())",
                submission.getUserId(), submission.getExamId(), score);

        return score;
    }
    @Transactional
    public void deleteDethi(Long id) {
            examRepository.deleteExamById(id); // Xóa bản ghi liên quan trong user_answers
    }
}
