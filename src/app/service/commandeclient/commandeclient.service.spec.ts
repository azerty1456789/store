import { TestBed } from '@angular/core/testing';

import { CommandeclientService } from './commandeclient.service';

describe('CommandeclientService', () => {
  let service: CommandeclientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandeclientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
