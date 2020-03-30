import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwlcarouselComponent } from './owlcarousel.component';

describe('OwlcarouselComponent', () => {
  let component: OwlcarouselComponent;
  let fixture: ComponentFixture<OwlcarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwlcarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwlcarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
