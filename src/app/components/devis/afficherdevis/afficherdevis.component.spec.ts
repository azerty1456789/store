import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherdevisComponent } from './afficherdevis.component';

describe('AfficherdevisComponent', () => {
  let component: AfficherdevisComponent;
  let fixture: ComponentFixture<AfficherdevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherdevisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherdevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
