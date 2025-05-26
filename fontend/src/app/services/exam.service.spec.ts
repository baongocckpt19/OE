import { TestBed } from '@angular/core/testing';
import { DeThiService } from './de-thi.service';



describe('DeThiService', () => {
  let service: DeThiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeThiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
