import { Component, OnInit, Input } from '@angular/core';
import * as data from '../../../db.json';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { faArrowCircleRight, faStopwatch, faHourglassHalf, faHome } from '@fortawesome/free-solid-svg-icons';
import { Routine } from '../models/routine.interface';
import { LocalDBService } from '../services/localDB/local-db.service';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.scss'],
})
export class RoutineComponent implements OnInit {
  //Icons
  faArrow = faArrowCircleRight;
  faWatch = faStopwatch;
  faHourGlass = faHourglassHalf;
  homeIcon = faHome;

  routine: Routine;

  constructor(private route: ActivatedRoute, private localdb: LocalDBService) {}

  ngOnInit(): void {
    this.routine = this.localdb.getAllWorkouts()[this.route.snapshot.params.id];
  }
}
