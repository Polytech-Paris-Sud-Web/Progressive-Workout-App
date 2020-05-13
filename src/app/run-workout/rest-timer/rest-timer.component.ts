import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { RestTimerService } from '../../services/restTimer/rest-timer.service';

@Component({
  selector: 'app-rest-timer',
  templateUrl: './rest-timer.component.html',
  styleUrls: ['./rest-timer.component.scss'],
})
export class RestTimerComponent {
  @Input() public exerciseRestTime = 0;
  public restTime = 0;

  public counter: Observable<number>;
  public initialValue: number;

  @Output() public timerStarted: EventEmitter<void> = new EventEmitter();
  @Output() public restTimeEnded: EventEmitter<void> = new EventEmitter();

  constructor(private rts: RestTimerService) {
    this.rts.getRestTimer().subscribe((newTimerValue) => {
      // reset counter only if restTime === 0
      if (this.restTime === 0) {
        this.restTime = newTimerValue;
        this.initialValue = this.restTime;
        this.initTimer();
        this.counter.subscribe((value) => {
          if (value === 0) {
            this.restTimeEnded.emit();
          }
        });
      }
    });
  }

  private initTimer() {
    this.counter = timer(0, 10).pipe(
      take(this.restTime),
      map(() => {
        --this.restTime;
        return this.restTime;
      })
    );
  }

  public startRestTimer() {
    this.timerStarted.emit();
    this.rts.resetTimerValue(this.exerciseRestTime * 100);
  }
}
