import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTrashAlt, faPlus, faHome } from '@fortawesome/free-solid-svg-icons';
import * as exercisesJson from '../../assets/exercises.json';
import { Exercise } from '../models/exercise';
import { LocalDBService } from '../services/localDB/local-db.service';
import { Workout } from '../models/workout.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.scss'],
})
export class CreateWorkoutComponent {
  public deleteIcon = faTrashAlt;
  public addIcon = faPlus;
  public homeIcon = faHome;
  public workoutForm: FormGroup;
  public exercises: Exercise[] = (exercisesJson as any).default;

  constructor(private fb: FormBuilder, private localdb: LocalDBService, private router: Router) {
    this.resetForm();
  }

  public createWorkout() {
    Swal.fire({
      title: '<span style="color:#4ecca3">Add my Workout ?</span>',
      html:
        '<span style="color:#eeeeee">You gonna add a workout in your personnal list.' + 'Is it okay for you ?</span>',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'Not for now.',
      background: '#393e46',
      confirmButtonColor: '#4ecca3',
      cancelButtonColor: '#FF8C00',
    }).then((result) => {
      if (result.value) {
        const newWorkout: Workout = { ...this.workoutForm.value };
        this.localdb.addWorkout(newWorkout);
        this.resetForm();
        Swal.fire('Added!', 'Your workout has been added. Please consult your list !', 'success');
      }
    });
  }

  public resetForm() {
    this.workoutForm = this.fb.group({
      name: ['', Validators.required],
      groups: this.fb.array([this.newGroup()]),
    });
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
    const group = this.groups.at(groupId) as FormGroup;
    const groupExercises = group.controls.exercises as FormArray;
    groupExercises.removeAt(exerciseId);
  }

  public deleteGroup(i: number) {
    this.groups.removeAt(i);
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
