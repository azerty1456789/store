import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerdepotComponent } from './listerdepot.component';

describe('ListerdepotComponent', () => {
  let component: ListerdepotComponent;
  let fixture: ComponentFixture<ListerdepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerdepotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListerdepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
