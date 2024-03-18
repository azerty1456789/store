import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutercommandeclientComponent } from './ajoutercommandeclient.component';

describe('AjoutercommandeclientComponent', () => {
  let component: AjoutercommandeclientComponent;
  let fixture: ComponentFixture<AjoutercommandeclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutercommandeclientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutercommandeclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
