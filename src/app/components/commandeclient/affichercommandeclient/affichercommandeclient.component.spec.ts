import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichercommandeclientComponent } from './affichercommandeclient.component';

describe('AffichercommandeclientComponent', () => {
  let component: AffichercommandeclientComponent;
  let fixture: ComponentFixture<AffichercommandeclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffichercommandeclientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffichercommandeclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
