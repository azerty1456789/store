import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerfermetureCaisseComponent } from './listerfermeture-caisse.component';

describe('ListerfermetureCaisseComponent', () => {
  let component: ListerfermetureCaisseComponent;
  let fixture: ComponentFixture<ListerfermetureCaisseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerfermetureCaisseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListerfermetureCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
