import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { filter, map } from 'rxjs';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title: string = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateTitle(event.urlAfterRedirects);
      });
  }

  private updateTitle(url: string) {
    const routesMap: { [key: string]: string } = {
      '/dashboard': 'Dashboard',
      '/hocsinh': 'Học sinh',
      '/settings': 'Cài đặt',
      '/question-management': 'Câu Hỏi',
      '/dashboard-student': 'Dashboard Học sinh',
      '/ki-thi': 'Kì thi',
      '/de-thi': 'Đề thi',
      '/them-cau-hoi': 'Thêm câu hỏi',
      '/them-de-thi': 'Thêm đề thi',

    };

    this.title = routesMap[url] || 'Trang chính';
  }
}
