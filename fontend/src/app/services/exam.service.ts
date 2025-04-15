import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private apiUrl = 'http://localhost:8080/api/exam';

  constructor(private http: HttpClient) {}

  addExam(test: any, userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/addExam?userId=${userId}`, test);
  } }

