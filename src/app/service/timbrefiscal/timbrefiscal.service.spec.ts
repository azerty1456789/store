import { TestBed } from '@angular/core/testing';

import { TimbrefiscalService } from './timbrefiscal.service';

describe('TimbrefiscalService', () => {
  let service: TimbrefiscalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimbrefiscalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
