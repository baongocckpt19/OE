import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { HocsinhComponent } from './hocsinh/hocsinh.component';
import { QuestionManagementComponent } from './question-management/question-management.component';
import { Routes } from '@angular/router';
import { TooltipComponent } from './tooltip/tooltip.component';
import { SignupComponent } from "./signup/signup.component";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [HeaderComponent, SidebarComponent, RouterModule, CommonModule, FormsModule]
})
//baongoc
export class AppComponent {
  showLayoutlogin = false;
  isExamPage: boolean = false;
  isSignupPage: boolean = false;

  isTrangthiPage: boolean = false;
  isThemCauHoiPage: boolean = false;
  isxemlaibailam: boolean = false;
  constructor(private router: Router) {
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.showLayoutlogin = !event.url.includes('/login');
      
    }
  });

  this.router.events.subscribe(() => {
    this.isExamPage = this.router.url.includes('chi-tiet-de-thi');
    this.showLayoutlogin = !this.router.url.includes('/login'); // thêm dòng này
  });

  this.router.events.subscribe(() => {
    this.isSignupPage = this.router.url.includes('signup');
    this.showLayoutlogin = !this.router.url.includes('/login'); // thêm dòng này
  });

  this.router.events.subscribe(() => {
    this.isTrangthiPage = this.router.url.includes('trangthi');
    this.showLayoutlogin = !this.router.url.includes('/login'); // thêm dòng này
  });

  this.router.events.subscribe(() => {
    this.isThemCauHoiPage = this.router.url.includes('them-cau-hoi');
    this.showLayoutlogin = !this.router.url.includes('/login'); // thêm dòng này
  });
   this.router.events.subscribe(() => {
    this.isxemlaibailam = this.router.url.includes('xem-lai-bai-lam');
    this.showLayoutlogin = !this.router.url.includes('/login'); // thêm dòng này
  });
}

}
