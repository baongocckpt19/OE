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

  filterScores(): void {
    const keyword = this.searchTerm.toLowerCase();
    this.filteredScores = this.scores.filter(score =>
      score.examName.toLowerCase().includes(keyword) ||
      score.subject.toLowerCase().includes(keyword)
    );
  }
}
