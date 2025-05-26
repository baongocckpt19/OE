import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Question {
  questionText: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctOption: number;
  nameOfSubject: string;
  difficulty: string;
  createdBy: string;
  createdAt: string;
}

@Component({
  selector: 'app-themcauhoi',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './themcauhoi.component.html',
  styleUrl: './themcauhoi.component.scss'
})
export class ThemcauhoiComponent {
  showPreview: boolean = false;

  question: Question = {
    questionText: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctOption: 1,
    nameOfSubject: '',
    difficulty: 'dễ',
    createdBy: '1',
    createdAt: ''
  };

  constructor(private http: HttpClient) {}

  onSave() {
    console.log('Saving question:', this.question);
    this.http.post<Question>('http://localhost:8080/api/questions', this.question).subscribe({
      next: (response) => {
        console.log('Question saved successfully', response);
        this.resetForm();
        this.showPreview = false;
      },
      error: (error) => {
        console.error('Error saving question:', error);
      }
    });
  }

  resetForm() {
    this.question = {
      questionText: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctOption: 1,
      nameOfSubject: '',
      difficulty: 'dễ',
      createdBy: 'admin',
      createdAt: ''
    };
    this.showPreview = false;
  }

  preview() {
    this.showPreview = true;
  }
}
