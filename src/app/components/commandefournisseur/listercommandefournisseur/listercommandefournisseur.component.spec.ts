import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListercommandefournisseurComponent } from './listercommandefournisseur.component';

describe('ListercommandefournisseurComponent', () => {
  let component: ListercommandefournisseurComponent;
  let fixture: ComponentFixture<ListercommandefournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListercommandefournisseurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListercommandefournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
