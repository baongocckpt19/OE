import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemdethiComponent } from './themdethi.component';

describe('ThemdethiComponent', () => {
  let component: ThemdethiComponent;
  let fixture: ComponentFixture<ThemdethiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemdethiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemdethiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
