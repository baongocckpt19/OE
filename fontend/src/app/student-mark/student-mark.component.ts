import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { ScoreService } from '../services/score.service';

@Component({
  selector: 'app-student-mark',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule],
  templateUrl: './student-mark.component.html',
  styleUrls: ['./student-mark.component.scss']
})
export class StudentMarkComponent implements OnInit, OnDestroy {
  scores: any[] = [];
  filteredScores: any[] = [];
  searchTerm: string = '';
  showFilter: boolean = false;

  fromDate?: string;
  toDate?: string;
  sortDirection?: 'asc' | 'desc';

  tempFromDate?: string;
  tempToDate?: string;
  tempSortDirection?: 'asc' | 'desc';

  private subscription?: Subscription;

  constructor(private scoreService: ScoreService) { }

  ngOnInit(): void {
    const currentUserStr = localStorage.getItem('currentUser');
    if (!currentUserStr) {
      console.warn('Không tìm thấy currentUser trong localStorage');
      return;
    }

    try {
      const currentUser = JSON.parse(currentUserStr);
      const userId = currentUser?.user_id;

      if (!userId) {
        console.warn('Không tìm thấy user_id trong currentUser');
        return;
      }

      this.subscription = this.scoreService.getScoresByUser(userId).subscribe({
        next: async (data) => {
          this.scores = data;

          // Lấy examName cho từng score, giả sử có examId trong score
          for (const score of this.scores) {
        this.scores.forEach(score => {
          // Gọi API lấy examName
          this.scoreService.getExamById(score.examId).subscribe({
            next: (exam) => {
              score.examName = exam.examName;
            },
            error: () => {
              score.examName = 'Không xác định';
            }
          });

          // Gọi API lấy name_of_subject (giả sử có method getSubjectById)
          this.scoreService.getSubjectById(score.examId).subscribe({
            next: (subject) => {
              score.name_of_subject = subject.name_of_subject;
            },
            error: () => {
              score.name_of_subject = 'Không xác định';
            }
          });
        });
          }

          this.filteredScores = [...this.scores];
        },
        error: (err) => {
          console.error('Lỗi khi tải điểm số:', err);
        }
      });
    } catch (e) {
      console.error('Lỗi parse currentUser từ localStorage:', e);
    }
  }




  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  removeVietnameseTones(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  filterScores(): void {
    const keyword = this.removeVietnameseTones(this.searchTerm);
    this.filteredScores = this.scores.filter(score =>
      this.removeVietnameseTones(score.examName).includes(keyword) ||
      this.removeVietnameseTones(score.subject).includes(keyword)
    );
  }

  toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }

  applyFilter(): void {
    this.fromDate = this.tempFromDate;
    this.toDate = this.tempToDate;
    this.sortDirection = this.tempSortDirection;

    let result = [...this.scores];

    // Lọc theo ngày
    if (this.fromDate || this.toDate) {
      const from = this.fromDate ? new Date(this.fromDate) : new Date('2000-01-01');
      const to = this.toDate ? new Date(this.toDate + 'T23:59:59') : new Date('2100-01-01');

      result = result.filter(score => {
        const isoDateStr = score.finishedAt.replace(' ', 'T');
        const scoreDate = new Date(isoDateStr);
        return scoreDate >= from && scoreDate <= to;
      });
    }

    // Sắp xếp
    if (this.sortDirection === 'asc') {
      result.sort((a, b) => a.score - b.score);
    } else if (this.sortDirection === 'desc') {
      result.sort((a, b) => b.score - a.score);
    }

    this.filteredScores = result;
    this.showFilter = false;
  }

  resetFilter(): void {
    this.filteredScores = [...this.scores];
    this.fromDate = undefined;
    this.toDate = undefined;
    this.tempFromDate = undefined;
    this.tempToDate = undefined;
    this.sortDirection = undefined;
    this.tempSortDirection = undefined;
  }
}
