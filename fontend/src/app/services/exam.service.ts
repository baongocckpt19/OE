import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private apiUrl = 'http://localhost:8080/api/exam';

  constructor(private http: HttpClient) { }

  addExam(test: any, userId: number): Observable<any> {
    const params = new HttpParams()
      .set('userId', userId);
    return this.http.post(this.apiUrl, test, { params });
  }
  publishExam(exam: any, questions: any[]) {
    const payload = {
      exam,
      questions
    };
    return this.http.post(`${this.apiUrl}/publish`, payload);
  }
  


}

