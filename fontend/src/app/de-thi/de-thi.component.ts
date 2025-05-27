import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Subscription } from 'rxjs';
import { DeThiService } from '../services/de-thi.service';
import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AccountService } from '../services/account-service.service';


@Component({
  selector: 'app-de-thi',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule],
  templateUrl: './de-thi.component.html',
  styleUrls: ['./de-thi.component.scss']
})
export class DeThiComponent {
  dethis: any[] = [];
  filteredDethis: any[] = [];
  searchTerm: string = '';
  users: { userId: number; username: string; role: string }[] = [];
  showFilter = false;
  filterSubject = '';
  filterDate: string | null = null;
  subjects: string[] = [];


  private subscription?: Subscription;
  private usersSubscription?: Subscription;
  constructor(private deThiService: DeThiService, private router: Router, private userService: AccountService) { }
ngOnInit(): void {
  this.userService.getStudentsByRole('teacher').subscribe({
    next: (data) => {
this.users = data.map((s: any) => ({
  userId: s.id, // hoặc s.userId tùy API trả về
  username: s.fullname || s.name || s.username, // lấy đúng trường tên
  role: s.role
}));

     console.log('Dữ liệu gốc từ API:', data); // <=== Thêm dòng này để kiểm tra dữ liệu
    },
    error: (err) => {
      console.error('Lỗi lấy danh sách teacher:', err); // Nếu có lỗi
    }
  });

  this.loadDethis();
}


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }
  loadDethis(): void {
    this.subscription = this.deThiService.getDethis().subscribe({
      next: (data) => {
        this.dethis = data;
        this.filteredDethis = data;
        this.subjects = [...new Set(data.map(d => d.examName))]; // Dùng examName làm danh sách môn học
      },
      error: (error) => {
        console.error('Lỗi khi tải dữ liệu đề thi:', error);
      }
    });
  }
  addDethi(): void {
    this.router.navigate(['/themdethi']);
  }
  filterDethis(): void {
    const keyword = this.searchTerm.toLowerCase();

    this.filteredDethis = this.dethis.filter(dethi => {
      console.log('dethi.createdBy:', dethi.createdBy);
      const username = this.getUsernameById(Number(dethi.createdBy)); // ép kiểu number nếu cần

      console.log('Username tương ứng:', username);

      const matchesKeyword = dethi.description.toLowerCase().includes(keyword) ||
        dethi.examName.toLowerCase().includes(keyword) ||
        username.toLowerCase().includes(keyword);

      const matchesSubject = !this.filterSubject || dethi.name_of_subject === this.filterSubject;
      const matchesDate = !this.filterDate || new Date(dethi.createdAt).toISOString().slice(0, 10) === this.filterDate;

      return matchesKeyword && matchesSubject && matchesDate;
    });
  }

  getUsernameById(userId: number | string): string {
  const id = +userId;
  const user = this.users.find(u => (u.userId === id) && u.role === 'teacher');
  console.log(`Tìm userId = ${id} =>`, user);
  return user ? (user.username || 'Unknown') : 'Unknown';
}





  deleteDethi(id: number): void {
    // Gọi service để xóa đề thi dựa trên ID

    console.log(`Xóa đề thi với ID: ${id}`);
    // this.deThiService.deleteDethi(id).subscribe(...);
  }

  editDethi(id: number): void {
    // Điều hướng đến trang chỉnh sửa đề thi với ID tương ứng
    console.log(`Chỉnh sửa đề thi với ID: ${id}`);
    // this.router.navigate(['/edit-de-thi', id]); // Cần inject Router nếu bạn muốn điều hướng
  }

  viewDethi(id: number) {
    if (!id) {
      console.error('Exam ID is undefined');
      return;
    }
    this.router.navigate(['/chi-tiet-de-thi', id]); // <--- Dòng này để điều hướng
  }

  cancelFilter() {
    this.showFilter = false;
    this.filterSubject = '';
    this.filterDate = null;
    this.filterDethis(); // Quay lại danh sách đầy đủ hoặc tìm kiếm hiện tại
  }

  applyFilter() {
    this.showFilter = false;
    this.filterDethis();
  }

}
