import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichercategorieComponent } from './affichercategorie.component';

describe('AffichercategorieComponent', () => {
  let component: AffichercategorieComponent;
  let fixture: ComponentFixture<AffichercategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffichercategorieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffichercategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
