import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichercolonneComponent } from './affichercolonne.component';

describe('AffichercolonneComponent', () => {
  let component: AffichercolonneComponent;
  let fixture: ComponentFixture<AffichercolonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffichercolonneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffichercolonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
