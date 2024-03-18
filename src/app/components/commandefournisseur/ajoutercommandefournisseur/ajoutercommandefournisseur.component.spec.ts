import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutercommandefournisseurComponent } from './ajoutercommandefournisseur.component';

describe('AjoutercommandefournisseurComponent', () => {
  let component: AjoutercommandefournisseurComponent;
  let fixture: ComponentFixture<AjoutercommandefournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutercommandefournisseurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutercommandefournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
