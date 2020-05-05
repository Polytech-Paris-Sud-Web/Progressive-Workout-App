import { Component, OnInit, Input } from '@angular/core';
import * as data from '../../../db.json';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { faArrowCircleRight, faStopwatch, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { Workout } from '../models/workout.interface';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
})
export class WorkoutComponent implements OnInit {
  //Icons
  faArrow = faArrowCircleRight;
  faWatch = faStopwatch;
  faHourGlass = faHourglassHalf;

  workout: Workout;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.workout = (data as any).default[this.route.snapshot.params.id - 1]; //@TO REPLACE
  }
}
