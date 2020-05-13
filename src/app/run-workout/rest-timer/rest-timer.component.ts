import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { RestTimerService } from '../../services/restTimer/rest-timer.service';
import { GlobalTimerService } from '../../services/globalTimer/global-timer.service';
import { faAngleDoubleRight, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rest-timer',
  templateUrl: './rest-timer.component.html',
  styleUrls: ['./rest-timer.component.scss'],
})
export class RestTimerComponent implements OnDestroy {
  public doubleRightIcon = faAngleDoubleRight;
  public plusIcon = faPlus;
  public restTime = 0;
  public counter: Observable<number>;
  public initialValue: number;
  private restTimeSubscription: Subscription;
  private counterSubscription: Subscription;
  private restTimerOver = true;

  @Input() public exerciseRestTime = 0;
  @Output() public timerStarted: EventEmitter<void> = new EventEmitter();
  @Output() public restTimeEnded: EventEmitter<void> = new EventEmitter();

  constructor(private rts: RestTimerService, private globalTimerService: GlobalTimerService) {
    this.restTimeSubscription = this.rts.getRestTimer().subscribe((newTimerValue) => {
      // reset counter only if restTime === 0
      if (this.restTime === 0) {
        this.restTime = newTimerValue;
        this.initialValue = this.restTime;
        this.initTimer();
      }
    });

    this.globalTimerService.getIsRunning().subscribe((value) => {
      if (!this.restTimerOver) {
        if (value) {
          this.initTimer();
        } else {
          this.stopTimer();
        }
      }
    });
  }

  public ngOnDestroy() {
    this.restTimeSubscription.unsubscribe();
  }

  private initTimer() {
    this.restTimerOver = false;
    this.counter = timer(0, 10).pipe(
      take(this.restTime),
      map(() => {
        --this.restTime;
        return this.restTime;
      })
    );
    this.counterSubscription = this.counter.subscribe((value) => {
      if (value === 0) {
        this.restTimeEnded.emit();
      }
    });
  }

  private stopTimer() {
    this.counterSubscription.unsubscribe();
  }

  public startRestTimer() {
    this.timerStarted.emit();
    this.rts.resetTimerValue(this.exerciseRestTime * 100);
  }

  public skipRest() {
    this.counterSubscription.unsubscribe();
    this.restTime = 0;
    this.restTimeEnded.emit();
  }

  public add10sec() {
    this.stopTimer();
    this.restTime += 1000;
    this.initialValue += 1000;
    this.initTimer();
  }
}
