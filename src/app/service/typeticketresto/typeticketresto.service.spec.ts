import { TestBed } from '@angular/core/testing';

import { TypeticketrestoService } from './typeticketresto.service';

describe('TypeticketrestoService', () => {
  let service: TypeticketrestoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeticketrestoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
