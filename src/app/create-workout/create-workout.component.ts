import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTrashAlt, faPlus, faHome, faHourglassHalf, faEdit } from '@fortawesome/free-solid-svg-icons';
import * as exercisesJson from '../../assets/exercises.json';
import { Exercise } from '../models/exercise';
import { LocalDBService } from '../services/localDB/local-db.service';
import { Workout } from '../models/workout.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { groupBy } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.scss'],
})
export class CreateWorkoutComponent {
  public deleteIcon = faTrashAlt;
  public addIcon = faPlus;
  public homeIcon = faHome;
  public faHourGlass = faHourglassHalf;
  public editIcon = faEdit;

  public workoutForm: FormGroup;
  public exercises: Exercise[] = (exercisesJson as any).default;
  public editWorkout: Workout = { name: '', groups: [] };

  constructor(private fb: FormBuilder, private localdb: LocalDBService, private router: Router) {
    this.resetForm();
  }

  public createWorkout() {
    this.editWorkout.name = this.workoutForm.value.name;

    if (this.workoutIsValid()) {
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
          this.localdb.addWorkout(this.editWorkout);

          this.resetForm();
          Swal.fire({
            title: '<span style="color:#4ecca3">Added !</span>',
            html: '<span style="color:#eeeeee">Your workout has been added. Please consult your list !</span>',
            icon: 'success',
            background: '#393e46',
            confirmButtonColor: '#4ecca3',
          });
          this.router.navigateByUrl('');
        }
      });
    } else {
      Swal.fire({
        title: '<span style="color:#4ecca3">Error in your workout</span>',
        html:
          '<span style="color:#eeeeee">You must have at least one group with on exercice. ' +
          'Also, the name of your workout cannot be empty.</span>',
        icon: 'error',
        confirmButtonText: "I'll fix that",
        background: '#393e46',
        confirmButtonColor: '#4ecca3',
      });
    }
  }

  public workoutIsValid(): boolean {
    return (
      this.editWorkout.name.replace(/ /g, '') !== '' &&
      this.editWorkout.groups.length > 0 &&
      this.editWorkout.groups[0].exercises.length > 0
    );
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
    const cpy = this;

    Swal.fire({
      title: '<span style="color:#4ecca3">Pick a name !</span>',
      input: 'text',
      inputPlaceholder: 'required',
      showCancelButton: true,
      background: '#393e46',
      confirmButtonColor: '#4ecca3',
      cancelButtonColor: '#FF8C00',
      // Check the inputs
      inputValidator: (value) => {
        return new Promise((resolve, reject) => {
          if (value !== '' && value.length < 25) {
            resolve();
          } else {
            resolve('Cannot be empty or more than 25 characters.');
          }
        });
      },
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          icon: 'success',
          html: 'You group has been added ! ',
        });
        cpy.editWorkout.groups.push({
          name: result.value,
          exercises: [],
        });
      }
    });
  }

  public deleteExercise(groupId: number, exerciseId: number) {
    this.editWorkout.groups[groupId].exercises.splice(exerciseId, 1);
  }

  public deleteGroup(i: number) {
    this.editWorkout.groups.splice(i, 1);
  }

  private newGroup() {
    return this.fb.group({
      name: ['New group', Validators.required],
      exercises: this.fb.array([]),
    });
  }

  private newExercise() {
    return this.fb.group({
      name: ['', Validators.required],
      nbOfReps: ['', Validators.required],
      restAfterExercise: ['', Validators.required],
    });
  }

  public addExercise(groupId: number) {
    const inputExercice = {};
    this.exercises.forEach((el, index) => {
      inputExercice[this.exercises[index].name] = this.exercises[index].name;
    });

    const cpy = this;

    Swal.mixin({
      inputPlaceholder: 'required',
      showCancelButton: true,
      progressSteps: ['1', '2', '3'],
      background: '#393e46',
      confirmButtonColor: '#4ecca3',
      cancelButtonColor: '#FF8C00',
      // Check the inputs
      inputValidator: (value) => {
        return new Promise((resolve, reject) => {
          if (value !== '') {
            resolve();
          } else {
            resolve("Oups, you can't choose this option.");
          }
        });
      },
      // Others rules to controle the inputs
      preConfirm: (value) => {
        if (Number(value) < 0) {
          Swal.showValidationMessage('You can select a negative value.');
        }
      },
    })
      .queue([
        {
          title: '<span style="color:#4ecca3">What are you gonna do ?</span>',
          input: 'select',
          inputOptions: inputExercice,
        },

        {
          title: '<span style="color:#4ecca3">How many time ?</span>',
          input: 'number',
        },
        {
          title: '<span style="color:#4ecca3">How many rest time ?</span>',
          input: 'number',
        },
      ])
      .then((result) => {
        if (result.value) {
          Swal.fire({
            icon: 'success',
            html: 'You exercice has been added ! ',
          });

          cpy.editWorkout.groups[groupId].exercises.push({
            name: result.value[0],
            nbOfReps: result.value[1],
            restAfterExercise: result.value[2],
          });
        }
      });
  }
}
