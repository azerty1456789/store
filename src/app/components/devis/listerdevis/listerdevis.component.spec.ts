import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerdevisComponent } from './listerdevis.component';

describe('ListerdevisComponent', () => {
  let component: ListerdevisComponent;
  let fixture: ComponentFixture<ListerdevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerdevisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListerdevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
