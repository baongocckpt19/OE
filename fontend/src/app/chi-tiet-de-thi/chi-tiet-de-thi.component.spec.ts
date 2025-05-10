import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietDeThiComponent } from './chi-tiet-de-thi.component';

describe('ChiTietDeThiComponent', () => {
  let component: ChiTietDeThiComponent;
  let fixture: ComponentFixture<ChiTietDeThiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChiTietDeThiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChiTietDeThiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
