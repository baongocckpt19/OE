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
  const mockScores = [
    {
      examName: 'Đề kiểm tra giữa kỳ Toán 10',
      subject: 'Toán',
      finishedAt: '2025-05-20 14:00',
      score: 8.5
    },
    {
      examName: 'Đề thi thử môn Văn lớp 11',
      subject: 'Ngữ văn',
      finishedAt: '2025-05-21 09:30',
      score: 7.0
    },
    {
      examName: 'Kiểm tra tiếng Anh học kỳ 2',
      subject: 'Tiếng Anh',
      finishedAt: '2025-05-18 16:45',
      score: 9.0
    },
    {
      examName: 'Đề ôn tập Vật lý lớp 12',
      subject: 'Vật lý',
      finishedAt: '2025-05-17 10:15',
      score: 6.75
    },
    {
      examName: 'Thi thử Hóa học THPTQG',
      subject: 'Hóa học',
      finishedAt: '2025-05-19 13:00',
      score: 8.0
    }
  ];

  return new Observable(observer => {
    setTimeout(() => {
      observer.next(mockScores);
      observer.complete();
    }, 500); // delay giả lập backend
  });
}

}
