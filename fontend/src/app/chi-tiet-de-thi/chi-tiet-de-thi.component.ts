import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chi-tiet-de-thi',
  imports: [CommonModule],
  templateUrl: './chi-tiet-de-thi.component.html',
  styleUrls: ['./chi-tiet-de-thi.component.scss']
})
export class ChiTietDeThiComponent implements OnInit {
  // Thông tin đề thi mẫu
  exam = {
    examName: 'Đề thi thử THPT Quốc Gia 2025',
    subject: 'Ngữ văn',
    duration: 90,
    totalQuestions: 10 // Bạn có thể để là 40 nếu muốn
  };
  toggleAnswer(questionIndex: number, answerIndex: number): void {
    if (this.selectedAnswers[questionIndex] === answerIndex) {
      this.selectedAnswers[questionIndex] = null; // Nhấn lại -> bỏ chọn
    } else {
      this.selectedAnswers[questionIndex] = answerIndex; // Chọn mới
    }
  }
  
  // Danh sách câu hỏi mẫu
  questions = [
    {
      question: 'Câu 1: Nhân vật Tràng trong “Vợ nhặt” của Kim Lân là người như thế nào?',
      answers: [
        'A. Vô cảm, lạnh lùng với cuộc đời',
        'B. Lãng mạn, mộng mơ',
        'C. Thô kệch nhưng giàu tình thương',
        'D. Giàu có, trí thức'
      ]
    },
    {
      question: 'Câu 2: Chủ đề chính của bài thơ “Tây Tiến” là gì?',
      answers: [
        'A. Ca ngợi người lính Tây Tiến hào hoa, lãng mạn',
        'B. Tình yêu quê hương tha thiết',
        'C. Tình bạn trong chiến đấu',
        'D. Cuộc sống thường nhật của người lính'
      ]
    },
    {
      question: 'Câu 3: Hình tượng “sóng” trong bài thơ của Xuân Quỳnh tượng trưng cho điều gì?',
      answers: [
        'A. Những con sóng biển dữ dội',
        'B. Sự mạnh mẽ của thiên nhiên',
        'C. Những cung bậc cảm xúc của tình yêu',
        'D. Những thay đổi trong xã hội'
      ]
    },
    {
      question: 'Câu 4: “Chí Phèo” là tác phẩm của ai?',
      answers: [
        'A. Nam Cao',
        'B. Nguyễn Tuân',
        'C. Tô Hoài',
        'D. Ngô Tất Tố'
      ]
    },
    {
      question: 'Câu 5: Tác phẩm “Ai đã đặt tên cho dòng sông?” được viết theo thể loại nào?',
      answers: [
        'A. Tự sự',
        'B. Bút ký',
        'C. Tùy bút',
        'D. Phóng sự'
      ]
    },
    {
      question: 'Câu 6: Hình tượng cây tre trong văn học thường tượng trưng cho?',
      answers: [
        'A. Lòng dũng cảm, kiên cường của người Việt',
        'B. Sự mềm mại, yếu đuối',
        'C. Sự thịnh vượng',
        'D. Văn minh phương Tây'
      ]
    },
    {
      question: 'Câu 7: Câu thơ “Sống là cho đâu chỉ nhận riêng mình” là của ai?',
      answers: [
        'A. Tố Hữu',
        'B. Xuân Diệu',
        'C. Nguyễn Duy',
        'D. Tế Hanh'
      ]
    },
    {
      question: 'Câu 8: Ý nghĩa của hình tượng “chiếc thuyền ngoài xa” trong truyện cùng tên là gì?',
      answers: [
        'A. Vẻ đẹp chân thật của cuộc sống',
        'B. Nghệ thuật thuần túy',
        'C. Mâu thuẫn giữa hiện thực và nghệ thuật',
        'D. Bi kịch của người phụ nữ'
      ]
    },
    {
      question: 'Câu 9: Nhân vật Mị trong “Vợ chồng A Phủ” là người như thế nào?',
      answers: [
        'A. Biết cam chịu',
        'B. Cam chịu và dần vùng lên mạnh mẽ',
        'C. Nhẫn nhịn đến cuối đời',
        'D. Không có sự phản kháng'
      ]
    },
    {
      question: 'Câu 10: “Sống chết mặc bay” là tác phẩm phản ánh điều gì?',
      answers: [
        'A. Cuộc sống phong lưu của tầng lớp thống trị',
        'B. Tinh thần yêu nước',
        'C. Tình yêu đôi lứa',
        'D. Tình cảm gia đình'
      ]
    }
  ];

  selectedAnswers: (number | null)[] = [];
  currentIndex = 0;

  get currentQuestion() {
    return this.questions[this.currentIndex];
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.selectedAnswers = Array(this.questions.length).fill(null);
  }

  selectAnswer(questionIndex: number, answerIndex: number): void {
    this.selectedAnswers[questionIndex] = answerIndex;
  }

  goToQuestion(index: number): void {
    this.currentIndex = index;
  }

  submitExam(): void {
    const confirmed = confirm('Bạn chắc chắn muốn nộp bài?');
    if (confirmed) {
      console.log('Đáp án đã chọn:', this.selectedAnswers);
      alert('Bài thi đã được nộp!');
    }
  }
}
