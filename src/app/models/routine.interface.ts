import {RoutineExerciseGroup} from './routine-exercise-group';

export interface Routine {
  name: string;
  exercises: Array<RoutineExerciseGroup>;
}
