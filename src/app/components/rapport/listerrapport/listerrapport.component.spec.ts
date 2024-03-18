import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerrapportComponent } from './listerrapport.component';

describe('ListerrapportComponent', () => {
  let component: ListerrapportComponent;
  let fixture: ComponentFixture<ListerrapportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerrapportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListerrapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
