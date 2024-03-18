import { TestBed } from '@angular/core/testing';

import { ClientwebService } from './clientweb.service';

describe('ClientwebService', () => {
  let service: ClientwebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientwebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
