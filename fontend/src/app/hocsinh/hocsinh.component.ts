import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Student, StudentService } from '../services/student.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hocsinh',
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './hocsinh.component.html',
   styleUrls: ['./hocsinh.component.scss']
})
export class HocsinhComponent {
  students: any[] = [];
  filteredStudents: Student[] = [];
  searchText: string = '';
  constructor(private studentService: StudentService, private http: HttpClient) { }
  selectedStudent: any = null;
  exams: { examId: number, examName : string }[] = [];

  ngOnInit() {
    this.loadStudents();
    this.loadExams();
  }
loadExams() {
  this.http.get<any[]>('http://localhost:8080/api/dethi').subscribe(
    (data) => {
      this.exams = data;
      console.log('Danh sách exams:', this.exams);
    },
    (error) => {
      console.error('Lỗi khi tải danh sách bài thi:', error);
    }
  );
}
  loadStudents() {
    this.studentService.getAllStudents().subscribe(
      (data) => {
        this.students = data;
        this.filteredStudents = data;
      },
      (error) => {
        console.error('Error loading students:', error);
      }
    );
  }
  searchStudents():void {
    const keyword = this.searchText.toLowerCase(); 
    this.filteredStudents = this.students.filter(student =>
      student.fullName.toLowerCase().includes(keyword)
      || student.email.toLowerCase().includes(keyword)
      || student.studentClass.toLowerCase().includes(keyword)
    );
  }

  deleteStudent(id: number) {
    if (!confirm("Bạn có chắc chắn muốn xóa học sinh này?")) return;
    this.studentService.deleteStudent(id).subscribe(
      () => {
        this.loadStudents(); // 🔁 Tự động reload lại danh sách

      },
      (error) => {
        console.error('Error deleting student:', error);
      }
    );
  }
getExamTitleById(examId: number | string): string {
  const id = +examId;
  const exam = this.exams.find(e => e.examId === id);
  console.log(`Tìm examId = ${id} =>`, exam);
  return exam ? exam.examName  : 'Unknown';
}


viewStudent(id: number) {
  this.http.get<any[]>(`http://localhost:8080/api/results/user/${id}`).subscribe(results => {
    const student = this.students.find(s => s.userId === id);
    if (student) {
      this.selectedStudent = {
        ...student,
        exams: results.map(r => ({
          examId: r.examId,
          score: r.score,
          submittedAt: new Date(r.submittedAt)
        }))
      };
    }
  });
}


closeModal() {
  this.selectedStudent = null;
}
}
