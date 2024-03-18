import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterrangementComponent } from './ajouterrangement.component';

describe('AjouterrangementComponent', () => {
  let component: AjouterrangementComponent;
  let fixture: ComponentFixture<AjouterrangementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterrangementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterrangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
