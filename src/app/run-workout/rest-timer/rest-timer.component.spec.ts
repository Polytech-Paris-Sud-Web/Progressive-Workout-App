import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestTimerComponent } from './rest-timer.component';

describe('TimerComponent', () => {
  let component: RestTimerComponent;
  let fixture: ComponentFixture<RestTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RestTimerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
