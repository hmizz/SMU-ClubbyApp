import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubRequestsComponent } from './club-requests.component';

describe('ClubRequestsComponent', () => {
  let component: ClubRequestsComponent;
  let fixture: ComponentFixture<ClubRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
