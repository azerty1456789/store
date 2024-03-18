import { TestBed } from '@angular/core/testing';

import { RangementService } from './rangement.service';

describe('RangementService', () => {
  let service: RangementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RangementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
