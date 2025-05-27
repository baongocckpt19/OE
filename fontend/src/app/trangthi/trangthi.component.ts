import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DethiDetailsResponse, DeThiService } from '../services/de-thi.service';
import { AccountService } from '../services/account-service.service';

@Component({
  selector: 'app-trangthi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trangthi.component.html',
  styleUrl: './trangthi.component.scss'
})
export class TrangthiComponent implements OnInit {
  exam = {
    examName: 'Đề thi giữa kỳ I',
    subject: 'Toán 12',
    duration: 45,
    description: 'Đề thi trắc nghiệm Toán 12 chương I – hàm số, đạo hàm, cực trị, GTLN-GTNN.'
  };
  router: any;




  constructor(private route: ActivatedRoute, private deThiService: DeThiService, private accountService: AccountService) { }

  examId: number | null = null;



  questions: any[] = [];
  selectedAnswers: (number | null)[] = [];
  flaggedQuestions: boolean[] = [];

  timeLeft: number = 0;
  displayTime: string = '00:00';
  timerInterval: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.examId = id ? +id : null;

      if (this.examId) {
        this.loadExam(this.examId);
      } else {
        alert("Không tìm thấy ID đề thi");
      }
    });
  }

  loadExam(examId: number): void {
    this.deThiService.getDethiDetails(examId).subscribe(
      (data: DethiDetailsResponse) => {
        this.exam = {
          examName: data.exam.examName,
          subject: data.exam.name_of_subject,
          duration: data.exam.duration,
          description: data.exam.description
        };

        // Câu hỏi thực tế từ DB
        this.questions = data.questions.map(q => ({
          questionId: q.id,
          question: q.questionText,
          answers: [q.option1, q.option2, q.option3, q.option4]
        }));

        this.selectedAnswers = new Array(this.questions.length).fill(null);
        this.flaggedQuestions = new Array(this.questions.length).fill(false);

        this.startTimer();
      },
      error => {
        console.error('Lỗi khi lấy đề thi:', error);
        alert("Không thể tải đề thi!");
      }
    );
  }



  selectAnswer(questionIndex: number, answerIndex: number) {
    if (this.selectedAnswers[questionIndex] === answerIndex) {
      this.selectedAnswers[questionIndex] = null;
    } else {
      this.selectedAnswers[questionIndex] = answerIndex;
    }
  }

  scrollToQuestion(index: number) {
    const elements = document.querySelectorAll('.question-block');
    const target = elements[index] as HTMLElement;
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }

  toggleFlag(index: number) {
    this.flaggedQuestions[index] = !this.flaggedQuestions[index];
  }

  startTimer() {
    this.timeLeft = this.exam.duration * 60;
    this.updateDisplayTime();
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.updateDisplayTime();
      } else {
        clearInterval(this.timerInterval);
        alert('⏰ Hết giờ làm bài!');
      }
    }, 1000);
  }

  updateDisplayTime() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    this.displayTime = `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }




  onSubmit() {
    const confirmSubmit = confirm("Bạn có chắc chắn muốn nộp bài không?");
    if (!confirmSubmit) return;

    const userId = this.accountService.getUserId();
    if (!userId) {
      alert('Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.');
      return;
    }

    if (!this.examId) {
      alert('Không có ID đề thi hợp lệ.');
      return;
    }

    // Tạo payload
    const payload = {
      userId: userId,
      examId: this.examId,
      answers: this.questions.map((q, i) => ({
        questionId: q.questionId,
        selectedOption: this.selectedAnswers[i] !== null ? this.selectedAnswers[i] + 1 : 0
      }))
    };

    // Gọi API gửi bài
    this.deThiService.submitExam(payload).subscribe({
      next: (result) => {
        alert(`🎉 Nộp bài thành công! Điểm của bạn: ${result.score}`);
        this.router.navigate(['/student-mark']);
      },
      error: (err) => {
        console.error("Lỗi khi nộp bài:", err);
        alert("Không thể nộp bài. Vui lòng thử lại.");
      }
    });
  }

}
