import { TestBed } from '@angular/core/testing';

import { PhotoproduitService } from './photoproduit.service';

describe('PhotoproduitService', () => {
  let service: PhotoproduitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoproduitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
