import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherdepotComponent } from './afficherdepot.component';

describe('AfficherdepotComponent', () => {
  let component: AfficherdepotComponent;
  let fixture: ComponentFixture<AfficherdepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherdepotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherdepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
