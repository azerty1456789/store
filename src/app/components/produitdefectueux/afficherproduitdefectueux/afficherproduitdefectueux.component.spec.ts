import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherproduitdefectueuxComponent } from './afficherproduitdefectueux.component';

describe('AfficherproduitdefectueuxComponent', () => {
  let component: AfficherproduitdefectueuxComponent;
  let fixture: ComponentFixture<AfficherproduitdefectueuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherproduitdefectueuxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherproduitdefectueuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
