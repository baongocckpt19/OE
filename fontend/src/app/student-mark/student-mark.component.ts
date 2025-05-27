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

  // ===== Tìm kiếm không dấu ===== //
  filterScores(): void {
    const keyword = this.removeVietnameseTones(this.searchTerm);
    this.filteredScores = this.scores.filter(score =>
      this.removeVietnameseTones(score.examName).includes(keyword) ||
      this.removeVietnameseTones(score.subject).includes(keyword)
    );
  }

  removeVietnameseTones(str: string): string {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  // ===== Toggle modal ===== //
  toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }

  // ===== Áp dụng lọc (theo ngày) ===== //
  applyFilter(): void {
    this.filterByDate();
    this.showFilter = false;
  }

  // ===== Lọc theo ngày ===== //
  filterByDate(): void {
    if (!this.fromDate && !this.toDate) {
      this.filteredScores = [...this.scores];
      return;
    }

    const from = this.fromDate ? new Date(this.fromDate) : new Date('2000-01-01');
    const to = this.toDate ? new Date(this.toDate + 'T23:59:59') : new Date('2100-01-01');

    this.filteredScores = this.scores.filter(score => {
      const isoDateStr = score.finishedAt.replace(' ', 'T');
      const scoreDate = new Date(isoDateStr);
      return scoreDate >= from && scoreDate <= to;
    });
  }

  // ===== Sắp xếp điểm ===== //
  sortByScoreAsc(): void {
    this.filteredScores = [...this.filteredScores].sort((a, b) => a.score - b.score);
  }

  sortByScoreDesc(): void {
    this.filteredScores = [...this.filteredScores].sort((a, b) => b.score - a.score);
  }

  // ===== Reset lọc ===== //
  resetFilter(): void {
    this.filteredScores = [...this.scores];
    this.fromDate = undefined;
    this.toDate = undefined;
  }
}
