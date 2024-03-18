import { TestBed } from '@angular/core/testing';

import { FactureclientService } from './factureclient.service';

describe('FactureclientService', () => {
  let service: FactureclientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FactureclientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
