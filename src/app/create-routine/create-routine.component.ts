import { Component, OnInit } from '@angular/core';
import {Form, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Routine} from '../models/routine.interface';
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-create-routine',
  templateUrl: './create-routine.component.html',
  styleUrls: ['./create-routine.component.scss']
})
export class CreateRoutineComponent {
  public deleteIcon = faTrashAlt;
  public addIcon = faPlus;
  public routineForm: FormGroup;

  public routineTest: Routine = {
    name: 'testRoutine',
    exercises: [
      {
        name: 'group1',
        exercises: [
          {
            name: 'push ups',
            nbOfReps: 12,
            restAfterExercise : 45
          },
          {
            name: 'pull ups',
            nbOfReps: 12,
            restAfterExercise : 45
          },
          {
            name: 'squats',
            nbOfReps: 12,
            restAfterExercise : 45
          }
        ]
      },
      {
        name: 'group2',
        exercises: [
          {
            name: 'push ups',
            nbOfReps: 12,
            restAfterExercise : 45
          },
          {
            name: 'pull ups',
            nbOfReps: 12,
            restAfterExercise : 45
          },
          {
            name: 'squats',
            nbOfReps: 12,
            restAfterExercise : 45
          }
        ]
      }
    ]
  };

  constructor(
    private fb: FormBuilder
  ) {
    this.routineForm = this.fb.group({
      name: '',
      exercises: this.fb.array([])
    });
  }

  get groups() {
    return this.routineForm.get('exercises') as FormArray;
  }


  public addGroup() {
    console.log(this.groups);
    this.groups.push(this.newGroup());
  }

  public addExercise(groupId: number) {
    (this.groups.at(groupId).get('exercises') as FormArray).push(this.newExercise());
  }

  public deleteExercise(groupId: number, exerciseId: number) {
    const group = this.routineForm.controls.exercises[groupId] as FormGroup;
    const GroupExercises = group.controls.exercises as FormArray;
    GroupExercises.removeAt(exerciseId);
  }

  public deleteGroup(i: number) {
    const control = this.routineForm.controls.exercises as FormArray;
    control.removeAt(i);
  }

  private newGroup() {
    return this.fb.group({
      name: 'New group',
      exercises: this.fb.array([])
    });
  }

  private newExercise() {
    return this.fb.group({
      name: '',
      nbOfReps: '',
      restAfterExercise: ''
    });
  }

}
