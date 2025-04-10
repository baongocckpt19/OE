import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
      transition('hidden => visible', animate('1s 0.5s ease-out')) // Delayed to sync with image
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
    }, 100); // Start animation after component loads
  }

  username: any;
  fullname: any;
  password: any;
  email: any;
  class: any;
  dob: any;
  isTeacher: any;
}
