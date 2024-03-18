import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickaddproduitComponent } from './quickaddproduit.component';

describe('QuickaddproduitComponent', () => {
  let component: QuickaddproduitComponent;
  let fixture: ComponentFixture<QuickaddproduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickaddproduitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickaddproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
