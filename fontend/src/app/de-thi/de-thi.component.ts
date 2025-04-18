import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Subscription } from 'rxjs';
import { DeThiService } from '../services/de-thi.service';
import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-de-thi',
  standalone: true,
  imports: [ CommonModule, HeaderComponent,FormsModule ],
  templateUrl: './de-thi.component.html',
  styleUrls: ['./de-thi.component.scss']
})
export class DeThiComponent {
  dethis: any[] = [];
  filteredDethis: any[] = [];
  searchTerm: string = '';

  private subscription?: Subscription;
  constructor(private deThiService: DeThiService, private router: Router) { }
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
        this.filteredDethis = data; // Ban đầu hiển thị toàn bộ
      },
      error: (error) => {
        console.error('Lỗi khi tải dữ liệu đề thi:', error);
        // Xử lý lỗi ở đây, ví dụ: hiển thị thông báo cho người dùng
      }
    });
  }
  addDethi(): void {
    this.router.navigate(['/themdethi']);
  }

  filterDethis(): void {
    const keyword = this.searchTerm.toLowerCase();
    this.filteredDethis = this.dethis.filter(dethi =>
      dethi.description.toLowerCase().includes(keyword) ||
      dethi.examName.toLowerCase().includes(keyword) ||
      dethi.createdBy.toLowerCase().includes(keyword)
    );
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
