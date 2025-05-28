import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../services/account-service.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  model: any = {
    username: '',
    password_hash: '',
    role: 'student'
  };

  isTeacher: boolean = false;
  showPassword = false;
  loginError = false;
  isLoading = false; // <-- Thêm biến loading

  constructor(
    public accountService: AccountService,
    private router: Router
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  clearError() {
    this.loginError = false;
  }

  login() {
    this.model.role = this.isTeacher ? 'teacher' : 'student';
    this.isLoading = true; // <-- Bắt đầu loading

    this.accountService.login(this.model).subscribe({
      next: response => {
        this.isLoading = false; // <-- Kết thúc loading
        this.loginError = false;

        if (response?.user?.role === 'teacher') {
          localStorage.setItem('userRole', 'teacher');
          localStorage.setItem('userName', response.user.fullname);
          this.router.navigate(['/dashboard']);
        } else if (response?.user?.role === 'student') {
          localStorage.setItem('userRole', 'student');
          localStorage.setItem('userName', response.user.fullname);
          this.router.navigate(['/dashboard-student']);
        } else {
          console.warn('Vai trò người dùng không xác định.');
        }
      },
      error: err => {
        console.error('Đăng nhập thất bại:', err);
        this.isLoading = false; // <-- Kết thúc loading
        this.loginError = true;
      }
    });
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
