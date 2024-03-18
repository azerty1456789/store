import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterfournisseurComponent } from './ajouterfournisseur.component';

describe('AjouterfournisseurComponent', () => {
  let component: AjouterfournisseurComponent;
  let fixture: ComponentFixture<AjouterfournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterfournisseurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterfournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
