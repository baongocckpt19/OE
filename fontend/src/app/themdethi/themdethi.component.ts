import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
  styleUrl: './themdethi.component.scss'
})
export class ThemdethiComponent {
  test = {
    name: '',
    subject: '',
    duration: null as number | null,
    description: ''
  };

  isTestAdded = false;

  questions: {
    subject: string;
    question: string;
    level: string;
    answers: string[];
  }[] = [];

  // Modal
  isAddQuestionModalOpen = false;
  searchQuery = '';

  questionBank = [
    {
      question: "Thủ đô của Việt Nam là gì?",
      subject: "Địa lý",
      level: "Dễ",
      answers: ["Hà Nội", "TP.HCM", "Huế", "Đà Nẵng"],
      selected: false
    },
    {
      question: "2 + 2 bằng mấy?",
      subject: "Toán",
      level: "Dễ",
      answers: ["2", "3", "4", "5"],
      selected: false
    }
  ];

  // Trạng thái đáp án được chọn cho mỗi câu hỏi (chỉ trong preview)
  selectedAnswers: { [questionIndex: number]: number | null } = {};

  onAddTest() {
    if (this.test.name && this.test.subject && this.test.duration) {
      this.isTestAdded = true;
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
    return this.questionBank.filter(q =>
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
    const selected = this.questionBank.filter(q => q.selected);

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
}
