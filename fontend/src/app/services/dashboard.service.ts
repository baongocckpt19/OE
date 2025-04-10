import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8080/api'; // Thay đổi nếu API của bạn khác

  constructor(private http: HttpClient) { }

  getTotalStudents(): Observable<{ totalStudents: number }> {
    return this.http.get<{ totalStudents: number }>(`${this.apiUrl}/students/count`);
  }
  getTotalQuestions(): Observable<{ totalQuestions: number }> {
    return this.http.get<{ totalQuestions: number }>(`${this.apiUrl}/questions/count`);
  }
  getTotalExams(): Observable<{ totalExams: number }> {
    return this.http.get<{ totalExams: number }>(`${this.apiUrl}/exams/count`);
  }
}