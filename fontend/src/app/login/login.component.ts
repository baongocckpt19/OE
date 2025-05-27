import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../services/account-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
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
  };

  isTeacher: boolean = false;

  constructor(
    public accountService: AccountService,
    private router: Router
  ) {}

 login() {
  this.model.role = this.isTeacher ? 'teacher' : 'student';

  this.accountService.login(this.model).subscribe({
    next: response => {
      if (response?.user?.role === 'teacher') {
        localStorage.setItem('userRole', 'teacher');
        localStorage.setItem('userName', response.user.fullname); // nếu muốn hiện tên
        this.router.navigate(['/dashboard']);
      } else if (response?.user?.role === 'student') {
        localStorage.setItem('userRole', 'student');
        localStorage.setItem('userName', response.user.fullname);
        this.router.navigate(['/dashboard-student']);
      } else {
        console.warn('Vai trò người dùng không xác định hoặc không được hỗ trợ.');
      }
    },
    error: err => {
      console.error('Đăng nhập thất bại:', err);
    }
  });
}


  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
