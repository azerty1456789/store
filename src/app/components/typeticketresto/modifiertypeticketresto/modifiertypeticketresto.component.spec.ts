import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiertypeticketrestoComponent } from './modifiertypeticketresto.component';

describe('ModifiertypeticketrestoComponent', () => {
  let component: ModifiertypeticketrestoComponent;
  let fixture: ComponentFixture<ModifiertypeticketrestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifiertypeticketrestoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifiertypeticketrestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
