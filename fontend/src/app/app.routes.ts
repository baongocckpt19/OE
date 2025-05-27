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
import { ChiTietDeThiComponent } from './chi-tiet-de-thi/chi-tiet-de-thi.component';
import { StudentMarkComponent } from './student-mark/student-mark.component';
import { TrangthiComponent } from './trangthi/trangthi.component';
import { SuaCauHoiComponent } from './sua-cau-hoi/sua-cau-hoi.component';
import { DeThiStudentComponent } from './de-thi-student/de-thi-student.component';

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
    path: 'themdethi',
    component: ThemdethiComponent,
    data: { title: 'Thêm đề thi' },
   canActivate : [authGuard]
  },
  {
    path: 'them-cau-hoi',
    component: ThemcauhoiComponent,
    //data: {title:'Đề Thi'},
    canActivate : [authGuard]
  },
  {
    path: 'dashboard-student',
    component: DashboardStudentComponent,
    data: { title: 'Dashboard' },
    canActivate : [authGuard]
  },
    {
    path: 'de-thi-student',
    component: DeThiStudentComponent,
    data: { title: 'Đề thi học sinh' },
    canActivate : [authGuard]
  },
  {
    path: 'themdethi',
    component: ThemdethiComponent,
    data: { title: 'Thêm đề thi' },
   canActivate : [authGuard]
  },
    {
    path: 'student-mark',
    component: StudentMarkComponent,
    data: { title: 'Điểm số học sinh' },
   canActivate : [authGuard]
  },
  {
    path: 'chi-tiet-de-thi/:id',
    component: ChiTietDeThiComponent,
    data: { title: 'Chi tiết đề thi' },
   canActivate : [authGuard]
  },
   {
    path: 'sua-cau-hoi',
    component: SuaCauHoiComponent,
   canActivate : [authGuard]
  },
  {
    path: 'trangthi',
    component: TrangthiComponent,
    data: { title: 'Trang thi' },
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
