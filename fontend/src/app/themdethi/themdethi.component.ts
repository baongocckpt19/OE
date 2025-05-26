import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { DeThiService } from '../services/de-thi.service';
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
export class ThemdethiComponent implements OnInit{
  currentExamId: number | null = null;
  constructor(private examService: DeThiService, private questionService: QuestionService,private router: Router) { }
  test = {
    examName: '',
    duration: null as number | null,
    description: '',
    name_of_subject: ''
  };

  isTestAdded = false;

  // Modal
  isAddQuestionModalOpen = false;
  searchQuery = '';

  // Trạng thái đáp án được chọn cho mỗi câu hỏi (chỉ trong preview)
  selectedAnswers: { [questionIndex: number]: number | null } = {};

  questions: {
    id?: number;
    subject: string;
    question: string;
    level: string;
    answers: string[];
  }[] = [];

  questionsBank: {
    id: number;
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
          id: q.questionId,
          subject: q.nameOfSubject,
          question: q.questionText,
          level: q.difficulty,
          answers: [q.option1, q.option2, q.option3, q.option4],
          selected: false // nếu cần
        }));
      });
  }

  onAddTest() {
    if (this.test.examName && this.test.duration) {
      const userId = 1; // 🔁 Lấy user id từ localStorage hoặc auth service nếu có
      this.examService.addExam(this.test, userId) // No userId parameter needed here
        .subscribe({
          next: (res: any) => {
            this.isTestAdded = true;
            this.currentExamId = res.examId;
            alert(`Thêm đề thi thành công! ID: ${this.currentExamId}`);
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
     console.log('Current Exam ID khi submit:', this.currentExamId); 
    if (!this.currentExamId) {
      alert("Lỗi: Không tìm thấy ID đề thi. Vui lòng tạo đề thi trước.");
      return;
    }

    const selectedQuestionBankIds: number[] = this.questionsBank
      .filter(q => q.selected)
      .map(q => Number(q.id)); // Giả sử model QuestionBank của bạn có 'id'

    if (selectedQuestionBankIds.length === 0) {
      alert("Vui lòng chọn ít nhất một câu hỏi.");
      return;
    }


    this.examService.addQuestionsToExam(this.currentExamId, selectedQuestionBankIds) // Gọi service mới
      .subscribe({
        next: (res: any) => {
          alert(res.message || "Thêm câu hỏi vào đề thi thành công!");
          // Cập nhật danh sách câu hỏi hiển thị trên UI chính nếu cần
          // Bạn có thể fetch lại danh sách câu hỏi cho đề thi này
          // hoặc thêm trực tiếp vào mảng `questions` nếu bạn có đủ dữ liệu
          this.questions.push(...this.questionsBank.filter(q => q.selected).map(q => ({
                                              id: q.id, // Giữ lại ID nếu bạn cần nó sau này
                                              subject: q.subject,
                                              question: q.question,
                                              level: q.level,
                                              answers: q.answers
                                          }))); // Cập nhật tạm thời trên UI
          this.closeAddQuestionModal();
          // Reset trạng thái selected của các câu hỏi trong questionsBank
          this.questionsBank.forEach(q => q.selected = false);
        },
        error: () => {
          console.error("Lỗi khi thêm câu hỏi vào đề thi:");
          alert("Đã xảy ra lỗi khi thêm câu hỏi vào đề thi.");
        }
      });
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
