import { Injectable } from '@angular/core';
import { Workout } from '../../models/workout.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalDBService {
  constructor() {}

  public getAllWorkouts() {
    return JSON.parse(localStorage.getItem('workouts'));
  }

  public addWorkout(workout: Workout) {
    let workouts: Workout[] = this.getAllWorkouts();
    if (workouts) {
      workouts.push(workout);
    } else {
      workouts = [workout];
    }
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }

  // TODO get
  public getWorkout(workoutId: string) {}

  // TODO update
  public updateWorkout(workoutID: string, workout: Workout) {}
}
