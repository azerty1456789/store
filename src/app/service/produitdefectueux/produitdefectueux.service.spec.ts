import { TestBed } from '@angular/core/testing';

import { ProduitdefectueuxService } from './produitdefectueux.service';

describe('ProduitdefectueuxService', () => {
  let service: ProduitdefectueuxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProduitdefectueuxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
