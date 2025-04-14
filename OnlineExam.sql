USE master;
GO

-- Đặt database vào chế độ SINGLE_USER để ngắt tất cả kết nối
ALTER DATABASE OnlineExamDB SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
GO

-- Xóa database cũ (nếu cần)
DROP DATABASE IF EXISTS OnlineExamDB;
GO

-- Tạo database mới
CREATE DATABASE OnlineExamDB;
GO

-- Sử dụng database vừa tạo
USE OnlineExamDB;
GO

-- Tạo bảng users (Người dùng)
CREATE TABLE users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    full_name NVARCHAR(100) NOT NULL,
    birthday DATE,
    class VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('teacher', 'student')),
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- Tạo bảng exams (Bài thi)
CREATE TABLE exams (
    exam_id INT IDENTITY(1,1) PRIMARY KEY,
    exam_name NVARCHAR(100) NOT NULL,
    description NTEXT,
    duration INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES users(user_id)
);
GO

-- Tạo bảng question_bank (Kho câu hỏi)
CREATE TABLE question_bank (
    question_id INT IDENTITY(1,1) PRIMARY KEY,
    question_text NTEXT NOT NULL,
    option1 NVARCHAR(255) NOT NULL,
    option2 NVARCHAR(255) NOT NULL,
    option3 NVARCHAR(255),
    option4 NVARCHAR(255),
    correct_option INT NOT NULL,
    name_of_subject VARCHAR(20),
    difficulty NVARCHAR(20) NOT NULL CHECK (difficulty IN ('dễ', 'trung bình', 'khó')),
    created_at DATETIME DEFAULT GETDATE(),
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES users(user_id)
);
GO

-- Tạo bảng questions (Liên kết câu hỏi từ kho câu hỏi với bài thi)
CREATE TABLE questions (
    question_id INT IDENTITY(1,1) PRIMARY KEY,
    exam_id INT NOT NULL,
    question_bank_id INT NOT NULL,
    FOREIGN KEY (exam_id) REFERENCES exams(exam_id),
    FOREIGN KEY (question_bank_id) REFERENCES question_bank(question_id)
);
GO

-- Tạo bảng results (Kết quả)
CREATE TABLE results (
    result_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    exam_id INT NOT NULL,
    score INT NOT NULL,
    submitted_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (exam_id) REFERENCES exams(exam_id)
);
GO

-- Tạo bảng user_answers (Câu trả lời của thí sinh)
CREATE TABLE user_answers (
    answer_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    exam_id INT NOT NULL,
    question_id INT NOT NULL,
    selected_option INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (exam_id) REFERENCES exams(exam_id),
    FOREIGN KEY (question_id) REFERENCES questions(question_id)
);
GO

-- Tạo bảng exam_attempts (Lần thi)
CREATE TABLE exam_attempts (
    attempt_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    exam_id INT NOT NULL,
    attempt_number INT NOT NULL,
    start_time DATETIME DEFAULT GETDATE(),
    end_time DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (exam_id) REFERENCES exams(exam_id)
);
GO

-- Thêm dữ liệu mẫu vào bảng users
INSERT INTO users (username, password_hash, email, full_name, class, role, birthday)
VALUES 
('teacher', 'teacher', 'admin@example.com', 'Admin User', 'Class A', 'teacher', '1985-01-15'),
('student1', 'student2', 'student1@example.com', 'Student One', 'Class B', 'student', '2005-05-20'),
('student2', 'student2', 'student2@example.com', 'Student Two', 'Class B', 'student', '2006-08-10'),
('teacher2', 'teacher2', 'teacher2@example.com', 'Giáo viên Toán', 'Class A', 'teacher', '1980-03-22'),
('teacher3', 'teacher3', 'teacher3@example.com', 'Giáo viên Lý', 'Class B', 'teacher', '1982-07-15'),
('student3', 'student3', 'student3@example.com', 'Học sinh Ba', 'Class A', 'student', '2005-11-30'),
('student4', 'student4', 'student4@example.com', 'Học sinh Bốn', 'Class B', 'student', '2006-02-14'),
('student5', 'student5', 'student5@example.com', 'Học sinh Năm', 'Class C', 'student', '2005-09-08');
GO

-- Thêm dữ liệu mẫu vào bảng exams
INSERT INTO exams (exam_name, description, duration, created_by)
VALUES 
('Toán cơ bản', 'Bài thi toán cơ bản dành cho học sinh lớp 10', 60, 1),
('Vật lý cơ bản', 'Bài thi vật lý cơ bản dành cho học sinh lớp 10', 45, 1),
('Toán nâng cao', 'Bài thi toán nâng cao lớp 10', 90, 1),
('Vật lý nâng cao', 'Bài thi vật lý nâng cao lớp 10', 75, 1),
('Hóa học cơ bản', 'Bài thi hóa học cơ bản lớp 10', 50, 4),
('Lịch sử Việt Nam', 'Bài thi lịch sử lớp 10', 45, 5);
GO

