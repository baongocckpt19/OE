import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-de-thi-student',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './de-thi-student.component.html',
  styleUrls: ['./de-thi-student.component.scss']
})
export class DeThiStudentComponent implements OnInit {
  dethis: any[] = [];
  filteredDethis: any[] = [];
  searchTerm: string = '';
  filterSubject: string = '';
  filterDate: string = '';
  showFilter: boolean = false;
  subjects: string[] = [];
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.dethis = [
      {
        examId: 1,
        examName: 'Toán cơ bản',
        name_of_subject: 'Toán',
        duration: 60,
        createdAt: '2025-05-27'
      },
      {
        examId: 2,
        examName: 'Vật lý nâng cao',
        name_of_subject: 'Vật lý',
        duration: 45,
        createdAt: '2025-05-26'
      },
      {
        examId: 3,
        examName: 'Hóa học tổng hợp',
        name_of_subject: 'Hóa học',
        duration: 50,
        createdAt: '2025-05-25'
      }
    ];

    this.subjects = [...new Set(this.dethis.map(d => d.name_of_subject))];
    this.filteredDethis = [...this.dethis];
  }

  removeVietnameseTones(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  filterDethis(): void {
    const keyword = this.removeVietnameseTones(this.searchTerm);
    this.filteredDethis = this.dethis.filter(d =>
      this.removeVietnameseTones(d.examName).includes(keyword)
    );
  }

  applyFilter(): void {
    this.filteredDethis = this.dethis.filter(d => {
      const matchSubject = this.filterSubject ? d.name_of_subject === this.filterSubject : true;
      const matchDate = this.filterDate
        ? new Date(d.createdAt).toDateString() === new Date(this.filterDate).toDateString()
        : true;
      return matchSubject && matchDate;
    });
    this.showFilter = false;
  }

  cancelFilter(): void {
    this.filterSubject = '';
    this.filterDate = '';
    this.filteredDethis = [...this.dethis];
    this.showFilter = false;
  }

  startExam(examId: number): void {
    console.log('Bắt đầu làm bài thi ID:', examId);
     this.router.navigate(['/trangthi', examId]);
  }
}
