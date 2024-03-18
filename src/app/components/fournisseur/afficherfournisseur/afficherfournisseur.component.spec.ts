import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherfournisseurComponent } from './afficherfournisseur.component';

describe('AfficherfournisseurComponent', () => {
  let component: AfficherfournisseurComponent;
  let fixture: ComponentFixture<AfficherfournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherfournisseurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherfournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
