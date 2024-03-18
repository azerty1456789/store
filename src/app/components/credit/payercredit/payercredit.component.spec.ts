import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayercreditComponent } from './payercredit.component';

describe('PayercreditComponent', () => {
  let component: PayercreditComponent;
  let fixture: ComponentFixture<PayercreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayercreditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayercreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
