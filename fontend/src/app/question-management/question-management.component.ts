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
users: { userId: number; fullname: string }[] = [];
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
  isEditMode: boolean = false;
  editingQuestionId: number | null = null;

  constructor(private questionService: QuestionService, private router: Router) {}

  ngOnInit(): void {
    this.loadQuestions();
    this.loadUsers();
  }

getEmptyQuestion() {
  const storedUser = localStorage.getItem('currentUser');
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  return {
    questionText: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctOption: 1,
    nameOfSubject: '',
    difficulty: 'dễ',
    createdBy: currentUser?.user_id || null, // Gán userId từ localStorage
  };
}

 loadUsers() {
    this.questionService.getUsers().subscribe({ // Giữ nguyên getUsers() nếu đây là API bạn dùng để lấy user data
      next: data => {
        console.log('Dữ liệu gốc từ API (users cho QuestionManagement):', data); // Log dữ liệu thô từ API

        if (data && Array.isArray(data)) {
          // Ánh xạ dữ liệu để tạo thuộc tính 'fullname'
          this.users = data.map((user: any) => ({
            userId: user.userId || user.id, // Đảm bảo lấy đúng ID người dùng
            // Ưu tiên 'full_name' (từ API), sau đó 'name', và cuối cùng là 'username'
            fullname: user.fullName || user.name || 'Unknown User',
          }));
          console.log('Mảng users đã được ánh xạ (QuestionManagement):', this.users); // Log mảng users sau khi ánh xạ
        } else {
          console.warn('API trả về dữ liệu không hợp lệ cho người dùng (QuestionManagement):', data);
          this.users = []; // Đảm bảo mảng users rỗng nếu dữ liệu không hợp lệ
        }
      },
      error: err => console.error('Lỗi khi tải danh sách người dùng (QuestionManagement):', err)
    });
  }

  loadQuestions() {
    this.questionService.getQuestions().subscribe({
      next: data => {
         console.log('Dữ liệu gốc từ API (teachers):', data);
        console.log('Dữ liệu câu hỏi:', data.map(q => ({ id: q.id, createdBy: q.createdBy, type: typeof q.createdBy })));
        this.questions = this.filteredQuestions = data;
        this.subjects = [...new Set(data.map(q => q.nameOfSubject))];
      },
      error: err => console.error('Lỗi khi tải câu hỏi:', err)
    });
  }

  getUsernameById(userId: any): string {
    const id = +userId; // Chuyển đổi userId sang kiểu số
    const user = this.users.find(u => +u.userId === id);
    // Trả về user.fullname (chữ 'f' thường)
    return user ? user.fullname : 'Không rõ';
  }

  onSearch() {
    const keyword = this.searchText.toLowerCase().trim();
    this.filteredQuestions = this.questions.filter(q =>
      [q.questionText, q.nameOfSubject, q.difficulty, q.createdBy]
        .some(field => field.toString().toLowerCase().includes(keyword))
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
    this.isEditMode = false;
    this.editingQuestionId = null;
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
  const storedUser = localStorage.getItem('currentUser');
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  const payload = {
    ...this.question,
    createdBy: currentUser?.userId || this.question.createdBy,
  };
    //const payload = { ...this.question };

    if (this.isEditMode && this.editingQuestionId !== null) {
      // Chế độ chỉnh sửa
      this.questionService.updateQuestion(this.editingQuestionId, payload).subscribe({
        next: () => {
          alert('Cập nhật câu hỏi thành công!');
          this.loadQuestions();
          this.resetForm();
          this.isAddModalVisible = false;
        },
        error: err => {
          console.error('Lỗi khi cập nhật câu hỏi:', err);
          alert('Không thể cập nhật câu hỏi.');
        }
      });
    } else {
      // Chế độ thêm mới
      delete payload.createdAt;
      this.questionService.addQuestion(payload).subscribe({
        next: () => {
          alert('Thêm câu hỏi thành công!');
          this.loadQuestions();
          this.resetForm();
          this.isAddModalVisible = false;
        },
        error: (err) => {
          console.error('Lỗi khi gửi câu hỏi:', err);
          alert('Không thể thêm câu hỏi.');
        }
      });
    }
  }

  applyFilter() {
    this.showFilter = false;
    this.filteredQuestions = this.questions.filter(q =>
      (!this.filterSubject || q.nameOfSubject === this.filterSubject) &&
      (!this.filterLevel || q.difficulty === this.filterLevel) &&
      (!this.filterDate || q.createdAt?.slice(0, 10) === this.filterDate)
    );
  }

  cancelFilter() {
    this.showFilter = false;
    this.filterSubject = this.filterLevel = '';
    this.filterDate = null;
  }

  editQuestion(id: number) {
    const q = this.questions.find(q => q.id === id);
    if (!q) {
      alert('Không tìm thấy câu hỏi để chỉnh sửa.');
      return;
    }

    this.isAddModalVisible = true;
    this.isEditMode = true;
    this.editingQuestionId = id;
    this.question = { ...q };
    this.showPreview = false;
  }
  cancelAdd() {
  this.isAddModalVisible = false;
  this.resetForm();
}

}

