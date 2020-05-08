import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { RestTimerService } from '../../services/restTimer/rest-timer.service';

@Component({
  selector: 'app-rest-timer',
  templateUrl: './rest-timer.component.html',
  styleUrls: ['./rest-timer.component.scss'],
})
export class RestTimerComponent {
  public restTime = 0;
  public counter: Observable<void>;
  public initialValue: number;

  constructor(private rts: RestTimerService) {
    this.rts.getRestTimer().subscribe((newTimerValue) => {
      if (this.restTime === 0) {
        this.restTime = newTimerValue;
        this.initialValue = this.restTime;
        this.initTimer();
        this.counter.subscribe();
      }
    });
  }

  private initTimer() {
    this.counter = timer(0, 10).pipe(
      take(this.restTime),
      map(() => {
        --this.restTime;
      })
    );
  }
}
