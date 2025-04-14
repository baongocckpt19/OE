import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../services/account-service.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  model: any = {
    username: '',
    password_hash: '',
    role: 'student' // Giá trị mặc định
  }
  isTeacher: boolean = false;
  constructor(public accountService: AccountService, private router: Router) { }

  login() {
    this.model.role = this.isTeacher ? 'teacher' : 'student';
    this.accountService.login(this.model).subscribe({
      next: response => {
        if (response && response.user && response.user.role === 'teacher') {
          this.router.navigate(['/dashboard']);
        } else if (response && response.user && response.user.role === 'student') {
          this.router.navigate(['/dashboard-student']); // Chuyển đến trang dashboard cho student
        } else {
          // Xử lý trường hợp role không xác định hoặc không hợp lệ
          console.warn('Vai trò người dùng không xác định hoặc không được hỗ trợ.');
          // Có thể hiển thị thông báo lỗi cho người dùng
        }
      },
      error: err => {
        console.error('Login failed:', err);
        // Xử lý lỗi đăng nhập, ví dụ: hiển thị thông báo lỗi cho người dùng
      }
    });
  }
}
