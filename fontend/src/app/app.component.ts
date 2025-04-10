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


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [HeaderComponent, SidebarComponent, RouterModule, CommonModule, TooltipComponent]
})
//baongoc
export class AppComponent {
  showLayoutlogin = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showLayoutlogin = !event.url.includes('/login');
      
      }
    });
  }
};

