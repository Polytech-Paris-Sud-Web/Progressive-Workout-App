import { Component, OnInit } from '@angular/core';
import { RestTimerService } from '../services/restTimer/rest-timer.service';
import { LocalDBService } from '../services/localDB/local-db.service';
import { WorkoutDB } from '../models/workout.interface';
import { ActivatedRoute } from '@angular/router';
import { Exercise } from '../models/exercise';
import { WorkoutExercise } from '../models/workout-exercise';
import { WorkoutExerciseGroup } from '../models/workout-exercise-group';

@Component({
  selector: 'app-run-workout',
  templateUrl: './run-workout.component.html',
  styleUrls: ['./run-workout.component.scss'],
})
export class RunWorkoutComponent implements OnInit {
  public workout: WorkoutDB;
  public currentExercice: WorkoutExercise;

  private indexExercice: number;
  private exerciceRun: boolean;
  public labelTimer: string;
  public labelNextOrCurrent: string;

  private allExercice: WorkoutExercise[];

  constructor(private rts: RestTimerService, private localdb: LocalDBService, private route: ActivatedRoute) {
    this.indexExercice = 0;
    this.exerciceRun = true;
    this.labelTimer = 'Ready !';
    this.labelNextOrCurrent = 'Current Exercice';
    this.allExercice = [];
  }

  resetTimer() {
    this.rts.resetTimerValue(this.currentExercice.restAfterExercise * 100);
    // Attendre la fin du timer pour changer le tout.
    this.rts.getRestTimer().subscribe((remainTime) => {
      if (remainTime === 0) {
        this.labelNextOrCurrent = 'Current Exercice';
        console.log('New Exercice');
        this.exerciceRun = true;
      }
    });
  }

  ngOnInit(): void {
    this.workout = this.localdb.getWorkout(this.route.snapshot.params.id);

    this.buildListExercice();
    this.currentExercice = this.allExercice[0];
  }

  public restTimerClick() {
    if (this.exerciceRun) {
      this.resetTimer();
      this.labelNextOrCurrent = 'Next Exercice';
      this.displayNextExercice();
      this.exerciceRun = false;
    } else {
    }
  }

  public buildListExercice(): void {
    this.workout.groups.forEach((g) => {
      g.exercises.forEach((e) => {
        this.allExercice.push(e);
      });
    });
  }

  public displayNextExercice(): void {
    this.indexExercice++;
    this.currentExercice = this.allExercice[this.indexExercice];
  }
}
