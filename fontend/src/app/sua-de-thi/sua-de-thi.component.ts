import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeThiService, Question, Dethi } from '../services/de-thi.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-sua-de-thi',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './sua-de-thi.component.html',
  styleUrl: './sua-de-thi.component.scss'
})
export class SuaDeThiComponent implements OnInit {
  examId: number | null = null;
  test: Dethi = {
    examId: 0,
    examName: '',
    description: '',
    duration: 0,
    created_by: '',
    created_at: '',
    name_of_subject: ''
  };

  questions: any[] = [];

  selectedAnswers: (number | null)[] = [];
  isTestAdded = false;

  // Modal & Filter
  isAddQuestionModalOpen = false;
  searchQuery = '';
  filteredQuestions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deThiService: DeThiService,
    private questionService: QuestionService
  ) { }

  ngOnInit(): void {
    this.examId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.examId) {
      this.loadExamDetails(this.examId);
    }
  }
  loadExamDetails(id: number) {
    this.deThiService.getDethiDetails(id).subscribe({
      next: (data) => {
        this.test = data.exam;

        this.questions = data.questions.map(q => ({
          ...q,
          nameOfSubject: q.nameOfSubject || q.subject || 'Không rõ',
          difficulty: q.difficulty || q.level || 'Không rõ',
          questionText: q.questionText || q.question || 'Không rõ'
        }));

        this.selectedAnswers = new Array(this.questions.length).fill(null);
        this.isTestAdded = true;
      },
      error: (err) => {
        console.error('Lỗi khi tải đề thi:', err);
        alert('Không thể tải đề thi');
      }
    });
  }


  saveExamEdits() {
    if (!this.examId) return;
    this.deThiService.updateExam(this.examId, this.test).subscribe({
      next: (res: string) => {
        console.log('✅ Server trả về:', res);
        alert(res); // In trực tiếp thông báo
      }
      ,
      error: (err) => {
        console.error(' Lỗi cập nhật đề thi:', err);
      }
    });

  }


  // Modal Thêm câu hỏi
  openAddQuestionModal() {
    this.isAddQuestionModalOpen = true;

    this.questionService.getQuestions().subscribe({
      next: (data) => {
        const existingIds = this.questions.map(q => q.id);

        // Lọc bỏ những câu hỏi đã có
        const notInExam = data.filter(q => !existingIds.includes(q.id));

        this.filteredQuestions = notInExam.map(q => ({
          ...q,
          subject: q.nameOfSubject || q.subject || 'Không rõ',
          level: q.difficulty || q.level || 'Không rõ',
          question: q.questionText || q.question,
          selected: false
        }));
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách câu hỏi:', err);
        alert('Không thể tải câu hỏi');
      }
    });
  }



  closeAddQuestionModal() {
    this.isAddQuestionModalOpen = false;
  }

  toggleSelectAllQuestions(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.filteredQuestions.forEach(q => q.selected = checked);
  }

  addSelectedQuestionsToExam() {
    const selected = this.filteredQuestions.filter(q => q.selected);

    // Gộp dữ liệu với danh sách hiện tại, ghi đè nếu trùng id
    selected.forEach(newQ => {
      const existingIndex = this.questions.findIndex(q => q.id === newQ.id);
      const questionToAdd = {
        ...newQ,
        nameOfSubject: newQ.subject || 'Không rõ',
        difficulty: newQ.level || 'Không rõ',
        questionText: newQ.question || 'Không rõ'
      };

      if (existingIndex !== -1) {
        this.questions[existingIndex] = questionToAdd;
      } else {
        this.questions.push(questionToAdd);
      }
    });

    // Reset modal
    this.selectedAnswers = new Array(this.questions.length).fill(null);
    this.closeAddQuestionModal();
  }


  selectAnswerInPreview(questionIndex: number, answerIndex: number) {
    if (this.selectedAnswers[questionIndex] === answerIndex) {
      this.selectedAnswers[questionIndex] = null; // toggle
    } else {
      this.selectedAnswers[questionIndex] = answerIndex;
    }
  }

  previewExam() {
    console.log('Xem trước đề thi:', this.questions);
  }

  removeQuestionFromExam(id: number) {
  if (!confirm('Bạn có chắc muốn xóa câu hỏi này?')) return;

  this.questionService.softDeleteQuestion(id).subscribe({
    next: () => {
      this.questions = this.questions.filter(q => q.id !== id);
      this.selectedAnswers = new Array(this.questions.length).fill(null);
    },
    error: (err) => {
      console.error('Lỗi khi xóa câu hỏi:', err);
      alert('Không thể xóa câu hỏi');
    }
  });
}



  cancelEdit() {
    if (confirm('Bạn có chắc muốn hủy chỉnh sửa?')) {
      this.router.navigate(['/de-thi']);
    }
  }

  finalizeExamUpdate() {
    if (!this.examId) return;

    // Cập nhật thông tin đề thi
    this.deThiService.updateExam(this.examId, this.test).subscribe({
      next: () => {
        // Lấy danh sách ID câu hỏi đang có trong danh sách
        const questionIds = this.questions.map(q => q.id);

        // Gửi câu hỏi lên DB
        this.deThiService.replaceQuestionsInExam(this.examId!, questionIds).subscribe({
          next: () => {
            alert('Cập nhật đề thi thành công!');
            this.router.navigate(['/de-thi']);
          },
          error: (err) => {
            console.error('Lỗi khi cập nhật câu hỏi:', err);
            alert('Không thể cập nhật câu hỏi');
          }
        });
      },
      error: (err) => {
        console.error('Lỗi cập nhật đề thi:', err);
        alert('Không thể cập nhật đề thi');
      }
    });
  }


  createNewQuestion() {
    this.router.navigate(['/them-cau-hoi']);
  }
  getAnswerLabel(index: number): string {
    return ['A', 'B', 'C', 'D'][index] || '';
  }

  buildAnswers(q: Question): string[] {
    const answers = [q.option1, q.option2];
    if (q.option3) answers.push(q.option3);
    if (q.option4) answers.push(q.option4);
    return answers;
  }

}
