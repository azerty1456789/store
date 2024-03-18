import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherfermetureCaisseComponent } from './afficherfermeture-caisse.component';

describe('AfficherfermetureCaisseComponent', () => {
  let component: AfficherfermetureCaisseComponent;
  let fixture: ComponentFixture<AfficherfermetureCaisseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherfermetureCaisseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherfermetureCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
