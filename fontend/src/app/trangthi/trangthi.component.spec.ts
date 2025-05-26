import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrangthiComponent } from './trangthi.component';

describe('TrangthiComponent', () => {
  let component: TrangthiComponent;
  let fixture: ComponentFixture<TrangthiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrangthiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrangthiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
