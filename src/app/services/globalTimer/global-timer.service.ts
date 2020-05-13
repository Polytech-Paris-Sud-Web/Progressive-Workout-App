import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class GlobalTimerService {
  public globalTimer: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public setGlobalTimer(value: number): void {
    this.globalTimer.next(value);
  }

  public getGlobalTimer(): number {
    return this.globalTimer.getValue();
  }

  public getGlobalTimerAsString(): string {
    const globalTimerDecomposed = this.getGlobalTimerDecomposed();
    return `${globalTimerDecomposed.hours}:${globalTimerDecomposed.minutes}:${globalTimerDecomposed.seconds}`;
  }

  public getGlobalTimerDecomposed(): { hours: string; minutes: string; seconds: string } {
    const stringMoment = moment.duration(this.getGlobalTimer(), 'milliseconds');
    let stringHours = stringMoment.hours().toString();
    stringHours = stringHours.length !== 1 ? stringHours : '0' + stringHours;
    let stringMinutes = stringMoment.minutes().toString();
    stringMinutes = stringMinutes.length !== 1 ? stringMinutes : '0' + stringMinutes;
    let stringSeconds = stringMoment.seconds().toString();
    stringSeconds = stringSeconds.length !== 1 ? stringSeconds : '0' + stringSeconds;
    return { hours: stringHours, minutes: stringMinutes, seconds: stringSeconds };
  }
}
