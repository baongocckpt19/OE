import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemcauhoiComponent } from './themcauhoi.component';

describe('ThemcauhoiComponent', () => {
  let component: ThemcauhoiComponent;
  let fixture: ComponentFixture<ThemcauhoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemcauhoiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemcauhoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
