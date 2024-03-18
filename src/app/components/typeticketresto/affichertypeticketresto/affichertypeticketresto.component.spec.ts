import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichertypeticketrestoComponent } from './affichertypeticketresto.component';

describe('AffichertypeticketrestoComponent', () => {
  let component: AffichertypeticketrestoComponent;
  let fixture: ComponentFixture<AffichertypeticketrestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffichertypeticketrestoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffichertypeticketrestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
