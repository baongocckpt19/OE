import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  totalStudents: number = 0;
  totalQuestions: number = 0;
  totalExams: number = 0;

  


  constructor(private dashboardService: DashboardService) { } // Sử dụng DashboardService (chữ hoa 'D')

  ngOnInit(): void {
    this.loadTotalStudents();
    this.loadTotalQuestions();
    this.loadTotalExams();
  }

  loadTotalStudents() {
    this.dashboardService.getTotalStudents().subscribe(
      data => {
        this.totalStudents = data.totalStudents;
      },
      error => {
        console.error('Lỗi khi tải tổng số học sinh', error);
      }
    );
  }
  loadTotalQuestions() {
    this.dashboardService.getTotalQuestions().subscribe(
      data => {
        this.totalQuestions = data.totalQuestions;
      },
      error => {
        console.error('Lỗi khi tải tổng số câu hỏi', error);
      }
    );
  }

  loadTotalExams() {
    this.dashboardService.getTotalExams().subscribe(
      data => {
        this.totalExams = data.totalExams;
      },
      error => {
        console.error('Lỗi khi tải tổng số câu hỏi', error);
      }
    );
  }
}