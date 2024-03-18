import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherproduitComponent } from './afficherproduit.component';

describe('AfficherproduitComponent', () => {
  let component: AfficherproduitComponent;
  let fixture: ComponentFixture<AfficherproduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherproduitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
