// de-thi.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Dethi {
    examId: number;
    examName: string;
    description: string;
    duration: string;
    created_by: string;
    created_at: string;
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

  // Bạn có thể thêm các phương thức khác như postDethi, deleteDethi, updateDethi nếu cần
}