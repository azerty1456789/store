import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichercommandefournisseurComponent } from './affichercommandefournisseur.component';

describe('AffichercommandefournisseurComponent', () => {
  let component: AffichercommandefournisseurComponent;
  let fixture: ComponentFixture<AffichercommandefournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffichercommandefournisseurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffichercommandefournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
