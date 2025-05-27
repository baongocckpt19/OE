import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeThiStudentComponent } from './de-thi-student.component';

describe('DeThiStudentComponent', () => {
  let component: DeThiStudentComponent;
  let fixture: ComponentFixture<DeThiStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeThiStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeThiStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
