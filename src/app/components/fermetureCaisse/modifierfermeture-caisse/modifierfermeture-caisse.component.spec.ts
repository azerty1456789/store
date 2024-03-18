import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierfermetureCaisseComponent } from './modifierfermeture-caisse.component';

describe('ModifierfermetureCaisseComponent', () => {
  let component: ModifierfermetureCaisseComponent;
  let fixture: ComponentFixture<ModifierfermetureCaisseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierfermetureCaisseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierfermetureCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
