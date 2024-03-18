import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherclientComponent } from './afficherclient.component';

describe('AfficherclientComponent', () => {
  let component: AfficherclientComponent;
  let fixture: ComponentFixture<AfficherclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherclientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
