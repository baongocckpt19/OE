import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuaCauHoiComponent } from './sua-cau-hoi.component';

describe('SuaCauHoiComponent', () => {
  let component: SuaCauHoiComponent;
  let fixture: ComponentFixture<SuaCauHoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuaCauHoiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuaCauHoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
