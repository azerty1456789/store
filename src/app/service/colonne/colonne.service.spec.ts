import { TestBed } from '@angular/core/testing';

import { ColonneService } from './colonne.service';

describe('ColonneService', () => {
  let service: ColonneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColonneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
