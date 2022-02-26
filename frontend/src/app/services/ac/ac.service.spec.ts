import { TestBed } from '@angular/core/testing';

import { AcService } from './ac.service';

describe('AcService', () => {
  let service: AcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
