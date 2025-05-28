import { Component, AfterViewInit, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard-student',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './dashboard-student.component.html',
  styleUrl: './dashboard-student.component.scss'
})
export class DashboardStudentComponent implements OnInit, AfterViewInit {
  student = { fullName: '', class: '', email: '' };
  averageScore = 0;
  completedExams = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    const studentId = this.dashboardService.getCurrentUserId();
    this.dashboardService.getStudentSummary(studentId).subscribe(data => {
      this.averageScore = data.averageScore;
      this.completedExams = data.completedExams;
      this.student = {
        fullName: data.studentInfo.fullName,
        class: data.studentInfo.class,
        email: data.studentInfo.email
      };
    });
  }

  ngAfterViewInit(): void {
    const studentId = this.dashboardService.getCurrentUserId();
    this.dashboardService.getRecentScores(studentId).subscribe(data => {
      const labels = data.map(item => item.exam_name);
      const scores = data.map(item => item.score);
      this.renderLineChart(labels, scores);
      this.renderBarChart(labels, scores);
    });
  }

  renderLineChart(labels: string[], scores: number[]) {
    const ctx = document.getElementById('scoreChartLine') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          data: scores,
          label: 'Điểm số',
          borderColor: '#1e88e5',
          fill: false,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  renderBarChart(labels: string[], scores: number[]) {
    const ctx = document.getElementById('scoreChartBar') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          data: scores,
          label: 'Điểm số',
          backgroundColor: '#43a047'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}
