import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private apiUrl = 'http://localhost:8080/api/scores'; // Sửa theo URL backend của bạn

  constructor(private http: HttpClient) {}

  getScores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
