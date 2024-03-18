import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterdepotComponent } from './ajouterdepot.component';

describe('AjouterdepotComponent', () => {
  let component: AjouterdepotComponent;
  let fixture: ComponentFixture<AjouterdepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterdepotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterdepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
