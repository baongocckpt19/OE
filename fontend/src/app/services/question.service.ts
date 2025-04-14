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
}
