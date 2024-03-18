import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiercommandefournisseurComponent } from './modifiercommandefournisseur.component';

describe('ModifiercommandefournisseurComponent', () => {
  let component: ModifiercommandefournisseurComponent;
  let fixture: ComponentFixture<ModifiercommandefournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifiercommandefournisseurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifiercommandefournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
