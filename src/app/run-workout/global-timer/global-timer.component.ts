import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { counter } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-global-timer',
  templateUrl: './global-timer.component.html',
  styleUrls: ['./global-timer.component.scss'],
})
export class GlobalTimerComponent implements OnInit {
  counter: number;
  elapseSeconds: number;
  elapseMinutes: number;
  elapseMSeconds: number;

  strElapseSeconds: string;
  strElapseMinutes: string;
  strElapseMSeconds: string;

  timerRef;
  running = false;

  constructor() {
    this.strElapseMinutes = '00';
    this.strElapseSeconds = '00';
    this.strElapseMSeconds = '000';
  }

  public ngOnInit(): void {
    this.startTimer();
  }

  startTimer() {
    this.running = !this.running;

    if (this.running) {
      const startTime = Date.now() - (this.counter || 0);
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime;

        // Get minutes and convert
        this.elapseMinutes = Math.trunc(Math.trunc(this.counter / 1000) / 60);
        this.strElapseMinutes = this.elapseMinutes.toString();
        if (this.strElapseMinutes.length !== 2) {
          this.strElapseMinutes = '0' + this.strElapseMinutes;
        }

        // Get seconds and convert
        this.elapseSeconds = Math.trunc(this.counter / 1000) - this.elapseMinutes * 60;
        this.strElapseSeconds = this.elapseSeconds.toString();
        if (this.strElapseSeconds.length !== 2) {
          this.strElapseSeconds = '0' + this.strElapseSeconds;
        }

        // Get miliseconds and convert
        this.elapseMSeconds = this.counter - 1000 * this.elapseSeconds - 60 * 1000 * this.elapseMinutes;
        this.strElapseMSeconds = this.elapseMSeconds.toString();
        if (this.strElapseMSeconds.length === 1) {
          this.strElapseMSeconds = '00' + this.strElapseMSeconds;
        } else if (this.strElapseMSeconds.length === 2) {
          this.strElapseMSeconds = '0' + this.strElapseMSeconds;
        }
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
