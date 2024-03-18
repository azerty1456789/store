import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListercommandeclientComponent } from './listercommandeclient.component';

describe('ListercommandeclientComponent', () => {
  let component: ListercommandeclientComponent;
  let fixture: ComponentFixture<ListercommandeclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListercommandeclientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListercommandeclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
