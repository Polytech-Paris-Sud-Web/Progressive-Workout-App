import { WorkoutExercise } from './workout-exercise';

export interface WorkoutExerciseGroup {
  name: string;
  exercises: WorkoutExercise[];
}
