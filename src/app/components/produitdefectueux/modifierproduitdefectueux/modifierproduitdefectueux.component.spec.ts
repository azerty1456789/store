import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierproduitdefectueuxComponent } from './modifierproduitdefectueux.component';

describe('ModifierproduitdefectueuxComponent', () => {
  let component: ModifierproduitdefectueuxComponent;
  let fixture: ComponentFixture<ModifierproduitdefectueuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierproduitdefectueuxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierproduitdefectueuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
