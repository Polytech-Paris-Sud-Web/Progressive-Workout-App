import { Component, OnInit, Input } from '@angular/core';
import * as data from '../../../db.json';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { faArrowCircleRight,faStopwatch, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { Routine } from '../models/routine.interface';


@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.scss']
})
export class RoutineComponent implements OnInit {

  //Icons
  faArrow = faArrowCircleRight;
  faWatch = faStopwatch;
  faHourGlass = faHourglassHalf;

  routine : Routine;

    constructor(private route : ActivatedRoute) {}

  ngOnInit(): void {
    this.routine = (data as any).default[this.route.snapshot.params.id - 1]; //@TO REPLACE
  }

}
