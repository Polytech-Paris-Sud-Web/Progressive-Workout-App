import { Component, OnInit, Input } from '@angular/core';
import * as data from '../../../db.json';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.scss']
})
export class RoutineComponent implements OnInit {

  @Input()
  id_routine;

  routine;

    constructor(private route : ActivatedRoute) { 
    }

  ngOnInit(): void {
    console.log(this.route.snapshot.params.id);
    this.routine = data.default[this.route.snapshot.params.id-1]; //@TO REPLACE
  }

}
