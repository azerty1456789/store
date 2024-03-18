import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherrangementComponent } from './afficherrangement.component';

describe('AfficherrangementComponent', () => {
  let component: AfficherrangementComponent;
  let fixture: ComponentFixture<AfficherrangementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherrangementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherrangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
