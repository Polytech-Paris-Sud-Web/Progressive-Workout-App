import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalTimerService } from '../../services/globalTimer/global-timer.service';

@Component({
  selector: 'app-global-timer',
  templateUrl: './global-timer.component.html',
  styleUrls: ['./global-timer.component.scss'],
})
export class GlobalTimerComponent implements OnInit, OnDestroy {
  counter: number;

  elapsedHours: string;
  elapsedMinutes: string;
  elapsedSeconds: string;

  timerRef;
  running = false;
  constructor(private globalTimerService: GlobalTimerService) {
    this.elapsedHours = '00';
    this.elapsedMinutes = '00';
    this.elapsedSeconds = '00';
  }

  public ngOnInit(): void {
    this.startTimer();
  }

  public ngOnDestroy(): void {
    this.clearTimer();
  }

  startTimer() {
    this.running = !this.running;
    this.globalTimerService.setIsRunning(this.running);
    if (this.running) {
      const startTime = Date.now() - (this.counter || 0);
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime;

        this.globalTimerService.setGlobalTimer(this.counter);
        const decomposed = this.globalTimerService.getGlobalTimerDecomposed();
        this.elapsedHours = decomposed.hours;
        this.elapsedMinutes = decomposed.minutes;
        this.elapsedSeconds = decomposed.seconds;
      });
    } else {
      clearInterval(this.timerRef);
    }
  }

  clearTimer() {
    this.running = false;
    this.counter = undefined;
    clearInterval(this.timerRef);
  }
}
