import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import * as exercisesJson from '../../assets/exercises.json';
import { Exercise } from '../models/exercise';
import { LocalDBService } from '../services/localDB/local-db.service';
import { Workout } from '../models/workout.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.scss'],
})
export class CreateWorkoutComponent {
  public deleteIcon = faTrashAlt;
  public addIcon = faPlus;
  public workoutForm: FormGroup;
  public exercises: Exercise[] = (exercisesJson as any).default;

  constructor(private fb: FormBuilder, private localdb: LocalDBService, private router: Router) {
    this.workoutForm = this.fb.group({
      name: ['', Validators.required],
      groups: this.fb.array([this.newGroup()]),
    });
  }

  public createWorkout() {
    const newWorkout: Workout = { ...this.workoutForm.value };
    const workoutDB = this.localdb.addWorkout(newWorkout);
    this.router.navigateByUrl('workout/' + workoutDB.id);
  }

  get groups() {
    return this.workoutForm.get('groups') as FormArray;
  }

  public addGroup() {
    this.groups.push(this.newGroup());
  }

  public addExercise(groupId: number) {
    (this.groups.at(groupId).get('exercises') as FormArray).push(this.newExercise());
  }

  public deleteExercise(groupId: number, exerciseId: number) {
    const groups = this.workoutForm.controls.exercises as FormArray;
    const group = groups.at(groupId) as FormGroup;
    const groupExercises = group.controls.exercises as FormArray;
    groupExercises.removeAt(exerciseId);
  }

  public deleteGroup(i: number) {
    const control = this.workoutForm.controls.exercises as FormArray;
    control.removeAt(i);
  }

  private newGroup() {
    return this.fb.group({
      name: ['New group', Validators.required],
      exercises: this.fb.array([this.newExercise()]),
    });
  }

  private newExercise() {
    return this.fb.group({
      name: ['', Validators.required],
      nbOfReps: ['', Validators.required],
      restAfterExercise: ['', Validators.required],
    });
  }
}
