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
  users: { userId: number; role: string ;fullname: string}[] = [];
  showFilter = false;
  filterSubject = '';
  filterDate: string | null = null;
  subjects: string[] = [];


  private subscription?: Subscription;
  private usersSubscription?: Subscription;
  constructor(private deThiService: DeThiService, private router: Router, private userService: AccountService) { }


ngOnInit(): void {
    // Đăng ký usersSubscription để quản lý việc hủy đăng ký
    this.usersSubscription = this.userService.getStudentsByRole('teacher').subscribe({
      next: (data) => {
        console.log('Dữ liệu gốc từ API (teachers):', data); // Kiểm tra dữ liệu thô từ API
        if (data && Array.isArray(data)) {
          this.users = data.map((s: any) => ({
            userId: s.userId || s.id, // Sử dụng s.userId hoặc s.id tùy thuộc vào API trả về
            fullname: s.fullName || s.name || 'Unknown User', // Ưu tiên full_name, nếu không có thì dùng name, nếu không có nữa thì Unknown User
            role: s.role || 'Unknown Role' // Lấy role
          }));
          console.log('Populated this.users array:', this.users); // Kiểm tra mảng users đã được ánh xạ
        } else {
          console.warn('API trả về dữ liệu không hợp lệ cho teachers:', data);
          this.users = []; // Đảm bảo users là một mảng rỗng nếu dữ liệu không hợp lệ
        }

        this.loadDethis(); // Đảm bảo loadDethis được gọi sau khi users được nạp
      },
      error: (err) => {
        console.error('Lỗi lấy danh sách teacher:', err);
        // Có thể hiển thị thông báo cho người dùng ở đây
      }
    });
  }


  deleteDethi(id: number) {
    if (confirm('Bạn có chắc chắn muốn xóa câu hỏi này?')) {
      this.deThiService.deleteDethi(id).subscribe({
        next: () => this.loadDethis(),
        error: () => alert('Lỗi khi xóa câu hỏi')
      });
    }
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
  const user = this.users.find(u => u.userId === id); // Bỏ điều kiện role
  console.log(`Tìm userId = ${id} =>`, user);
  return user ? (user.fullname || 'Unknown') : 'Unknown';
}

 editDethi(id: number): void {
  console.log(`Chỉnh sửa đề thi với ID: ${id}`);
  this.router.navigate(['/sua-de-thi', id]);
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
