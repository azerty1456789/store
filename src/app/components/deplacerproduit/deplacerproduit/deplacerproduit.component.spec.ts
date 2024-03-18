import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeplacerproduitComponent } from './deplacerproduit.component';

describe('DeplacerproduitComponent', () => {
  let component: DeplacerproduitComponent;
  let fixture: ComponentFixture<DeplacerproduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeplacerproduitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeplacerproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
