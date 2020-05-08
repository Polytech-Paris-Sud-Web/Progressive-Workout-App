import { Component } from '@angular/core';
import { RestTimerService } from '../services/restTimer/rest-timer.service';

@Component({
  selector: 'app-run-workout',
  templateUrl: './run-workout.component.html',
  styleUrls: ['./run-workout.component.scss'],
})
export class RunWorkoutComponent {
  constructor(private rts: RestTimerService) {
    this.resetTimer();
  }

  resetTimer() {
    this.rts.resetTimerValue(1000);
  }
}
