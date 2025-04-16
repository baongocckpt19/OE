import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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
  imports: [HeaderComponent, FormsModule],
  templateUrl: './themcauhoi.component.html',
  styleUrl: './themcauhoi.component.scss'
})
export class ThemcauhoiComponent {
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
  constructor(private http: HttpClient) { }

  onSave() {
    console.log('Saving question:', this.question);
    this.http.post<Question>('http://localhost:8080/api/questions', this.question) // Specify the type of the expected response
      .subscribe({
        next: (response) => {
          console.log('Question saved successfully', response);
          // Handle success (e.g., show a success message, reset the form)
          this.resetForm(); //Added reset form.
        },
        error: (error) => {
          console.error('Error saving question:', error); // This is where your error log comes from
          // Handle error (e.g., show an error message)
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
  }
  
}
