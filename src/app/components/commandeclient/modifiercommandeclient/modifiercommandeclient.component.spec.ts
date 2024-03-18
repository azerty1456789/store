import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiercommandeclientComponent } from './modifiercommandeclient.component';

describe('ModifiercommandeclientComponent', () => {
  let component: ModifiercommandeclientComponent;
  let fixture: ComponentFixture<ModifiercommandeclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifiercommandeclientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifiercommandeclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
