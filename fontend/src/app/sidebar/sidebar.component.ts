import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SIDEBAR_MENUS } from './sidebar-menu.config';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  role: 'student' | 'teacher' = 'student'; // mặc định để tránh lỗi
  displayName: string = '';

  isExpanded = false;
  currentRoute: string = '';
  menuItems: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const storedRole = localStorage.getItem('userRole') as 'student' | 'teacher';
    if (storedRole === 'teacher' || storedRole === 'student') {
      this.role = storedRole;
    }
    this.currentRoute = this.router.url;
    this.menuItems = SIDEBAR_MENUS[this.role];
    this.router.events.subscribe(() => {
    this.currentRoute = this.router.url.split('?')[0].split('#')[0];
  });

  this.currentRoute = this.router.url.split('?')[0].split('#')[0];
  }

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
