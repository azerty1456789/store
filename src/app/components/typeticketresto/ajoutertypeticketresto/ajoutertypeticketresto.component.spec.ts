import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutertypeticketrestoComponent } from './ajoutertypeticketresto.component';

describe('AjoutertypeticketrestoComponent', () => {
  let component: AjoutertypeticketrestoComponent;
  let fixture: ComponentFixture<AjoutertypeticketrestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutertypeticketrestoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutertypeticketrestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
