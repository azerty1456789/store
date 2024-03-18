import { TestBed } from '@angular/core/testing';

import { CommandefournisseurService } from './commandefournisseur.service';

describe('CommandefournisseurService', () => {
  let service: CommandefournisseurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandefournisseurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
