// de-thi.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Dethi {
  examId: number;
  examName: string;
  description: string;
  duration: string;
  created_by: string;
  created_at: string;
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
  // Bạn có thể thêm các phương thức khác như postDethi, deleteDethi, updateDethi nếu cần
}