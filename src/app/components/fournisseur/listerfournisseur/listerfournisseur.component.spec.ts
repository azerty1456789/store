import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerfournisseurComponent } from './listerfournisseur.component';

describe('ListerfournisseurComponent', () => {
  let component: ListerfournisseurComponent;
  let fixture: ComponentFixture<ListerfournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerfournisseurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListerfournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
