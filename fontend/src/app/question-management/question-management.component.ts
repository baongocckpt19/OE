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
    this.questionService.getQuestions().subscribe((data) => {
      this.questions = data;
      this.filteredQuestions = data; // ban đầu hiển thị toàn bộ
      this.subjects = [...new Set(data.map(q => q.nameOfSubject))];
    this.difficulties = [...new Set(data.map(q => q.difficulty))];
    this.creators = [...new Set(data.map(q => q.createdBy))];
    this.levels = [...new Set(data.map(q => q.level))];
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
    this.questions = this.questions.filter((q) => q.id !== id);
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