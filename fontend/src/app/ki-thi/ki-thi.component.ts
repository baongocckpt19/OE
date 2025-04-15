import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { KiThiService } from '../services/ki-thi.service';
interface Kithi {
  id: number;
  title: string;
  description: string;
  createdBy: string;
  createdDate: string;
  // Add other properties to match your backend
}
@Component({
  selector: 'app-ki-thi',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './ki-thi.component.html',
  styleUrl: './ki-thi.component.scss'
})
export class KiThiComponent implements OnInit {
  kithis: Kithi[] = [];
  filteredQuestions: any[] = [];

  constructor(private kiThiService: KiThiService) { } // Inject the service

  ngOnInit(): void {
      this.loadKithis();
  }

  loadKithis(): void {
      this.kiThiService.getKithis().subscribe(
          (data) => {
              this.kithis = data;
              this.filteredQuestions = data;
          },
          (error) => {
              console.error('Error fetching examinations:', error);
          }
      );
  }

  viewKithi(id: number) {
      console.log(`View examination with ID: ${id}`);
      // Implement your view logic
  }

  editKithi(id: number) {
      console.log(`Edit examination with ID: ${id}`);
      // Implement your edit logic
  }

  deleteKithi(id: number) {
      console.log(`Delete examination with ID: ${id}`);
      // Implement your delete logic
  }

}
