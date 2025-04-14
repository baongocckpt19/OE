import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Subscription } from 'rxjs';
import { DeThiService } from '../services/de-thi.service';
@Component({
  selector: 'app-de-thi',
  standalone: true,
  imports: [ CommonModule, HeaderComponent],
  templateUrl: './de-thi.component.html',
  styleUrls: ['./de-thi.component.scss']
})
export class DeThiComponent {
  dethis:  any[] = [];
  private subscription?: Subscription;
  constructor(private deThiService: DeThiService) { }

  ngOnInit(): void {
    this.loadDethis();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe(); // Hủy subscription khi component bị hủy
    }
  }
  loadDethis(): void {
    this.subscription = this.deThiService.getDethis().subscribe({
      next: (data) => {
        this.dethis = data;
      },
      error: (error) => {
        console.error('Lỗi khi tải dữ liệu đề thi:', error);
        // Xử lý lỗi ở đây, ví dụ: hiển thị thông báo cho người dùng
      }
    });
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

  viewDethi(id: number): void {
    // Điều hướng đến trang xem chi tiết đề thi với ID tương ứng
    console.log(`Xem đề thi với ID: ${id}`);
    // this.router.navigate(['/view-de-thi', id]); // Cần inject Router nếu bạn muốn điều hướng
  }

}
