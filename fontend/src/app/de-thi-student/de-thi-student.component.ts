import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
import { DeThiService } from '../services/de-thi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-de-thi-student',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './de-thi-student.component.html',
  styleUrls: ['./de-thi-student.component.scss']
})
export class DeThiStudentComponent implements OnInit {
  dethis: any[] = [];
  filteredDethis: any[] = [];
  searchTerm: string = '';
  filterSubject: string = '';
  filterDate: string = '';
  showFilter: boolean = false;
  subjects: string[] = [];



  constructor(private router: Router, private deThiService: DeThiService) {}
  ngOnInit(): void {
  this.deThiService.getDethis().subscribe(
    (data) => {
      this.dethis = data;
      this.filteredDethis = [...data];
      this.subjects = [...new Set(data.map(d => d.name_of_subject))];
    },
    (error) => {
      console.error('Không thể lấy danh sách đề thi:', error);
    }
  );
}


  removeVietnameseTones(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  filterDethis(): void {
    const keyword = this.removeVietnameseTones(this.searchTerm);
    this.filteredDethis = this.dethis.filter(d =>
      this.removeVietnameseTones(d.examName).includes(keyword)
    );
  }

  applyFilter(): void {
    this.filteredDethis = this.dethis.filter(d => {
      const matchSubject = this.filterSubject ? d.name_of_subject === this.filterSubject : true;
      const matchDate = this.filterDate
        ? new Date(d.createdAt).toDateString() === new Date(this.filterDate).toDateString()
        : true;
      return matchSubject && matchDate;
    });
    this.showFilter = false;
  }

  cancelFilter(): void {
    this.filterSubject = '';
    this.filterDate = '';
    this.filteredDethis = [...this.dethis];
    this.showFilter = false;
  }
  startExam(examId: number): void {
  Swal.fire({
    title: 'Bạn sẵn sàng làm bài chưa?',
    text: 'Sau khi bắt đầu, thời gian sẽ được tính và bạn không thể quay lại.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sẵn sàng',
    cancelButtonText: 'Hủy'
  }).then((result) => {
    if (result.isConfirmed) {
      this.router.navigate(['/trangthi', examId]).catch(error => {
        console.error('Không thể chuyển đến trang thi:', error);
        Swal.fire('Lỗi!', 'Không thể chuyển đến trang thi. Vui lòng thử lại sau.', 'error');
      });
    }
  });
}

}
