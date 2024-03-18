import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickaddclientComponent } from './quickaddclient.component';

describe('QuickaddclientComponent', () => {
  let component: QuickaddclientComponent;
  let fixture: ComponentFixture<QuickaddclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickaddclientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickaddclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
