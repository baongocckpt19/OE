import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Thêm FormsModule để sử dụng ngModel
import { HeaderComponent } from '../header/header.component';
import { Subject } from 'rxjs';
import { create } from 'domain';



@Component({
  selector: 'app-question-management',
  standalone: true, // Đánh dấu component là standalone
  imports: [CommonModule, FormsModule,HeaderComponent], // Thêm FormsModule vào imports
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.scss'],
})
export class QuestionManagementComponent {

[x: string]: any;
  questions = [
    { id: 1, text: 'Câu Hỏi 1', subject: 'Toán', difficulty: 'Nhận biết', creator: 'Nguyễn văn A', date: '1/1/2025' },
    { id: 2, text: 'Câu hỏi 2', subject: 'lí', difficulty: 'Nhận biết', creator: 'Nguyễn văn b', date: '1/1/2025' },
    { id: 3, text: 'Câu hỏi 3', subject: 'Hóa', difficulty: 'Nhận biết', creator: 'Nguyễn văn c', date: '1/1/2025' },
    { id: 4, text: 'Câu hỏi 4', subject: 'Văn', difficulty: 'Nhận biết', creator: 'Nguyễn văn d', date: '1/1/2025' },
    { id: 5, text: 'Câu hỏi 5', subject: 'Anh', difficulty: 'Nhận biết', creator: 'Nguyễn văn e', date: '1/1/2025'}
  ];

  searchQuery: string = '';

  deleteQuestion(id: number) {
    this.questions = this.questions.filter(question => question.id !== id);
  }
  viewQuestion(arg0: number) {
    throw new Error('Method not implemented.');
  }
  editQuestion(arg0: number) {
    throw new Error('Method not implemented.');
  }
}