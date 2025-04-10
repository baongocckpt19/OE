import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hocsinh',
  imports: [HeaderComponent, CommonModule],
  templateUrl: './hocsinh.component.html',
  styleUrl: './hocsinh.component.scss'
})
export class HocsinhComponent {
  viewStudent(arg0: number) {
    throw new Error('Method not implemented.');
  }
  students = [
    { id: 1, name: 'Nguyễn Văn A', class: '10A1', dob: '01/01/2005', email: 'nguyenvana@example.com', avgScore: 8.5 },
    { id: 2, name: 'Trần Thị B', class: '10A2', dob: '02/02/2005', email: 'tranthib@example.com', avgScore: 9.0 },
    { id: 3, name: 'Lê Văn C', class: '10A3', dob: '03/03/2005', email: 'levanc@example.com', avgScore: 7.5 },
    { id: 4, name: 'Phạm Thị D', class: '10A4', dob: '04/04/2005', email: 'phamthid@example.com', avgScore: 8.0 },
    { id: 5, name: 'Hoàng Văn E', class: '10A5', dob: '05/05/2005', email: 'hoangvane@example.com', avgScore: 8.2 }
  ];

  searchQuery: string = '';

  deleteStudent(id: number) {
    this.students = this.students.filter(student => student.id !== id);
  }
}
