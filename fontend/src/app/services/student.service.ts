// src/app/services/student.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
export interface Student {
    userId: number;
    username: string;
    passwordHash: string;
    email: string;
    fullName: string;
    birthday: Date;
    studentClass: string;
    role: string;
    createdAt: Date;
  }
@Injectable({
  providedIn: 'root'
})
export class StudentService {
    private apiUrl = 'http://localhost:8080/api/students'; // Đổi port thành 8080 (Spring Boot mặc định)

    constructor(private http: HttpClient) { }
  
    // Lấy tất cả học sinh
    getAllStudents(): Observable<Student[]> {
        console.log('Fetching students from:', this.apiUrl);
        return this.http.get<Student[]>(this.apiUrl).pipe(
            tap(data => console.log('Data received:', data)), // Thêm dòng này
            catchError(error => {
                console.error('Error fetching students:', error);
                return throwError(() => error);
            })
        );
    }
  
    // Lọc theo lớp
    getStudentsByClass(className: string): Observable<Student[]> {
      return this.http.get<Student[]>(`${this.apiUrl}/class/${className}`);
    }
  
    // Lọc theo vai trò
    getStudentsByRole(role: string): Observable<Student[]> {
      return this.http.get<Student[]>(`${this.apiUrl}/role/${role}`);
    }
  
    // Lọc theo domain email
    getStudentsByEmailDomain(domain: string): Observable<Student[]> {
      return this.http.get<Student[]>(`${this.apiUrl}/email/${domain}`);
    }
  
    // Xóa học sinh
    deleteStudent(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}