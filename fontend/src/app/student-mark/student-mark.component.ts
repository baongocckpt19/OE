import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
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

  constructor(private scoreService: ScoreService) {}

  ngOnInit(): void {
    this.subscription = this.scoreService.getScores().subscribe({
      next: (data) => {
        this.scores = data;
        this.filteredScores = data;
      },
      error: (err) => {
        console.error('Lỗi khi tải điểm số:', err);
      }
    });
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
