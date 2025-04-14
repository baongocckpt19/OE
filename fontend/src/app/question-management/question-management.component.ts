import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Thêm FormsModule để sử dụng ngModel
import { HeaderComponent } from '../header/header.component';
import { Subject } from 'rxjs';
import { create } from 'domain';
import { QuestionService } from '../services/question.service';



@Component({
  selector: 'app-question-management',
  standalone: true, // Đánh dấu component là standalone
  imports: [CommonModule, FormsModule,HeaderComponent], // Thêm FormsModule vào imports
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.scss'],
})
export class QuestionManagementComponent {
  questions: any[] = [];

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe((data) => {
      this.questions = data;
    });
  }

  deleteQuestion(id: number) {
    this.questions = this.questions.filter((q) => q.id !== id);
  }

  viewQuestion(id: number) {
    console.log('View question', id);
  }

  editQuestion(id: number) {
    console.log('Edit question', id);
  }
}