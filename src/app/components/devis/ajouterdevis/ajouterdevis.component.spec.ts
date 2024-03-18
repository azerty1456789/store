import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterdevisComponent } from './ajouterdevis.component';

describe('AjouterdevisComponent', () => {
  let component: AjouterdevisComponent;
  let fixture: ComponentFixture<AjouterdevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterdevisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterdevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
