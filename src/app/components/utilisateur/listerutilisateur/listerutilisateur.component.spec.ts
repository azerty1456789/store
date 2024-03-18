import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerutilisateurComponent } from './listerutilisateur.component';

describe('ListerutilisateurComponent', () => {
  let component: ListerutilisateurComponent;
  let fixture: ComponentFixture<ListerutilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerutilisateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListerutilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
