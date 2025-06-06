import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HocsinhComponent } from './hocsinh/hocsinh.component';
import { QuestionManagementComponent } from './question-management/question-management.component';
import { DeThiComponent } from './de-thi/de-thi.component';
import { SignupComponent } from './signup/signup.component';
import { ThemdethiComponent } from './themdethi/themdethi.component';
import { authGuard } from './guard/auth.guard';
import { DashboardStudentComponent } from './dashboard-student/dashboard-student.component';
import { ChiTietDeThiComponent } from './chi-tiet-de-thi/chi-tiet-de-thi.component';
import { StudentMarkComponent } from './student-mark/student-mark.component';
import { TrangthiComponent } from './trangthi/trangthi.component';
import { DeThiStudentComponent } from './de-thi-student/de-thi-student.component';
import { SuaDeThiComponent } from './sua-de-thi/sua-de-thi.component';
import { XemLaiBaiLamComponent } from './xem-lai-bai-lam/xem-lai-bai-lam.component';

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
    data: { title: 'Câu Hỏi' },
    canActivate: [authGuard]
  },


  {
    path: 'de-thi',
    component: DeThiComponent,
    data: { title: 'Đề Thi' },
    canActivate: [authGuard]
  },
  {
    path: 'themdethi',
    component: ThemdethiComponent,
    data: { title: 'Thêm đề thi' },
    canActivate: [authGuard]
  },

  {
    path: 'dashboard-student',
    component: DashboardStudentComponent,
    data: { title: 'Dashboard' },
    canActivate: [authGuard]
  },
  {
    path: 'de-thi-student',
    component: DeThiStudentComponent,
    data: { title: 'Đề thi học sinh' },
    canActivate: [authGuard]
  },
  {
    path: 'themdethi',
    component: ThemdethiComponent,
    data: { title: 'Thêm đề thi' },
    canActivate: [authGuard]
  },
  {
    path: 'student-mark',
    component: StudentMarkComponent,
    data: { title: 'Điểm số' },
    canActivate: [authGuard]
  },
  {
    path: 'chi-tiet-de-thi/:id',
    component: ChiTietDeThiComponent,
    data: { title: 'Chi tiết đề thi' },
    canActivate: [authGuard]
  },
  {
    path: 'trangthi/:id',
    component: TrangthiComponent,
    data: { title: 'Trang thi' },
    canActivate: [authGuard]
  },
   {
    path: 'sua-de-thi/:id',
    component: SuaDeThiComponent,
    data: { title: 'Sửa đề thi' },
    canActivate: [authGuard]
  },
   {
    path: 'xem-lai-bai-lam',
    component: XemLaiBaiLamComponent,
   // data: { title: 'Sửa đề thi' },
    canActivate: [authGuard]
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
