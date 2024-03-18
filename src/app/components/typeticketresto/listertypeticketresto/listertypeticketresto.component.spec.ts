import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListertypeticketrestoComponent } from './listertypeticketresto.component';

describe('ListertypeticketrestoComponent', () => {
  let component: ListertypeticketrestoComponent;
  let fixture: ComponentFixture<ListertypeticketrestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListertypeticketrestoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListertypeticketrestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
