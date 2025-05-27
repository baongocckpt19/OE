// File: src/app/services/question.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuestionService {
  private API_URL = 'http://localhost:8080/api/questions';

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  deleteQuestion(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`, {
      responseType: 'text',
      observe: 'response',
    });
  }
addQuestion(question: any): Observable<any> {
  return this.http.post(this.API_URL, question);
}
getUsers(): Observable<any[]> {
  return this.http.get<any[]>('http://localhost:8080/api/users');
}
updateQuestion(id: number, updatedData: any) {
  return this.http.put(`http://localhost:8080/api/questions/${id}`, updatedData);
}

}
