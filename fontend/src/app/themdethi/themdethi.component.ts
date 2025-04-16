import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ExamService } from '../services/exam.service';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-themdethi',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './themdethi.component.html',
  styleUrls: ['./themdethi.component.scss']
})
export class ThemdethiComponent {
  router: any;
  constructor(private examService: ExamService, private questionService: QuestionService) { }
  test = {
    examName: '',
    subject: '',
    duration: null as number | null,
    description: ''
  };

  isTestAdded = false;

  // Modal
  isAddQuestionModalOpen = false;
  searchQuery = '';

  // Trạng thái đáp án được chọn cho mỗi câu hỏi (chỉ trong preview)
  selectedAnswers: { [questionIndex: number]: number | null } = {};

  questions: {
    subject: string;
    question: string;
    level: string;
    answers: string[];
  }[] = [];

  questionsBank: {
    subject: string;
    question: string;
    level: string;
    answers: string[];
    selected?: boolean;
  }[] = [];

  ngOnInit() {
    this.questionService.getQuestions()
      .subscribe((data: any[]) => {
        this.questionsBank = data.map(q => ({
          subject: q.nameOfSubject,
          question: q.questionText,
          level: q.difficulty,
          answers: [q.option1, q.option2, q.option3, q.option4],
          selected: false // nếu cần
        }));
      });
  }

  onAddTest() {
    if (this.test.examName && this.test.subject && this.test.duration) {
      const userId = 1; // 🔁 Lấy user id từ localStorage hoặc auth service nếu có
      this.examService.addExam(this.test, userId)
        .subscribe({
          next: (res) => {
            this.isTestAdded = true;
            alert("Thêm đề thi thành công!");
          },
          error: (err) => {
            console.error("Lỗi khi thêm đề thi:", err);
            alert("Đã xảy ra lỗi khi thêm đề thi.");
          }
        });
    } else {
      alert("Vui lòng điền đầy đủ thông tin đề thi!");
    }
  }

  openAddQuestionModal() {
    this.isAddQuestionModalOpen = true;
  }

  closeAddQuestionModal() {
    this.isAddQuestionModalOpen = false;
  }

  get filteredQuestions() {
    const keyword = this.searchQuery.toLowerCase();
    return this.questionsBank.filter(q =>
      q.question.toLowerCase().includes(keyword) ||
      q.subject.toLowerCase().includes(keyword) ||
      q.level.toLowerCase().includes(keyword)
    );
  }

  toggleSelectAll(event: any) {
    const checked = event.target.checked;
    this.filteredQuestions.forEach(q => q.selected = checked);
  }

  submitSelectedQuestions() {
    const selected = this.questionsBank.filter(q => q.selected);

    selected.forEach(q => {
      const exists = this.questions.find(existing =>
        existing.question === q.question && existing.subject === q.subject
      );

      if (!exists) {
        this.questions.push({
          subject: q.subject,
          question: q.question,
          level: q.level,
          answers: q.answers
        });
      }
    });

    this.closeAddQuestionModal();
  }

  // Gán đáp án được chọn cho mỗi câu hỏi
  onSelectAnswer(questionIndex: number, answerIndex: number) {
    this.selectedAnswers[questionIndex] = answerIndex;
  }

  getAnswerLabel(index: number): string {
    return ['A', 'B', 'C', 'D'][index] || '';
  }

  onAddNewQuestion() {
    alert("Chức năng thêm mới câu hỏi sẽ được phát triển sau.");
  }





  onPublish(): void {
    this.router.navigate(['/de-thi']);
  }



}
