import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isExpanded = false;

  constructor(private router: Router) {}
  menuItems = [
    { icon: 'fa-tachometer-alt', label: 'Dashboard', color: '#34D399', route: '/dashboard' },
    { icon: 'fa-users', label: 'Học sinh', color: '#60A5FA', route: '/hocsinh' },
    { icon: 'fa-question-circle', label: 'Câu hỏi', color: '#FBBF24', route: '/question-management' },
    { icon: 'fa-file-alt', label: 'Đề thi', color: '#F87171', route: '/de-thi' },
    { icon: 'fa-trophy', label: 'Kì thi', color: '#A78BFA', route: '/ki-thi' },

    { icon: 'fa-sign-out-alt', label: 'Log out', color: '#F43F5E', route: '/login' }
  ];


  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  onMouseEnter() {
    this.isExpanded = true;
  }

  onMouseLeave() {
    this.isExpanded = false;
  }
}
