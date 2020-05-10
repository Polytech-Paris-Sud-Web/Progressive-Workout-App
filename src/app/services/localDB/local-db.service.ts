import { Injectable } from '@angular/core';
import { Workout, WorkoutDB } from '../../models/workout.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class LocalDBService {
  public clearAllWorkouts() {
    localStorage.setItem('workouts', JSON.stringify([]));
  }

  public getAllWorkouts(): WorkoutDB[] {
    const workouts = JSON.parse(localStorage.getItem('workouts'));
    return workouts || [];
  }

  public addWorkout(workout: Workout): WorkoutDB {
    const newWorkout: WorkoutDB = {
      id: uuidv4(),
      ...workout,
    };
    let storedWorkouts: WorkoutDB[] = this.getAllWorkouts();
    if (storedWorkouts) {
      storedWorkouts.push(newWorkout);
    } else {
      storedWorkouts = [];
      storedWorkouts.push(newWorkout);
    }
    localStorage.setItem('workouts', JSON.stringify(storedWorkouts));
    return newWorkout;
  }

  public getWorkout(workoutId: string): WorkoutDB | null {
    const storedWorkouts: WorkoutDB[] = this.getAllWorkouts();
    const workout = storedWorkouts.find((_) => _.id === workoutId);
    return workout ? workout : null;
  }

  public deleteWorkout(workoutId: string): boolean {
    const storedWorkouts: WorkoutDB[] = this.getAllWorkouts();
    const index = storedWorkouts.findIndex((_) => _.id === workoutId);
    console.log(index);
    if (index >= 0) {
      storedWorkouts.splice(index, 1);
      localStorage.setItem('workouts', JSON.stringify(storedWorkouts));
      return true;
    } else {
      return false;
    }
  }
  public updateWorkout(workout: WorkoutDB) {
    const storedWorkouts: WorkoutDB[] = this.getAllWorkouts();
    const index = storedWorkouts.findIndex((_) => _.id === workout.id);
    storedWorkouts[index] = workout;
    localStorage.setItem('workouts', JSON.stringify(storedWorkouts));
  }

  public deleteAllWorkouts() {
    localStorage.removeItem('workouts');
  }
}
