import { WorkoutExerciseGroup } from './workout-exercise-group';

export interface Workout {
  name: string;
  groups: Array<WorkoutExerciseGroup>;
}

export interface WorkoutDB extends Workout {
  id: string;
}
