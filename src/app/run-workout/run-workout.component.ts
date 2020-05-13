import { Component, OnInit } from '@angular/core';
import { RestTimerService } from '../services/restTimer/rest-timer.service';
import { LocalDBService } from '../services/localDB/local-db.service';
import { WorkoutDB } from '../models/workout.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutExercise } from '../models/workout-exercise';
import Swal from 'sweetalert2';
import { GlobalTimerService } from '../services/globalTimer/global-timer.service';
import moment from 'moment';

@Component({
  selector: 'app-run-workout',
  templateUrl: './run-workout.component.html',
  styleUrls: ['./run-workout.component.scss'],
})
export class RunWorkoutComponent implements OnInit {
  private allExercises: WorkoutExercise[] = [];
  public workout: WorkoutDB;
  public currentExercise: WorkoutExercise;
  public nextExercise: WorkoutExercise;

  public currentRestTime = 0;

  public displayCurrent: boolean;

  private indexExercise: number;
  public exerciseRun: boolean;

  constructor(
    private rts: RestTimerService,
    private localdb: LocalDBService,
    private route: ActivatedRoute,
    private router: Router,
    private globalTimerService: GlobalTimerService
  ) {
    this.displayCurrent = true;
    this.exerciseRun = true;
    this.indexExercise = 0;
  }

  public ngOnInit(): void {
    this.workout = this.localdb.getWorkout(this.route.snapshot.params.id);
    this.buildListExercise();
    this.currentExercise = this.allExercises[0];
    this.nextExercise =
      this.indexExercise + 1 > this.allExercises.length ? undefined : this.allExercises[this.indexExercise + 1];
    this.currentRestTime = this.currentExercise.restAfterExercise;
  }

  public buildListExercise(): void {
    this.workout.groups.forEach((g) => {
      g.exercises.forEach((e) => {
        this.allExercises.push(e);
      });
    });
  }

  public timerStarted() {
    this.displayCurrent = false;
  }

  public restTimeEnded() {
    this.displayNextExercise();
    this.displayCurrent = true;
  }

  public displayNextExercise(): void {
    this.indexExercise++;
    if (this.indexExercise >= this.allExercises.length) {
      this.endOfWorkout();
    } else {
      this.currentExercise = this.allExercises[this.indexExercise];
      this.nextExercise =
        this.indexExercise + 1 > this.allExercises.length ? undefined : this.allExercises[this.indexExercise + 1];
      this.currentRestTime = this.currentExercise.restAfterExercise;
    }
  }

  public endOfWorkout() {
    this.exerciseRun = false;
    Swal.fire(
      'Good job!',
      `You just finished your workout in ${this.globalTimerService.getGlobalTimerAsString()}`,
      'success'
    ).then(() => {
      this.router.navigate(['']);
    });
  }
}
