import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
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
      transition('hidden => visible', animate('1s 0.5s ease-out')) // Delay 0.5s để đồng bộ với hình ảnh
    ])
  ]
})

export class SignupComponent {
  imageState = 'start';
  formState = 'hidden';

  ngOnInit() {
    setTimeout(() => {
      this.imageState = 'end';
      this.formState = 'visible';
    }, 100);
  }

  confirmPassword: string = '';
  username: any;
  fullname: any;
  password: any;
  email: any;
  class: any;
  dob: any;
  isTeacher: any;
  constructor(private router: Router) {}
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
    class: this.class,
    dob: this.dob,
    role: this.isTeacher ? 'teacher' : 'student'
  };

  console.log(' Gửi dữ liệu đăng ký:', newUser);

  // Nếu bạn đã có service đăng ký thì thay vào đây:
  // this.accountService.register(newUser).subscribe({
  //   next: () => {
  //     alert('Đăng ký thành công! Quay lại đăng nhập...');
  //     this.router.navigate(['/login']);
  //   },
  //   error: err => {
  //     alert('Đăng ký thất bại!');
  //     console.error(err);
  //   }
  // });

  // Nếu chưa có API, mô phỏng chuyển về login:
  alert('Đăng ký thành công!');
  this.router.navigate(['/login']);
}

}
