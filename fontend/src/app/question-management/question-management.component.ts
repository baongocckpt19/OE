import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-question-management',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.scss']
})
export class QuestionManagementComponent {
  questions: any[] = [];
  filteredQuestions: any[] = [];
users: any[] = [];  
  searchText = '';
  showFilter = false;
  filterSubject = '';
  filterLevel = '';
  filterDate: string | null = null;

  subjects: string[] = [];
  levels: string[] = ['dễ', 'trung bình', 'khó'];

  selectedQuestion: any = null;
  isModalVisible = false;
  isAddModalVisible = false;
  showPreview = false;

  question: any = this.getEmptyQuestion();

  constructor(private questionService: QuestionService, private router: Router) {}

  ngOnInit(): void {
  this.loadQuestions();
  this.loadUsers();
  }

  getEmptyQuestion() {
    return {
      questionText: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctOption: 1,
      nameOfSubject: '',
      difficulty: 'dễ',
      createdBy: 1
      // createdAt: new Date().toISOString().slice(0, 10) // Không cần gửi createdAt, server tự xử lý
    };
  }
loadUsers() {
  this.questionService.getUsers().subscribe({
    next: data => {
      this.users = data;
      console.log('Dữ liệu người dùng:', data);
    },
    error: err => console.error('Lỗi khi tải danh sách người dùng:', err)
  });
}

loadQuestions() {
  this.questionService.getQuestions().subscribe({
    next: data => {
      console.log('Dữ liệu câu hỏi:', data.map(q => ({ id: q.id, createdBy: q.createdBy, type: typeof q.createdBy })));
      this.questions = this.filteredQuestions = data;
      this.subjects = [...new Set(data.map(q => q.nameOfSubject))];
    },
    error: err => console.error('Lỗi khi tải câu hỏi:', err)
  });
}

getUsernameById(userId: any): string {
  const id = +userId;
  const user = this.users.find(u => +u.userId === id);

  if (!user) {
    console.warn(`Không tìm thấy user với id = ${id}`);
    console.warn('Danh sách users hiện tại:', this.users);
  }

  return user ? user.username : 'Không rõ';
}

  onSearch() {
    const keyword = this.searchText.toLowerCase().trim();
    this.filteredQuestions = this.questions.filter(q =>
      [q.questionText, q.nameOfSubject, q.difficulty, q.createdBy]
        .some(field => field.toLowerCase().includes(keyword))
    );
  }

  deleteQuestion(id: number) {
    if (confirm('Bạn có chắc chắn muốn xóa câu hỏi này?')) {
      this.questionService.deleteQuestion(id).subscribe({
        next: () => this.loadQuestions(),
        error: () => alert('Lỗi khi xóa câu hỏi')
      });
    }
  }

  viewQuestion(id: number) {
    this.selectedQuestion = this.questions.find(q => q.id === id);
    this.isModalVisible = !!this.selectedQuestion;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  goToAddQuestion() {
    this.isAddModalVisible = true;
    this.resetForm();
  }

  resetForm() {
    this.question = this.getEmptyQuestion();
    this.showPreview = false;
  }

  preview() {
    this.showPreview = true;
  }

  onSave() {
    if (
      !this.question.questionText.trim() ||
      !this.question.option1.trim() ||
      !this.question.option2.trim() ||
      !this.question.option3.trim() ||
      !this.question.option4.trim()
    ) {
      alert('Vui lòng nhập đầy đủ nội dung câu hỏi và các phương án!');
      return;
    }

    const payload = { ...this.question };
    delete payload.createdAt; // 🔥 Tránh gửi createdAt gây lỗi 500

    this.questionService.addQuestion(payload).subscribe({
      next: () => {
        alert('Thêm câu hỏi thành công!');
        this.loadQuestions();
        this.resetForm();
        this.isAddModalVisible = false;
      },
      error: (err) => {
        console.error('Lỗi khi gửi câu hỏi:', err);
        alert('Không thể thêm câu hỏi. Vui lòng kiểm tra lại dữ liệu và kết nối server!');
      }
    });
  }

  cancelFilter() {
    this.showFilter = false;
    this.filterSubject = this.filterLevel = '';
    this.filterDate = null;
  }

  applyFilter() {
    this.showFilter = false;
    this.filteredQuestions = this.questions.filter(q =>
      (!this.filterSubject || q.nameOfSubject === this.filterSubject) &&
      (!this.filterLevel || q.difficulty === this.filterLevel) &&
      (!this.filterDate || q.createdAt?.slice(0, 10) === this.filterDate)
    );
  }

  editQuestion(id: number) {
    console.log('Edit question', id); // placeholder
  }
}
