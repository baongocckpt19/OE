// de-thi.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AccountService } from './account-service.service';

export interface Question {
  question: string;
  level: any;
  difficulty: any;
  subject: any;
  nameOfSubject: any;
  id: number;
  questionText: string;
  option1: string;
  option2: string;
  option3?: string;
  option4?: string;
}

export interface Dethi {
  examId: number;
  examName: string;
  description: string;
  duration: number;
  created_by: string;
  created_at: string;
  name_of_subject: string;
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
  deleteDethi(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      responseType: 'text',
      observe: 'response',
    });
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

  addQuestionsToExam(examId: number, questionIds: number[]): Observable<string> {
    const url = `${this.apiUrl}/${examId}/questions`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    console.log('📤 Payload gửi lên backend:', questionIds);

    // Gửi trực tiếp mảng, KHÔNG gói vào object
    return this.http.post<string>(url, questionIds, {
      headers,
      responseType: 'text' as 'json'
    });
  }

  submitExam(payload: any): Observable<{ score: number }> {
    return this.http.post<{ score: number }>('http://localhost:8080/api/dethi/submit-exam', payload);

  }
  getExamById(id: number): Observable<Dethi> {
    return this.http.get<Dethi>(`${this.apiUrl}/${id}`);
  }
//// cập nhât đề thi
updateExam(id: number, exam: Dethi): Observable<any> {
  return this.http.put(`http://localhost:8080/api/dethi/${id}`, exam, {
    responseType: 'text'
  });
}


  // Thay thế câu hỏi trong đề thi  
replaceQuestionsInExam(examId: number, questionIds: number[]): Observable<any> {
  const url = `${this.apiUrl}/${examId}/replace-questions`;
  const token = sessionStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.put(url, questionIds, {
    headers,
    responseType: 'text' as 'json'
  });
}

}