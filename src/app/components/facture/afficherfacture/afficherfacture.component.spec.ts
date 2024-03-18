import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherfactureComponent } from './afficherfacture.component';

describe('AfficherfactureComponent', () => {
  let component: AfficherfactureComponent;
  let fixture: ComponentFixture<AfficherfactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherfactureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherfactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
