import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerfactureComponent } from './listerfacture.component';

describe('ListerfactureComponent', () => {
  let component: ListerfactureComponent;
  let fixture: ComponentFixture<ListerfactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerfactureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListerfactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
