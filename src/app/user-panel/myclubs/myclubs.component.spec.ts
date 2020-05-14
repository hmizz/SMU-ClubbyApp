import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyclubsComponent } from './myclubs.component';

describe('MyclubsComponent', () => {
  let component: MyclubsComponent;
  let fixture: ComponentFixture<MyclubsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyclubsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyclubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
