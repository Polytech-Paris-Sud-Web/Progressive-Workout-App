import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestTimerService {
  public restTimer: Subject<number> = new Subject<number>();

  public resetTimerValue(value: number): void {
    this.restTimer.next(value);
  }

  public getRestTimer(): Observable<number> {
    return this.restTimer.asObservable();
  }
}
