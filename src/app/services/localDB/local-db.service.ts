import { Injectable } from '@angular/core';
import {Routine} from '../../models/routine.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalDBService {

  constructor() {}

  public  getAllWorkouts() {
    return JSON.parse(localStorage.getItem('workouts'));
  }

  public addWorkout(workout: Routine) {
    let workouts: Routine[] = this.getAllWorkouts();
    if (workouts) {
      workouts.push(workout);
    } else {
      workouts = [workout];
    }
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }

  // TODO get
  public getWorkout(workoutId: string) {
  }

  // TODO update
  public updateWorkout(workoutID: string, workout: Routine) {
  }

}
