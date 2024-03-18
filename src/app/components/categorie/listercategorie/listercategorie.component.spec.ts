import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListercategorieComponent } from './listercategorie.component';

describe('ListercategorieComponent', () => {
  let component: ListercategorieComponent;
  let fixture: ComponentFixture<ListercategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListercategorieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListercategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