-- Thêm dữ liệu mẫu vào bảng question_bank
INSERT INTO question_bank (question_text, option1, option2, option3, option4, correct_option, name_of_subject, difficulty, created_by)
VALUES 
('2 + 2 = ?', '3', '4', '5', '6', 2, 'Toán', 'dễ', 1),
('5 * 5 = ?', '20', '25', '30', '35', 2, 'Toán', 'trung bình', 1),
('Lực hấp dẫn được tính bằng công thức nào?', 'F = ma', 'F = mg', 'F = mv', 'F = mgh', 2, 'Vật lý', 'khó', 1),
('10 - 3 * 2 = ?', '4', '6', '8', '10', 1, 'Toán', 'trung bình', 1),
('Đạo hàm của x^2 là?', 'x', '2x', 'x^3', '2', 2, 'Toán', 'trung bình', 1),
('Nước sôi ở bao nhiêu độ C?', '90', '100', '110', '120', 2, 'Vật lý', 'dễ', 4),
('Kim loại nào dẫn điện tốt nhất?', 'Bạc', 'Đồng', 'Vàng', 'Nhôm', 1, 'Hóa học', 'khó', 4),
('Ai là vị vua đầu tiên của nước ta?', 'Lý Thái Tổ', 'Lê Lợi', 'Hùng Vương', 'Ngô Quyền', 3, 'Lịch sử', 'trung bình', 5),
('Phương trình x^2 - 5x + 6 = 0 có nghiệm là?', '2 và 3', '1 và 6', '-2 và -3', '0 và 5', 1, 'Toán', 'dễ', 1),
('Đơn vị đo cường độ dòng điện là?', 'Volt', 'Ampe', 'Ohm', 'Watt', 2, 'Vật lý', 'dễ', 4);
GO

-- Thêm dữ liệu mẫu vào bảng questions (liên kết với question_bank)
INSERT INTO questions (exam_id, question_bank_id)
VALUES 
(1, 1),
(1, 2),
(2, 3),
(1, 4),
(1, 5),
(2, 6),
(3, 7),
(3, 8),
(4, 9),
(1, 10);
GO

-- Thêm dữ liệu mẫu vào bảng results
INSERT INTO results (user_id, exam_id, score)
VALUES 
(2, 1, 90),
(3, 1, 85),
(2, 2, 95),
(3, 2, 88),
(4, 1, 92),
(4, 2, 76),
(5, 3, 85),
(6, 4, 90),
(6, 1, 78);
GO

-- Thêm dữ liệu mẫu vào bảng user_answers
INSERT INTO user_answers (user_id, exam_id, question_id, selected_option)
VALUES 
(2, 1, 1, 2),
(2, 1, 2, 2),
(3, 1, 1, 2),
(3, 1, 2, 1),
(3, 2, 3, 2),
(4, 1, 1, 2),
(4, 1, 2, 2),
(4, 1, 10, 1),
(4, 2, 3, 2),
(5, 3, 7, 2),
(5, 3, 8, 1),
(6, 4, 9, 3),
(6, 1, 1, 2),
(6, 1, 2, 1),
(6, 1, 10, 2);
GO

-- Thêm dữ liệu mẫu vào bảng exam_attempts
INSERT INTO exam_attempts (user_id, exam_id, attempt_number, start_time, end_time)
VALUES 
(2, 1, 1, GETDATE(), DATEADD(MINUTE, 60, GETDATE())),
(3, 1, 1, GETDATE(), DATEADD(MINUTE, 45, GETDATE())),
(3, 2, 1, GETDATE(), DATEADD(MINUTE, 90, GETDATE())),
(4, 1, 1, GETDATE(), DATEADD(MINUTE, 90, GETDATE())),
(4, 2, 1, GETDATE(), DATEADD(MINUTE, 60, GETDATE())),
(5, 3, 1, GETDATE(), DATEADD(MINUTE, 150, GETDATE())),
(6, 4, 1, GETDATE(), DATEADD(MINUTE, 15, GETDATE())),
(6, 1, 1, GETDATE(), DATEADD(MINUTE, 30, GETDATE()));
GO

-- Select từng bảng
SELECT 'users' AS TableName, * FROM users ORDER BY user_id;
SELECT 'exams' AS TableName, * FROM exams ORDER BY exam_id;
SELECT 'question_bank' AS TableName, * FROM question_bank ORDER BY question_id;
SELECT 'questions' AS TableName, * FROM questions ORDER BY question_id;
SELECT 'results' AS TableName, * FROM results ORDER BY result_id;
SELECT 'user_answers' AS TableName, * FROM user_answers ORDER BY answer_id;
SELECT 'exam_attempts' AS TableName, * FROM exam_attempts ORDER BY attempt_id;
GO