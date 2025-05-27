// de-thi.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AccountService } from './account-service.service';

export interface Dethi {
  examId: number;
  examName: string;
  description: string;
  duration: string;
  created_by: string;
  created_at: string;
  name_of_subject: string;
}
export interface Question {
  questionId: number;
  questionText: string;
  option1: string;
  option2: string;
  option3?: string;
  option4?: string;
}
export interface DethiDetailsResponse {
  exam: Dethi;
  questions: Question[];
}
@Injectable({
  providedIn: 'root'
})

export class DeThiService {
  private apiUrl = 'http://localhost:8080/api/dethi'; // Thay thế bằng API endpoint thực tế của bạn

  constructor(private http: HttpClient) { }

  getDethis(): Observable<Dethi[]> {
    return this.http.get<Dethi[]>(this.apiUrl);
  }
  // Lấy chi tiết đề thi theo ID (gồm đề + danh sách câu hỏi)
  getDethiDetails(id: number): Observable<DethiDetailsResponse> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<DethiDetailsResponse>(`${this.apiUrl}/details/${id}`);
  }

addExam(examData: any, userId: number): Observable<any> {
  return this.http.post(
    `${this.apiUrl}/addExam?userId=${userId}`,
    examData
  );
}
// de-thi.service.ts
addQuestionsToExam(examId: number, questionIds: number[]): Observable<any> {
  const url = `${this.apiUrl}/${examId}/questions`;
  const token = sessionStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.post(url, questionIds, { headers, responseType: 'text' });
}

}