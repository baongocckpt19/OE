import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HocsinhComponent } from './hocsinh/hocsinh.component';
import { QuestionManagementComponent } from './question-management/question-management.component';
import { KiThiComponent } from './ki-thi/ki-thi.component';
import { DeThiComponent } from './de-thi/de-thi.component';
import { SignupComponent } from './signup/signup.component';
import { ThemcauhoiComponent } from './themcauhoi/themcauhoi.component';
import { ThemdethiComponent } from './themdethi/themdethi.component';
import { authGuard } from './guard/auth.guard';
import { DashboardStudentComponent } from './dashboard-student/dashboard-student.component';


export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
    
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard' },
    canActivate: [authGuard]
  },
  {
    path: 'hocsinh',
    component: HocsinhComponent,
    data: { title: 'Học sinh' },
    canActivate: [authGuard]
  },
  {
    path: 'question-management',
    component: QuestionManagementComponent,
    data: {title:'Câu Hỏi'},
    canActivate : [authGuard]
  },
  {
    path: 'ki-thi',
    component: KiThiComponent,
    data: {title:'Kì Thi'},
    canActivate : [authGuard]
  },

  {
    path: 'de-thi',
    component: DeThiComponent,
    data: {title:'Đề Thi'},
    canActivate : [authGuard]
  },
  {
    path: 'them-de-thi',
    component: ThemdethiComponent,
   canActivate : [authGuard]
  },
  {
    path: 'them-cau-hoi',
    component: ThemcauhoiComponent,
    //data: {title:'Đề Thi'},
    canActivate : [authGuard]
  },
  {
    path: 'de-thi',
    component: DeThiComponent,
    data: {title:'Đề Thi'},
    canActivate : [authGuard]
  },
  {
    path: 'de-thi',
    component: DeThiComponent,
    data: {title:'Đề Thi'},
    canActivate : [authGuard]
  },
  {
    path: 'dashboard-student',
    component: DashboardStudentComponent,
    data: { title: 'Dashboard' },
    canActivate : [authGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login',
  }
];
