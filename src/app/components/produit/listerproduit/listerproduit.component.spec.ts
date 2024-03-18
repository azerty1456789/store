import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerproduitComponent } from './listerproduit.component';

describe('ListerproduitComponent', () => {
  let component: ListerproduitComponent;
  let fixture: ComponentFixture<ListerproduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerproduitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListerproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
