import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierrangementComponent } from './modifierrangement.component';

describe('ModifierrangementComponent', () => {
  let component: ModifierrangementComponent;
  let fixture: ComponentFixture<ModifierrangementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierrangementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierrangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
