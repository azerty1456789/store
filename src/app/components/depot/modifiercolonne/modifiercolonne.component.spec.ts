import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiercolonneComponent } from './modifiercolonne.component';

describe('ModifiercolonneComponent', () => {
  let component: ModifiercolonneComponent;
  let fixture: ComponentFixture<ModifiercolonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifiercolonneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifiercolonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
