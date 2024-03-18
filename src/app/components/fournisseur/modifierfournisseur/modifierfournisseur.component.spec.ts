import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierfournisseurComponent } from './modifierfournisseur.component';

describe('ModifierfournisseurComponent', () => {
  let component: ModifierfournisseurComponent;
  let fixture: ComponentFixture<ModifierfournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierfournisseurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierfournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
