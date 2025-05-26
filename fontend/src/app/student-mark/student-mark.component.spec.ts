import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMarkComponent } from './student-mark.component';

describe('StudentMarkComponent', () => {
  let component: StudentMarkComponent;
  let fixture: ComponentFixture<StudentMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentMarkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
