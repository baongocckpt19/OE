import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; // Import RouterLink for "Back" button
import { FormsModule } from '@angular/forms';
import { DeThiService, Dethi, Question } from '../services/de-thi.service';
import { HeaderComponent } from '../header/header.component'; // Assuming you want a header

@Component({
  selector: 'app-chi-tiet-de-thi',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // Add HeaderComponent, RouterLink
  templateUrl: './chi-tiet-de-thi.component.html',
  styleUrls: ['./chi-tiet-de-thi.component.scss'],
})
export class ChiTietDeThiComponent implements OnInit {
  examId: number | null = null;
  exam: Dethi | null = null;
  questions: Question[] = [];
  selectedAnswers: (number | null)[] = []; // Keep if interactive, remove if view-only
  currentIndex = 0;
  isLoading = true; // Add loading state
  errorMessage: string | null = null; // Add error message state

  constructor(
    private route: ActivatedRoute,
    private deThiService: DeThiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('ChiTietDeThiComponent ngOnInit được gọi');
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log('ID từ URL paramMap:', id);
      this.examId = id ? +id : null;
      if (this.examId) {
        this.loadExamDetails(this.examId);
      } else {
        this.errorMessage = 'Không tìm thấy ID đề thi.';
        this.isLoading = false;
      }
    });
  }

  loadExamDetails(examId: number): void {
    console.log('Đang tải chi tiết đề thi cho ID:', examId);
    this.isLoading = true;
    this.errorMessage = null; // Clear previous errors
    this.deThiService.getDethiDetails(examId).subscribe(
      response => {
        if (response && response.exam && response.questions && Array.isArray(response.questions)) {
          this.exam = response.exam;
          this.questions = response.questions;
          this.selectedAnswers = new Array(this.questions.length).fill(null);
          this.isLoading = false;
          if (this.questions.length === 0) {
            this.errorMessage = 'Đề thi này chưa có câu hỏi nào.';
          }
        } else {
          console.warn("API không trả về dữ liệu đề thi hoặc câu hỏi hợp lệ.");
          this.errorMessage = 'Không thể tải chi tiết đề thi. Dữ liệu trả về không hợp lệ.';
          this.isLoading = false;
          this.questions = []; // Đảm bảo luôn là mảng rỗng
        }
      },
      error => {
        console.error('Lỗi khi tải chi tiết đề thi:', error);
        this.errorMessage = 'Lỗi kết nối hoặc server. Vui lòng thử lại sau.';
        this.isLoading = false;
        this.questions = []; // Đảm bảo luôn là mảng rỗng
        // this.router.navigate(['/de-thi']); // Có thể điều hướng lại
      }
    );
  }

  // --- Methods for interactive exam view (keep if intended, otherwise remove) ---
  toggleAnswer(questionIndex: number, answerIndex: number): void {
    this.selectedAnswers[questionIndex] =
      this.selectedAnswers[questionIndex] === answerIndex ? null : answerIndex;
  }

  goToNextQuestion(): void {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    }
  }

  goToPreviousQuestion(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  goToQuestion(index: number): void {
    if (index >= 0 && index < this.questions.length) {
      this.currentIndex = index;
    }
  }

  submitExam(): void {
    console.log('Selected Answers:', this.selectedAnswers);
    alert('Đề thi đã được nộp!');
    // Implement actual submission logic here (e.g., send to backend)
    // Then navigate to a results page or back to exam list
    // this.router.navigate(['/ket-qua-thi', this.examId]);
  }
  // -----------------------------------------------------------------------------

  get currentQuestion() {
    return this.questions && this.questions.length > 0 ? this.questions[this.currentIndex] : null;
  }
}