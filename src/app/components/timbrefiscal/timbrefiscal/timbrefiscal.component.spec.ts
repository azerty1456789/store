import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimbrefiscalComponent } from './timbrefiscal.component';

describe('TimbrefiscalComponent', () => {
  let component: TimbrefiscalComponent;
  let fixture: ComponentFixture<TimbrefiscalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimbrefiscalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimbrefiscalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
