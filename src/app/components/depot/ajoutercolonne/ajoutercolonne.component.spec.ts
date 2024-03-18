import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutercolonneComponent } from './ajoutercolonne.component';

describe('AjoutercolonneComponent', () => {
  let component: AjoutercolonneComponent;
  let fixture: ComponentFixture<AjoutercolonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutercolonneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutercolonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
