import { Component, OnInit } from '@angular/core';
import * as data from '../../../db.json';
import { Routine } from '../models/routine.interface';

@Component({
  selector: 'app-list-routine',
  templateUrl: './list-routine.component.html',
  styleUrls: ['./list-routine.component.scss']
})
export class ListRoutineComponent implements OnInit {

  _routines : Routine[];
  _all_routines: Routine[];

  /**
   * @description Update the routines list.
   */
  updateRoutines(value: string ): void {

    if ((data as any).default === undefined) {
      this._all_routines = data;
    }

    else {
      this._all_routines = (data as any).default;
    }


    // Filter results
    if (value !== undefined){
      this._routines = this._all_routines.filter(
        (customRoutine) => customRoutine.name.toLowerCase().match(value.toLowerCase())
      );
    }
    // No filter required
    else {
      this._routines = this._all_routines;
    }
  }

  constructor() { }


   /**
    * @description Module initialisation.
    */
  ngOnInit(): void {
    this.updateRoutines('');
  }

}
