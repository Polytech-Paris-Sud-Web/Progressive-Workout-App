import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunWorkoutComponent } from './run-workout.component';

describe('RunWorkoutComponent', () => {
  let component: RunWorkoutComponent;
  let fixture: ComponentFixture<RunWorkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RunWorkoutComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
