import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerproduitdefectueuxComponent } from './listerproduitdefectueux.component';

describe('ListerproduitdefectueuxComponent', () => {
  let component: ListerproduitdefectueuxComponent;
  let fixture: ComponentFixture<ListerproduitdefectueuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerproduitdefectueuxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListerproduitdefectueuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
