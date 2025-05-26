import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Student, StudentService } from '../services/student.service';

@Component({
  selector: 'app-hocsinh',
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './hocsinh.component.html',
  styleUrl: './hocsinh.component.scss'
})
export class HocsinhComponent {
  students: any[] = [];
  filteredStudents: Student[] = [];
  searchText: string = '';
  constructor(private studentService: StudentService) { }
  selectedStudent: any = null;
  
  ngOnInit() {
    this.loadStudents();
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
  viewStudent(id: number) {
  const student = this.students.find(s => s.userId === id);
  if (student) {
    // Giả sử bạn có thể lấy danh sách bài thi từ student.exams
    this.selectedStudent = {
      ...student,
      exams: student.exams || [  // Dữ liệu demo
        { title: 'Toán học kỳ I', score: 8.5, submittedAt: new Date() },
        { title: 'Văn học kỳ I', score: 7.0, submittedAt: new Date() },
      ]
    };
  }
}

closeModal() {
  this.selectedStudent = null;
}
}
