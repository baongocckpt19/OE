import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DethiDetailsResponse, DeThiService } from '../services/de-thi.service';
import { AccountService } from '../services/account-service.service';

@Component({
  selector: 'app-trangthi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trangthi.component.html',
  styleUrl: './trangthi.component.scss'
})
export class TrangthiComponent implements OnInit, OnDestroy {
  exam = {
    examName: '',
    subject: '',
    duration: 0,
    description: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deThiService: DeThiService,
    private accountService: AccountService
  ) { }

  examId: number | null = null;
  questions: any[] = [];
  selectedAnswers: (number | null)[] = [];
  flaggedQuestions: boolean[] = [];
  timeLeft: number = 0;
  displayTime: string = '00:00';
  timerInterval: any;
  hasSubmitted: boolean = false;
  showResultModal: boolean = false;
  examScore: number = 0;
  showWarningBanner = false;

  isTimerFlashing = false;

  tenMinutesWarningShown = false;

  ngOnInit(): void {
    if (localStorage.getItem('hasSubmitted') === 'true') {
      localStorage.removeItem('hasSubmitted');
      this.router.navigate(['/student-mark']);
      return;
    }

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.examId = id ? +id : null;

      if (this.examId) {
        this.loadExam(this.examId);
      } else {
        alert("Không tìm thấy ID đề thi");
      }
    });

    window.addEventListener('beforeunload', this.handleUnload.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('beforeunload', this.handleUnload.bind(this));
  }

  handleUnload(event: BeforeUnloadEvent): void {
    if (this.hasSubmitted || !this.examId) return;

    const userId = this.accountService.getUserId();
    if (!userId) return;

    const payload = {
      userId: userId,
      examId: this.examId,
      answers: this.questions.map((q, i) => ({
        questionId: q.questionId,
        selectedOption: this.selectedAnswers[i] !== null ? this.selectedAnswers[i] + 1 : 0
      }))
    };

    localStorage.setItem('hasSubmitted', 'true');

    navigator.sendBeacon(
      'http://localhost:8080/api/userAnswers/submit-exam',
      new Blob([JSON.stringify(payload)], { type: 'application/json' })
    );
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
    this.selectedAnswers[questionIndex] =
      this.selectedAnswers[questionIndex] === answerIndex ? null : answerIndex;
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

        // Hiển thị banner cảnh báo khi còn 10 phút
        if (this.timeLeft === 600 && !this.tenMinutesWarningShown) {
          this.showWarningBanner = true;
          this.tenMinutesWarningShown = true;

          // Ẩn banner sau 1 phút (60s)
          setTimeout(() => {
            this.showWarningBanner = false;
          }, 60000);
        }

        // Bắt đầu nhấp nháy khi còn dưới 1 phút
        if (this.timeLeft <= 60 && !this.isTimerFlashing) {
          this.isTimerFlashing = true;
        }

      } else {
        clearInterval(this.timerInterval);
        this.autoSubmitWhenTimeout();
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
    if (!userId || !this.examId) {
      alert('Thiếu thông tin người dùng hoặc đề thi.');
      return;
    }

    const payload = {
      userId: userId,
      examId: this.examId,
      answers: this.questions.map((q, i) => ({
        questionId: q.questionId,
        selectedOption: this.selectedAnswers[i] !== null ? this.selectedAnswers[i] + 1 : 0
      }))
    };

    this.hasSubmitted = true;
    localStorage.setItem('hasSubmitted', 'true');

    this.deThiService.submitExam(payload).subscribe(
      (response: { message: string; score: number }) => {
        this.examScore = response.score;
        this.showResultModal = true;
      },
      (err) => {
        console.error("Lỗi khi nộp bài:", err);
        alert("Không thể nộp bài. Vui lòng thử lại.");
      }
    );
  }

  autoSubmitWhenTimeout() {
    if (this.hasSubmitted || !this.examId) return;

    const userId = this.accountService.getUserId();
    if (!userId) return;

    const payload = {
      userId: userId,
      examId: this.examId,
      answers: this.questions.map((q, i) => ({
        questionId: q.questionId,
        selectedOption: this.selectedAnswers[i] !== null ? this.selectedAnswers[i] + 1 : 0
      }))
    };

    this.hasSubmitted = true;
    localStorage.setItem('hasSubmitted', 'true');

    this.deThiService.submitExam(payload).subscribe(
      (response: { message: string; score: number }) => {
        this.examScore = response.score;
        this.showResultModal = true;
      },
      (err) => {
        console.error("Lỗi khi nộp bài hết giờ:", err);
      }
    );
  }

  reviewExam() {
    this.showResultModal = false;
  }

  exitExam() {
    this.router.navigate(['/student-mark']);
  }
}
