import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTrashAlt, faPlus, faHome } from '@fortawesome/free-solid-svg-icons';
import * as exercisesJson from '../../assets/exercises.json';
import { Exercise } from '../models/exercise';
import { LocalDBService } from '../services/localDB/local-db.service';
import { Routine } from '../models/routine.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-routine',
  templateUrl: './create-routine.component.html',
  styleUrls: ['./create-routine.component.scss'],
})
export class CreateRoutineComponent {
  public deleteIcon = faTrashAlt;
  public addIcon = faPlus;
  public homeIcon = faHome;;

  public routineForm: FormGroup;
  public exercises: Exercise[] = (exercisesJson as any).default;

  constructor(private fb: FormBuilder, private localdb: LocalDBService) {
    this.routineForm = this.fb.group({
      name: ['', Validators.required],
      exercises: this.fb.array([this.newGroup()]),
    });
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
        const newWorkout: Routine = { ...this.routineForm.value };
        this.localdb.addWorkout(newWorkout);
        this.resetForm();
        Swal.fire('Added!', 'Your workout has been added. Please consult your list !', 'success');
      }
    });
  }

  public resetForm() {
    this.routineForm = this.fb.group({
      name: ['', Validators.required],
      exercises: this.fb.array([this.newGroup()]),
    });
  }

  get groups() {
    return this.routineForm.get('exercises') as FormArray;
  }

  public addGroup() {
    this.groups.push(this.newGroup());
  }

  public addExercise(groupId: number) {
    (this.groups.at(groupId).get('exercises') as FormArray).push(this.newExercise());
  }

  public deleteExercise(groupId: number, exerciseId: number) {
    const groups = this.routineForm.controls.exercises as FormArray;
    const group = groups.at(groupId) as FormGroup;
    const groupExercises = group.controls.exercises as FormArray;
    groupExercises.removeAt(exerciseId);
  }

  public deleteGroup(i: number) {
    const control = this.routineForm.controls.exercises as FormArray;
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
