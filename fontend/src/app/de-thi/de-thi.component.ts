import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-de-thi',
  standalone: true,
  imports: [ CommonModule, HeaderComponent],
  templateUrl: './de-thi.component.html',
  styleUrls: ['./de-thi.component.scss']
})
export class DeThiComponent {
deleteDethi(arg0: any) {
throw new Error('Method not implemented.');
}
editDethi(arg0: any) {
throw new Error('Method not implemented.');
}
viewDethi(arg0: any) {
throw new Error('Method not implemented.');
}
dethis = [
  { id: 1, name: 'Đề giữa kì 1 - lớp 8', subject: 'Toán', numques: '45', time: '45m', creator: 'Nguyễn Văn A', date: '1/1/2025' },
  { id: 2, name: 'Đề giữa kì 2 - lớp 9', subject: 'Lý', numques: '40', time: '50m', creator: 'Nguyễn Văn B', date: '5/2/2025' },
  { id: 3, name: 'Đề thi thử đại học - môn Hóa', subject: 'Hóa', numques: '50', time: '60m', creator: 'Nguyễn Văn C', date: '10/3/2025' },
  { id: 4, name: 'Đề kiểm tra cuối kì 1 - lớp 10', subject: 'Văn', numques: '60', time: '90m', creator: 'Nguyễn Văn D', date: '15/4/2025' },
  { id: 5, name: 'Đề thi học kì 2 - lớp 11', subject: 'Sinh', numques: '55', time: '75m', creator: 'Nguyễn Văn E', date: '20/5/2025' }
];
}
