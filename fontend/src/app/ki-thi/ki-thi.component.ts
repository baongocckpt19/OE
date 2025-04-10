import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-ki-thi',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './ki-thi.component.html',
  styleUrl: './ki-thi.component.scss'
})
export class KiThiComponent {
  viewKithi(arg0: number) {
    throw new Error('Method not implemented.');
  }
  editKithi(arg0: number) {
    throw new Error('Method not implemented.');
  }
  deleteKithi(arg0: number) {
    throw new Error('Method not implemented.');
  }
  kithis = [
    { id: 1, name: 'Thi giữa kì 1 - lớp 8', subject: 'Toán', state: 'Chưa tổ chức', creator: 'Nguyễn văn A', date: '1/1/2025' },
    { id: 2, name: 'Tiếng anh đầu vào NH 2024-2025', subject: 'Tiếng Anh', state: 'Đã tổ chức', creator: 'Nguyễn văn B', date: '1/1/2025' },
    { id: 3, name: 'Thi cuối kì 1 - lớp 9', subject: 'Hóa', state: 'Chưa tổ chức', creator: 'Nguyễn Văn C', date: '15/1/2025' },
    { id: 4, name: 'Thi giữa kì 2 - lớp 10', subject: 'Văn', state: 'Đã tổ chức', creator: 'Nguyễn Văn D', date: '20/2/2025' },
    { id: 5, name: 'Thi thử đại học', subject: 'Anh', state: 'Chưa tổ chức', creator: 'Nguyễn Văn E', date: '10/3/2025' }
  ];

}
