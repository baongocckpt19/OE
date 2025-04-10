import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KiThiComponent } from './ki-thi.component';

describe('KiThiComponent', () => {
  let component: KiThiComponent;
  let fixture: ComponentFixture<KiThiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KiThiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KiThiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
