package com.example.backend.services;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.model.UserAnswer;
import com.example.backend.repository.UserAnswerRepository;
import com.example.backend.repository.QuestionRepository;
import com.example.backend.repository.ResultRepository;
import com.example.backend.model.ExamSubmissionRequest;
import com.example.backend.model.ExamSubmissionRequest.AnswerDTO;
import com.example.backend.model.Question;
import com.example.backend.model.Result;

import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
public class UserAnswerService {

    private final UserAnswerRepository userAnswerRepository;
    private final QuestionRepository questionRepository;
    private final ResultRepository resultRepository;

    public UserAnswerService(
            UserAnswerRepository userAnswerRepository,
            QuestionRepository questionRepository,
            ResultRepository resultRepository
    ) {
        this.userAnswerRepository = userAnswerRepository;
        this.questionRepository = questionRepository;
        this.resultRepository = resultRepository;
    }

    public UserAnswer saveAnswer(UserAnswer answer) {
        return userAnswerRepository.save(answer);
    }

    public List<UserAnswer> getAnswersByUserAndExam(Long userId, Long examId) {
        return userAnswerRepository.findByUserIdAndExamId(userId, examId);
    }

    public List<UserAnswer> getAllAnswers() {
        return userAnswerRepository.findAll();
    }

    public void deleteAnswer(Long id) {
        userAnswerRepository.deleteById(id);
    }

    // ✅ Hàm xử lý nộp bài thi: lưu câu trả lời, tính điểm, lưu kết quả
    public int submitAndScore(ExamSubmissionRequest request) {
        System.out.println("🔔 Beacon received for userId: " + request.getUserId() + ", examId: " + request.getExamId());
        AtomicInteger correctCount = new AtomicInteger(0);


        List<UserAnswer> answersToSave = request.getAnswers().stream().map(dto -> {
            UserAnswer ua = new UserAnswer();
            ua.setUserId((long) request.getUserId());
            ua.setExamId((long) request.getExamId());
            ua.setQuestionId((long) dto.getQuestionId());
            ua.setSelectedOption(dto.getSelectedOption());

            // So sánh với đáp án đúng từ Question
            Question question = questionRepository.findById((long) dto.getQuestionId()).orElse(null);
            if (question != null && dto.getSelectedOption() == question.getCorrectOption()) {
                correctCount.incrementAndGet();
            }

            return ua;
        }).toList();

        userAnswerRepository.saveAll(answersToSave);

        int total = request.getAnswers().size();
        int score = (int) ((correctCount.get() * 100.0) / total);


        Result result = new Result();
        result.setUserId(request.getUserId());
        result.setExamId(request.getExamId());
        result.setScore(score);
        result.setSubmittedAt(LocalDateTime.now());
        resultRepository.save(result);

        return score;
    }
    public Map<String, Object> getSubmittedExam(Long examId, Long userId) {
        // 1. Lấy kết quả
        Result result = resultRepository.findByUserIdAndExamId(userId, examId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy kết quả thi."));

        // 2. Lấy danh sách câu hỏi trong đề thi
        List<Question> questions = questionRepository.findQuestionsByExamId(examId);

        // 3. Lấy đáp án người dùng
        List<UserAnswer> userAnswers = userAnswerRepository.findByUserIdAndExamId(userId, examId);

        // 4. Chuẩn bị dữ liệu để trả về
        List<Map<String, Object>> questionList = questions.stream().map(q -> {
            Map<String, Object> questionMap = new HashMap<>();
            questionMap.put("id", q.getId());
            questionMap.put("questionText", q.getQuestionText());
            questionMap.put("option1", q.getOption1());
            questionMap.put("option2", q.getOption2());
            questionMap.put("option3", q.getOption3());
            questionMap.put("option4", q.getOption4());
            questionMap.put("correctOption", q.getCorrectOption());
            return questionMap;
        }).collect(Collectors.toList());

        List<Integer> userAnswerOptions = userAnswers.stream()
                .sorted((a, b) -> Long.compare(a.getQuestionId(), b.getQuestionId()))
                .map(UserAnswer::getSelectedOption)
                .collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("exam", Map.of(
                "examId", examId,
                "examName", "Tên đề thi", // Có thể mở rộng lấy từ bảng exams
                "submitted_at", result.getSubmittedAt()
        ));
        response.put("questions", questionList);
        response.put("userAnswers", userAnswerOptions);
        response.put("score", result.getScore());

        return response;
    }
}
