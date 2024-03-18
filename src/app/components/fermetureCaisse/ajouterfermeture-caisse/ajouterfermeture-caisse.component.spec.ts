import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterfermetureCaisseComponent } from './ajouterfermeture-caisse.component';

describe('AjouterfermetureCaisseComponent', () => {
  let component: AjouterfermetureCaisseComponent;
  let fixture: ComponentFixture<AjouterfermetureCaisseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterfermetureCaisseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterfermetureCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
