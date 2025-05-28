import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Dethi {
  examId: number;
  examName: string;
  description: string;
  duration: number;
  created_by: string;
  created_at: string;
  name_of_subject: string;
}
@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private apiUrl = 'http://localhost:8080/api/results'; // Sửa theo URL backend của bạn

  constructor(private http: HttpClient) {}


  getScores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

getScoresByUser(userId: number): Observable<any[]> {
  return this.http.get<any[]>(`http://localhost:8080/api/results/user/${userId}`);
}
getExamById(examId: number): Observable<Dethi> {
  return this.http.get<Dethi>(`http://localhost:8080/api/dethi/${examId}`);

}
getSubjectById(subjectId: number): Observable<any> {
  return this.http.get<any>(`http://localhost:8080/api/dethi/${subjectId}`);
}
}
