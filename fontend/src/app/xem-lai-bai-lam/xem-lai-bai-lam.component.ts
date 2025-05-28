import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeThiService, SubmittedExam } from '../services/de-thi.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-xem-lai-bai-lam',
  imports: [CommonModule],
  templateUrl: './xem-lai-bai-lam.component.html',
  styleUrl: './xem-lai-bai-lam.component.scss'
})
export class XemLaiBaiLamComponent implements OnInit {
  exam: any;
  questions: any[] = [];
  userAnswers: number[] = [];
  score: number = 0;
  submittedAt: string = '';
  
constructor(private router: Router) {}
  ngOnInit() {
    // Fake data
    this.exam = {
      examName: 'Đề thi Toán học lớp 10',
      subject: 'Toán',
      duration: 45,
      description: 'Kiểm tra giữa kỳ môn Toán học lớp 10'
    };

    this.questions = [
      {
        question: 'Tổng các góc trong một tam giác bằng bao nhiêu độ?',
        answers: ['90', '180', '270', '360'],
        correctOption: 1
      },
      {
        question: 'Phân số lớn nhất trong các phân số sau?',
        answers: ['1/2', '3/4', '2/3', '4/5'],
        correctOption: 3
      },
      {
        question: 'Phương trình nào là phương trình bậc hai?',
        answers: ['x^2 + 2x + 1 = 0', 'x + 1 = 0', '2x = 5', 'x^3 = 27'],
        correctOption: 0
      }
    ];

    this.userAnswers = [1, 2, 0]; // user trả lời đúng-sai-đúng
    this.score = 2; // điểm
    this.submittedAt = '2025-05-29T10:35:00';
  }

  scrollToQuestion(index: number) {
    const el = document.querySelectorAll('.question-block')[index];
    el?.scrollIntoView({ behavior: 'smooth' });
  }

  exitReview() {
   this.router.navigate(['/student-mark']);
  }
}