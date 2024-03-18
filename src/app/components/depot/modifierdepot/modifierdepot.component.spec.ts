import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierdepotComponent } from './modifierdepot.component';

describe('ModifierdepotComponent', () => {
  let component: ModifierdepotComponent;
  let fixture: ComponentFixture<ModifierdepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierdepotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierdepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
