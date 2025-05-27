import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { AccountService } from '../services/account-service.service'; // ✅ đường dẫn đúng đến service

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  animations: [
    trigger('imageAnimation', [
      state('start', style({ transform: 'translateX(-100%)', opacity: 0 })),
      state('end', style({ transform: 'translateX(0)', opacity: 1 })),
      transition('start => end', animate('1s ease-out'))
    ]),
    trigger('formAnimation', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden => visible', animate('1s 0.5s ease-out'))
    ])
  ]
})
export class SignupComponent {
  imageState = 'start';
  formState = 'hidden';

  confirmPassword: string = '';
  username: string = '';
  fullname: string = '';
  password: string = '';
  email: string = '';
  class: string = '';
  dob: string = '';
  isTeacher: boolean = false;

  constructor(
    private accountService: AccountService, // ✅ Inject service
    private router: Router
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.imageState = 'end';
      this.formState = 'visible';
    }, 100);
  }

  register() {
    if (!this.username || !this.fullname || !this.password || !this.confirmPassword ||
        !this.email || !this.class || !this.dob) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp.');
      return;
    }

    const newUser = {
      username: this.username,
      fullname: this.fullname,
      password: this.password,
      email: this.email,
      userClass: this.class,
      dob: this.dob,
      role: this.isTeacher ? 'teacher' : 'student'
    };

    console.log('📤 Gửi dữ liệu đăng ký:', newUser);

    this.accountService.register(newUser).subscribe({
      next: () => {
        alert('Đăng ký thành công!');
        this.router.navigate(['/login']);
      },
      error: err => {
  const errorMsg = typeof err.error === 'string'
    ? err.error
    : (err.error?.error || JSON.stringify(err.error));

  alert("Đăng ký thất bại: " + errorMsg);
}
    });
  }
}
