import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterproduitdefectueuxComponent } from './ajouterproduitdefectueux.component';

describe('AjouterproduitdefectueuxComponent', () => {
  let component: AjouterproduitdefectueuxComponent;
  let fixture: ComponentFixture<AjouterproduitdefectueuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterproduitdefectueuxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterproduitdefectueuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
