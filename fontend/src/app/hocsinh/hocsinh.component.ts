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
  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getAllStudents().subscribe(
      (data) => {
        this.students = data;
      },
      (error) => {
        console.error('Error loading students:', error);
      }
    );
  }
  searchStudents() {
    if (this.searchText.trim() === '') {
        this.filteredStudents = [...this.students]; // Hiển thị lại tất cả nếu searchText rỗng
    } else {
        this.filteredStudents = this.students.filter(student =>
            student.fullName.toLowerCase().includes(this.searchText.toLowerCase()) 

        );
    }
}

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id).subscribe(
      () => {
        this.students = this.students.filter(student => student.id !== id);
      },
      (error) => {
        console.error('Error deleting student:', error);
      }
    );
  }

  viewStudent(id: number) {
    // Implement view logic
  }
}
