import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Thêm FormsModule để sử dụng ngModel
import { HeaderComponent } from '../header/header.component';
import { Subject } from 'rxjs';
import { create } from 'domain';
import { QuestionService } from '../services/question.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-question-management',
  standalone: true, // Đánh dấu component là standalone
  imports: [CommonModule, FormsModule, HeaderComponent], // Thêm FormsModule vào imports
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.scss'],
})
export class QuestionManagementComponent {
  [x: string]: any;
  questions: any[] = [];

  constructor(private questionService: QuestionService, private router: Router) { }

  searchText: string = '';
  filteredQuestions: any[] = [];
  selectedQuestion: any = null;
  isModalVisible: boolean = false;

  subjects: string[] = [];
  difficulties: string[] = [];
  creators: string[] = [];
  levels: string[] = ['Dễ', 'Trung bình', 'Khó'];



  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions() {
    this.questionService.getQuestions().subscribe((data) => {
      this.questions = data;
      this.filteredQuestions = data;
      this.subjects = [...new Set(data.map(q => q.nameOfSubject))];
      this.difficulties = [...new Set(data.map(q => q.difficulty))];
      this.creators = [...new Set(data.map(q => q.createdBy))];
      this.levels = [...new Set(data.map(q => q.level))];
    },(error) => {
      console.error('Lỗi khi tải câu hỏi:', error);
    });
  }
  onSearch() {
    const keyword = this.searchText.toLowerCase().trim();

    this.filteredQuestions = this.questions.filter(q => {
      return q.questionText.toLowerCase().includes(keyword) ||
        q.nameOfSubject.toLowerCase().includes(keyword) ||
        q.difficulty.toLowerCase().includes(keyword) ||
        q.createdBy.toLowerCase().includes(keyword);
    });
  }

  deleteQuestion(id: number) {
    if (confirm('Bạn có chắc chắn muốn xóa câu hỏi này?')) {
      this.questionService.deleteQuestion(id).subscribe({
        next: (response) => { // Thêm tham số response nếu API trả về dữ liệu sau khi xóa
          console.log('Xóa câu hỏi thành công', response);
          console.log('Bắt đầu gọi loadQuestions()');
          this.loadQuestions();
          console.log('Kết thúc gọi loadQuestions()');
  
          // Hoặc, nếu API trả về trạng thái/danh sách mới, bạn có thể xử lý như sau:
          // this.questions = response.newListOfQuestions;
          // this.filteredQuestions = [...this.questions];
        },
        error: (err) => {
          console.error('Lỗi khi xóa câu hỏi:', err);
          alert('Đã xảy ra lỗi khi xóa câu hỏi. Vui lòng thử lại sau.');
        },
      });
    }
  }



  viewQuestion(id: number) {
    const found = this.questions.find((q) => q.id === id);
    if (found) {
      this.selectedQuestion = found;
      this.isModalVisible = true;
    }
  }

  closeModal() {
    this.isModalVisible = false;
  }


  editQuestion(id: number) {
    console.log('Edit question', id);
  }
  goToAddQuestion() {
    this.router.navigate(['/them-cau-hoi']);
  }
  showFilter = false;
  filterSubject = '';
  filterLevel = '';
  filterDate: string | null = null;

  cancelFilter() {
    this.showFilter = false;
    this.filterSubject = '';
    this.filterLevel = '';
    this.filterDate = null;
  }

  applyFilter() {
    // Lọc danh sách tại đây
    this.showFilter = false;
    this.filterQuestions();
  }

  filterQuestions() {
    // Gọi API hoặc lọc tại client-side theo filterSubject, filterLevel, filterDate
  }

}