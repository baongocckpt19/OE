import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeThiComponent } from './de-thi.component';

describe('DeThiComponent', () => {
  let component: DeThiComponent;
  let fixture: ComponentFixture<DeThiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeThiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeThiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
