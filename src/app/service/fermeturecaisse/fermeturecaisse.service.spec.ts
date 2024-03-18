import { TestBed } from '@angular/core/testing';

import { FermeturecaisseService } from './fermeturecaisse.service';

describe('FermeturecaisseService', () => {
  let service: FermeturecaisseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FermeturecaisseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
